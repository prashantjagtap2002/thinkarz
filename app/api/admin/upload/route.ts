import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { slugify } from '@/lib/carsStore';
import { createR2Client, r2BucketName, r2PublicUrl } from '@/lib/r2';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: 'Only JPG, PNG, or WEBP images are allowed' }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image must be under 8MB' }, { status: 400 });
  }

  const baseName = slugify(file.name.replace(/\.[^.]+$/, '')) || 'car-image';
  const key = `cars/${baseName}-${Date.now()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  try {
    const client = createR2Client();
    await client.send(
      new PutObjectCommand({
        Bucket: r2BucketName(),
        Key: key,
        Body: bytes,
        ContentType: file.type,
      })
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ path: r2PublicUrl(key) });
}
