import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.resolve('package.json'));
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx !== -1) {
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    env[key] = val;
  }
}

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

const r2Bucket = env.R2_BUCKET_NAME;
const r2PublicBase = env.R2_PUBLIC_URL.replace(/\/+$/, '');

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// 1. Upload images in public/images/cars/ to Cloudflare R2
const imagesDir = path.resolve('public/images/cars');
const imageFiles = fs.readdirSync(imagesDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

console.log(`Found ${imageFiles.length} car images to push to Cloudflare R2...`);
const uploadedUrls = {};

for (const file of imageFiles) {
  const filePath = path.join(imagesDir, file);
  const fileBytes = fs.readFileSync(filePath);
  const r2Key = `cars/${file}`;
  const contentType = file.endsWith('.png') ? 'image/png' : file.endsWith('.webp') ? 'image/webp' : 'image/jpeg';

  console.log(`Uploading ${file} -> ${r2Key}...`);
  await r2Client.send(
    new PutObjectCommand({
      Bucket: r2Bucket,
      Key: r2Key,
      Body: fileBytes,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  const publicUrl = `${r2PublicBase}/${r2Key}`;
  uploadedUrls[file] = publicUrl;
  console.log(`  ✓ Uploaded: ${publicUrl}`);
}

// 2. Load cars from data/cars.json and map images to Cloudflare URLs
const carsJsonPath = path.resolve('data/cars.json');
const carsData = JSON.parse(fs.readFileSync(carsJsonPath, 'utf8'));

console.log(`\nSyncing ${carsData.length} cars with Cloudflare image URLs to Supabase...`);

for (const car of carsData) {
  const filename = path.basename(car.image);
  if (uploadedUrls[filename]) {
    car.image = uploadedUrls[filename];
  } else {
    car.image = `${r2PublicBase}/cars/${filename}`;
  }

  const row = {
    id: car.id,
    make: car.make,
    model: car.model,
    variant: car.variant,
    year: car.year,
    fuel: car.fuel,
    kms: car.kms,
    price: car.price,
    image: car.image,
    certified: Boolean(car.certified),
    transmission: car.transmission,
    body_type: car.bodyType,
    owners: car.owners,
    city: car.city,
    seller_type: car.sellerType,
    reg_number: car.regNumber,
    color: car.color,
    seats: car.seats,
    engine: car.engine,
    power: car.power,
    mileage: car.mileage,
    insurance_valid_till: car.insuranceValidTill,
    features: car.features || [],
    description: car.description || '',
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('cars').upsert(row, { onConflict: 'id' });
  if (error) {
    console.error(`  ✗ Error upserting ${car.id}:`, error.message);
  } else {
    console.log(`  ✓ Upserted ${car.id} into Supabase with image ${car.image}`);
  }
}

// 3. Update local data/cars.json with new Cloudflare URLs
fs.writeFileSync(carsJsonPath, JSON.stringify(carsData, null, 2) + '\n');
console.log('✓ Updated data/cars.json with Cloudflare R2 image URLs');

// 4. Update seed_cars.sql
const seedSqlPath = path.resolve('supabase/seed_cars.sql');
let seedSql = '';
for (const car of carsData) {
  const featuresSql = `ARRAY[${(car.features || [])
    .map((f) => `'${f.replace(/'/g, "''")}'`)
    .join(', ')}]::text[]`;
  const descSql = `'${(car.description || '').replace(/'/g, "''")}'`;
  seedSql += `insert into public.cars (id, make, model, variant, year, fuel, kms, price, image, certified, transmission, body_type, owners, city, seller_type, reg_number, color, seats, engine, power, mileage, insurance_valid_till, features, description) values ('${car.id}', '${car.make.replace(/'/g, "''")}', '${car.model.replace(/'/g, "''")}', '${car.variant.replace(/'/g, "''")}', ${car.year}, '${car.fuel}', ${car.kms}, ${car.price}, '${car.image}', ${car.certified}, '${car.transmission}', '${car.bodyType}', ${car.owners}, '${car.city}', '${car.sellerType}', '${car.regNumber}', '${car.color}', ${car.seats}, '${car.engine}', '${car.power}', '${car.mileage}', '${car.insuranceValidTill}', ${featuresSql}, ${descSql}) on conflict (id) do update set make = excluded.make, model = excluded.model, variant = excluded.variant, year = excluded.year, fuel = excluded.fuel, kms = excluded.kms, price = excluded.price, image = excluded.image, certified = excluded.certified, transmission = excluded.transmission, body_type = excluded.body_type, owners = excluded.owners, city = excluded.city, seller_type = excluded.seller_type, reg_number = excluded.reg_number, color = excluded.color, seats = excluded.seats, engine = excluded.engine, power = excluded.power, mileage = excluded.mileage, insurance_valid_till = excluded.insurance_valid_till, features = excluded.features, description = excluded.description;\n`;
}
fs.writeFileSync(seedSqlPath, seedSql);
console.log('✓ Updated supabase/seed_cars.sql with Cloudflare R2 image URLs');

console.log('\n🎉 Successfully migrated all images to Cloudflare R2 and synced cars to Supabase!');
