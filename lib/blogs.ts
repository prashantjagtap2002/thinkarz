export type Blog = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string;
};

export const blogs: Blog[] = [
  {
    slug: 'top-10-things-to-check-before-buying-a-used-car',
    title: 'Top 10 Things to Check Before Buying a Used Car',
    category: 'Buying Guide',
    date: 'May 20, 2024',
    readTime: '5 min read',
    excerpt:
      "Buying a used car? Here's a complete checklist to help you make a smart and safe purchase.",
    image: '/images/hero-banner.jpg',
    content:
      "1. Service history: Ask for complete service records. A car with regular maintenance is far more reliable in the long run.\n\n2. RC & documents: Verify the Registration Certificate matches the chassis and engine number. Cross-check against the PUC certificate and insurance validity.\n\n3. Odometer tampering: Look for wear on the steering wheel, pedals and seats that doesn't match the claimed kilometres.\n\n4. Engine & transmission: Start the engine cold, listen for knocks or rattles, and test-drive through multiple gears.\n\n5. Tyres: Uneven wear can signal alignment or suspension issues. Check manufacturing date codes on the sidewall.\n\n6. Body & paint: Walk around in good light. Colour mismatch, overspray, or uneven gaps suggest accident repair.\n\n7. Electricals: Test every switch — windows, lights, wipers, infotainment, AC blower — before you commit.\n\n8. Suspension: Push down on each corner; if the car bounces more than once, the shock absorbers may be worn.\n\n9. Test drive: Drive on a mix of roads — listen for rattles, feel for pulling, and test braking from moderate speed.\n\n10. Certified advantage: At Thinkarz, every car passes 140 quality checks so you don't have to worry about any of this.",
  },
  {
    slug: 'how-to-get-the-best-resale-value-for-your-car',
    title: 'How to Get the Best Resale Value for Your Car',
    category: 'Tips & Advice',
    date: 'May 15, 2024',
    readTime: '4 min read',
    excerpt:
      'Simple steps that can significantly boost your car resale value before you sell it.',
    image: '/images/cars/mg-zs-ev.jpg',
    content:
      "Clean inside and out: First impressions matter more than most sellers realise. A thorough interior detailing and exterior wash can add thousands to the perceived value of your car.\n\nFix minor issues: Small dents, a cracked tail light or a warning light on the dash signal neglect to buyers. Spending a few hundred rupees on touch-ups often returns much more at resale.\n\nGather paperwork: A complete file with all service invoices, insurance documents, original bill, and duplicate keys tells the buyer you maintained the car well — and helps you command a premium price.",
  },
  {
    slug: 'understanding-car-insurance-a-complete-guide',
    title: 'Understanding Car Insurance: A Complete Guide',
    category: 'Car Insurance',
    date: 'May 10, 2024',
    readTime: '6 min read',
    excerpt:
      'Everything you need to know about car insurance policies, coverage and claims.',
    image: '/images/hero-banner.jpg',
    content:
      "Third-party vs comprehensive: Third-party insurance is mandatory by law and covers damage you cause to others. Comprehensive insurance additionally covers your own vehicle against theft, fire, natural calamities and accidents.\n\nZero depreciation add-on: Without this add-on, claims pay only the depreciated value of parts. A zero-dep policy replaces parts at full cost, which is especially valuable for cars under five years old.\n\nNo Claim Bonus (NCB): For every claim-free year, insurers offer a discount on renewal — starting at 20% and going up to 50%. This NCB is transferable when you sell your car, which adds to its resale value.",
  },
  {
    slug: '5-essential-car-maintenance-tips-for-a-smooth-drive',
    title: '5 Essential Car Maintenance Tips for a Smooth Drive',
    category: 'Car Maintenance',
    date: 'May 05, 2024',
    readTime: '5 min read',
    excerpt:
      'Keep your car running smoothly with these easy and essential maintenance tips.',
    image: '/images/cars/hyundai-venue-dct.jpg',
    content:
      "Regular oil changes: Engine oil lubricates, cools, and cleans the engine. Follow the manufacturer's interval — typically every 10,000 km or 12 months — and use the recommended grade.\n\nCheck tyre pressure monthly: Under-inflated tyres reduce fuel efficiency, wear unevenly, and compromise braking. Check pressure when the tyres are cold and don't forget the spare.\n\nBrake fluid and coolant: These fluids degrade over time. Brake fluid absorbs moisture which lowers its boiling point; coolant loses anti-corrosion properties. Flush and replace every two years.\n\nAir and cabin filters: A clogged engine air filter reduces power and economy. A dirty cabin filter hurts AC performance and air quality. Both are inexpensive and easy to replace.\n\nBattery care: Clean the terminals with a wire brush if you see white/green corrosion. If the car sits unused for weeks, consider a trickle charger — especially for cars with keyless entry and multiple ECUs.",
  },
  {
    slug: 'bs6-vs-bs4-whats-the-difference',
    title: "BS6 Vs BS4: What's the Difference?",
    category: 'Automobile News',
    date: 'Apr 30, 2024',
    readTime: '4 min read',
    excerpt: 'A quick breakdown of the emission norms and what they mean for buyers.',
    image: '/images/hero-banner.jpg',
    content:
      "BS6 (Bharat Stage 6) emission norms came into effect in April 2020, replacing BS4. The key difference is a drastic reduction in permissible tailpipe pollutants — sulphur content in fuel dropped from 50 ppm to 10 ppm, and NOx limits for petrol engines were cut by 25%.\n\nWhy it matters when buying used: A BS6 car will remain compliant for longer as cities expand low-emission zones. BS4 cars may face resale restrictions in certain metro areas. However, BS4 cars often sell for less, making them attractive if you primarily drive outside city limits.\n\nIf you're comparing two similar cars and one is BS6 while the other is BS4, factor in the long-term ownership cost — the BS6 premium today may save you regulatory headaches tomorrow.",
  },
  {
    slug: 'upcoming-cars-in-india-in-2024',
    title: 'Upcoming Cars in India in 2024',
    category: 'Automobile News',
    date: 'Apr 25, 2024',
    readTime: '5 min read',
    excerpt: 'A look at the most anticipated car launches coming to India this year.',
    image: '/images/cars/tata-nexon-ev.jpg',
    content:
      "The Indian automotive market is buzzing with launches spanning affordable hatchbacks, feature-loaded SUVs, and a new wave of electric vehicles. Key debuts expected this year include the Mahindra Thar 5-door, Tata Curvv, Hyundai Creta facelift, and Maruti Suzuki eVX electric concept.\n\nUsed-car implications: New launches often push down prices of the outgoing model in the pre-owned market. If you're flexible on timing, waiting for a launch window can land you a better deal on a lightly used car.\n\nAt Thinkarz, we track these trends closely so our inventory reflects fair market value. Browse our pre-owned collection to spot cars whose prices may soon be influenced by upcoming launches.",
  },
  {
    slug: 'summer-car-care-keep-your-car-cool-and-efficient',
    title: 'Summer Car Care: Keep Your Car Cool & Efficient',
    category: 'Tips & Advice',
    date: 'Apr 25, 2024',
    readTime: '4 min read',
    excerpt: 'Beat the heat with these summer car care tips to protect your vehicle.',
    image: '/images/hero-banner.jpg',
    content:
      "AC performance: Have the refrigerant level and vent temperature checked before peak summer. A weak AC strains the engine and makes stop-and-go city driving miserable.\n\nCoolant check: Verify that the coolant (not plain water) is at the correct level and concentration. Modern engines run hot, and overheating can warp the cylinder head — an expensive repair.\n\nTyre pressure in heat: Ambient temperature changes tyre pressure. Check and adjust pressures before a long highway drive, as under-inflated tyres build excessive heat at speed.\n\nPark in shade, use sunshades: UV exposure fades the dashboard and steering wheel. A simple foldable sunshade protects the interior and keeps the cabin noticeably cooler.",
  },
  {
    slug: 'best-family-cars-under-10-lakh-in-india',
    title: 'Best Family Cars Under 10 Lakh in India',
    category: 'Buying Guide',
    date: 'Apr 20, 2024',
    readTime: '6 min read',
    excerpt:
      'A practical shortlist of safe, spacious and budget-friendly family cars worth considering.',
    image: '/images/cars/kia-seltos.jpg',
    content:
      "Maruti Suzuki Brezza: Compact SUV with a peppy 1.5L engine, good mileage and Maruti's extensive service network. Used examples from 2021-2023 fit comfortably under Rs. 10 Lakh.\n\nHyundai Venue: Well-appointed cabin, feature-rich (sunroof, connected car tech), and available with both turbo-petrol and diesel options. A 2022 Venue SX is excellent value.\n\nHonda Amaze: The only compact sedan on this list — but the CVT automatic is butter-smooth for city traffic, and the 1.2L petrol is frugal. A 2021-2022 top variant comes well under Rs. 8 Lakh.\n\nTata Nexon: 5-star GNCAP safety rating, solid build, and available in petrol, diesel and EV. A used 2022 Nexon XZ+ is a safe, stylish family pick under Rs. 10 Lakh.",
  },
  {
    slug: 'how-often-should-you-service-your-used-car',
    title: 'How Often Should You Service Your Used Car?',
    category: 'Car Maintenance',
    date: 'Apr 16, 2024',
    readTime: '4 min read',
    excerpt:
      'A simple service schedule to keep your used car reliable without overspending on maintenance.',
    image: '/images/cars/maruti-ignis.jpg',
    content:
      "Every 10,000 km or 12 months: Oil and oil filter change, air filter inspection, brake pad thickness check, tyre rotation, and a general underbody inspection.\n\nEvery 20,000 km: Replace cabin air filter, inspect and clean spark plugs (petrol), check timing belt condition (over 60,000 km), and flush brake fluid if older than two years.\n\nEvery 40,000 km: Replace fuel filter (diesel cars especially), change transmission fluid (automatic gearboxes), replace spark plugs (petrol), and inspect suspension bushings.\n\nStick to the manufacturer's schedule but use your judgment — if a car sits mostly in Mumbai traffic, follow the 'severe' maintenance schedule which calls for shorter intervals.",
  },
  {
    slug: 'zero-dep-vs-comprehensive-car-insurance',
    title: 'Zero Dep Vs Comprehensive Car Insurance',
    category: 'Car Insurance',
    date: 'Apr 12, 2024',
    readTime: '5 min read',
    excerpt:
      'Understand the difference between two popular insurance options before renewing your policy.',
    image: '/images/hero-banner.jpg',
    content:
      "Comprehensive insurance covers own-damage plus third-party liability — but when you claim, the insurer deducts depreciation on replaced parts. For a three-year-old car, plastic, rubber, and fibreglass parts may be depreciated at 50%. You pay the difference.\n\nZero depreciation (zero-dep or bumper-to-bumper) insurance eliminates this deduction. The insurer pays the full cost of replaced parts, barring a small compulsory deductible. The add-on typically costs Rs. 1,500-4,000 extra per year.\n\nWhich one should you pick? Zero-dep makes sense for cars under five years old and for premium brands where parts are expensive. For an older car with low insured value, the extra premium may not justify the benefit.",
  },
  {
    slug: 'signs-your-car-battery-needs-replacement',
    title: '7 Signs Your Car Battery Needs Replacement',
    category: 'Car Maintenance',
    date: 'Apr 08, 2024',
    readTime: '3 min read',
    excerpt:
      'Watch for these common warning signs before a weak battery leaves you stranded.',
    image: '/images/cars/hyundai-venue-mt.jpg',
    content:
      "Slow crank: The most obvious sign — the engine turns over sluggishly when you start. Don't wait for it to fail completely.\n\nDim headlights: If headlights dim noticeably at idle and brighten when you rev, the battery or alternator may be weak.\n\nSwollen battery case: Heat causes the battery case to bulge. A swollen battery is dangerous and must be replaced immediately.\n\nCorroded terminals: White or bluish powder on the terminals restricts current flow. Clean it off, but if it keeps coming back, the battery is leaking acid.\n\nElectrical gremlins: Flickering dashboard lights, erratic infotainment reboot or power windows moving slower than usual often trace back to a dying battery.\n\nCheck engine light: Some cars illuminate the check-engine light when battery voltage drops below a threshold.\n\nAge: Most car batteries last 3-5 years in Indian conditions. If yours is older, replace it proactively before a breakdown.",
  },
  {
    slug: 'best-time-of-year-to-buy-a-used-car',
    title: 'When Is the Best Time of Year to Buy a Used Car?',
    category: 'Buying Guide',
    date: 'Apr 03, 2024',
    readTime: '4 min read',
    excerpt:
      'Timing matters more than most buyers expect. Here is when the best used-car deals usually appear.',
    image: '/images/hero-banner.jpg',
    content:
      "Festive season (Sep-Nov): Dealers push volumes during Navratri, Dussehra and Diwali. You'll find the widest selection and competitive pricing during this window.\n\nYear-end (December): Individuals and corporate fleets offload cars to close the financial year. Supply spikes, and you can negotiate harder.\n\nPost-launch windows: Whenever a popular model gets a facelift or new generation, prices of the outgoing shape drop in the used market. Monitor major launches and time your purchase accordingly.\n\nAvoid April-June if possible: The start of the financial year brings fresh budgets and less urgency to close deals. Selection remains good but discounts shrink.",
  },
  {
    slug: 'how-to-spot-flood-damaged-cars',
    title: 'How to Spot Flood-Damaged Cars Before You Buy',
    category: 'Tips & Advice',
    date: 'Mar 29, 2024',
    readTime: '5 min read',
    excerpt:
      'Use this inspection checklist to avoid hidden electrical and mechanical damage after heavy rains.',
    image: '/images/cars/honda-amaze.jpg',
    content:
      "Musty smell: A persistent damp odour, especially when the AC is turned on, suggests water ingress. Sellers may mask it with strong air fresheners — be suspicious if the car smells overly perfumed.\n\nRust in unusual places: Surface rust underneath is normal, but rust on seat frames, under the dashboard, around the spare wheel well, or on door hinges points to submersion.\n\nCheck electronics: Test every electrical component — power windows, central locking, infotainment screen (look for fogging behind the glass), and all warning lights on the dash. Intermittent faults are a big red flag.\n\nPull back carpets: Lift the floor mats and press firmly on the carpet. If it feels damp, crunchy or leaves a water stain, walk away. Also check the boot floor and under the rear seats.\n\nSilt and debris: Look for fine silt in crevices — under the spare tyre, inside door pockets, behind the glove box, and around seat rails. Water carries silt; a vacuum can't reach everywhere.",
  },
  {
    slug: 'used-evs-what-buyers-should-check-first',
    title: 'Used EVs: What Buyers Should Check First',
    category: 'Automobile News',
    date: 'Mar 24, 2024',
    readTime: '6 min read',
    excerpt:
      'Battery health, charging support and warranty coverage matter more than the odometer on a used EV.',
    image: '/images/hero-banner.jpg',
    content:
      "Battery State of Health (SoH): Unlike an ICE car where odometer readings tell the story, an EV's value hinges on battery health. Most EVs display SoH in the instrument cluster or a service menu. Anything above 90% on a two-year-old car is healthy.\n\nCharging habits of the previous owner matter. A car consistently fast-charged to 100% degrades faster than one slow-charged to 80%. Ask about charging history if possible.\n\nWarranty coverage: Most EV batteries carry an 8-year or 1,60,000 km warranty from the manufacturer. Verify the warranty is intact and transferable. Factor in remaining warranty when negotiating price.\n\nCharging port and cable: Inspect the charging port for bent pins, corrosion or debris. Verify both the portable charger and any wall-box charger are included and functional.\n\nAt Thinkarz, every certified EV undergoes a battery health diagnostic as part of our 140-point inspection, so you have complete transparency before you buy.",
  },
  {
    slug: 'documents-you-need-before-selling-your-car',
    title: 'Documents You Need Before Selling Your Car',
    category: 'Tips & Advice',
    date: 'Mar 18, 2024',
    readTime: '4 min read',
    excerpt:
      'Keep the transfer process smooth by preparing the right ownership, insurance and loan paperwork.',
    image: '/images/cars/kia-sonet.jpg',
    content:
      "Registration Certificate (RC): The most critical document. Ensure the RC is in your name, has the correct chassis and engine numbers, and isn't hypothecated (if your loan is closed, get the hypothecation removed).\n\nInsurance: The policy must be transferred to the new owner within 14 days of sale. Keep the current policy document ready and inform your insurer of the pending transfer.\n\nPollution Under Control (PUC) certificate: A valid PUC is mandatory for transfer. Get a fresh one before listing your car — it costs under Rs. 100 and removes one friction point from the negotiation.\n\nForm 29 & 30: These RTO forms are used for ownership transfer. Form 29 is the notice of transfer (signed by seller and buyer), and Form 30 is the report of transfer to the registering authority.\n\nAt Thinkarz, we handle the complete paperwork for you — from valuation to RC transfer — so you walk out with payment and peace of mind.",
  },
];

const categoryOrder = [
  'Buying Guide',
  'Car Maintenance',
  'Car Insurance',
  'Automobile News',
  'Tips & Advice',
];

export const blogCategories = categoryOrder
  .map((name) => ({
    name,
    count: blogs.filter((post) => post.category === name).length,
  }))
  .filter((category) => category.count > 0);
