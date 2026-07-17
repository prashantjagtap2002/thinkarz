export type Blog = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
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
    image: 'https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg',
  },
  {
    slug: 'how-to-get-the-best-resale-value-for-your-car',
    title: 'How to Get the Best Resale Value for Your Car',
    category: 'Tips & Advice',
    date: 'May 15, 2024',
    readTime: '4 min read',
    excerpt:
      'Simple steps that can significantly boost your car resale value before you sell it.',
    image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.13.41-PM-1024x768.jpeg',
  },
  {
    slug: 'understanding-car-insurance-a-complete-guide',
    title: 'Understanding Car Insurance: A Complete Guide',
    category: 'Car Insurance',
    date: 'May 10, 2024',
    readTime: '6 min read',
    excerpt:
      'Everything you need to know about car insurance policies, coverage and claims.',
    image: 'https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg',
  },
  {
    slug: '5-essential-car-maintenance-tips-for-a-smooth-drive',
    title: '5 Essential Car Maintenance Tips for a Smooth Drive',
    category: 'Car Maintenance',
    date: 'May 05, 2024',
    readTime: '5 min read',
    excerpt:
      'Keep your car running smoothly with these easy and essential maintenance tips.',
    image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.02.15-PM-1024x768.jpeg',
  },
  {
    slug: 'bs6-vs-bs4-whats-the-difference',
    title: "BS6 Vs BS4: What's the Difference?",
    category: 'Automobile News',
    date: 'Apr 30, 2024',
    readTime: '4 min read',
    excerpt: 'A quick breakdown of the emission norms and what they mean for buyers.',
    image: 'https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg',
  },
  {
    slug: 'upcoming-cars-in-india-in-2024',
    title: 'Upcoming Cars in India in 2024',
    category: 'Automobile News',
    date: 'Apr 25, 2024',
    readTime: '5 min read',
    excerpt: 'A look at the most anticipated car launches coming to India this year.',
    image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.04.01-PM-1-768x1024.jpeg',
  },
  {
    slug: 'summer-car-care-keep-your-car-cool-and-efficient',
    title: 'Summer Car Care: Keep Your Car Cool & Efficient',
    category: 'Tips & Advice',
    date: 'Apr 25, 2024',
    readTime: '4 min read',
    excerpt: 'Beat the heat with these summer car care tips to protect your vehicle.',
    image: 'https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg',
  },
  {
    slug: 'best-family-cars-under-10-lakh-in-india',
    title: 'Best Family Cars Under 10 Lakh in India',
    category: 'Buying Guide',
    date: 'Apr 20, 2024',
    readTime: '6 min read',
    excerpt:
      'A practical shortlist of safe, spacious and budget-friendly family cars worth considering.',
    image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.15.28-PM-1024x768.jpeg',
  },
  {
    slug: 'how-often-should-you-service-your-used-car',
    title: 'How Often Should You Service Your Used Car?',
    category: 'Car Maintenance',
    date: 'Apr 16, 2024',
    readTime: '4 min read',
    excerpt:
      'A simple service schedule to keep your used car reliable without overspending on maintenance.',
    image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.01.51-PM-1024x768.jpeg',
  },
  {
    slug: 'zero-dep-vs-comprehensive-car-insurance',
    title: 'Zero Dep Vs Comprehensive Car Insurance',
    category: 'Car Insurance',
    date: 'Apr 12, 2024',
    readTime: '5 min read',
    excerpt:
      'Understand the difference between two popular insurance options before renewing your policy.',
    image: 'https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg',
  },
  {
    slug: 'signs-your-car-battery-needs-replacement',
    title: '7 Signs Your Car Battery Needs Replacement',
    category: 'Car Maintenance',
    date: 'Apr 08, 2024',
    readTime: '3 min read',
    excerpt:
      'Watch for these common warning signs before a weak battery leaves you stranded.',
    image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.12.05-PM-1024x768.jpeg',
  },
  {
    slug: 'best-time-of-year-to-buy-a-used-car',
    title: 'When Is the Best Time of Year to Buy a Used Car?',
    category: 'Buying Guide',
    date: 'Apr 03, 2024',
    readTime: '4 min read',
    excerpt:
      'Timing matters more than most buyers expect. Here is when the best used-car deals usually appear.',
    image: 'https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg',
  },
  {
    slug: 'how-to-spot-flood-damaged-cars',
    title: 'How to Spot Flood-Damaged Cars Before You Buy',
    category: 'Tips & Advice',
    date: 'Mar 29, 2024',
    readTime: '5 min read',
    excerpt:
      'Use this inspection checklist to avoid hidden electrical and mechanical damage after heavy rains.',
    image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.16.42-PM-1024x768.jpeg',
  },
  {
    slug: 'used-evs-what-buyers-should-check-first',
    title: 'Used EVs: What Buyers Should Check First',
    category: 'Automobile News',
    date: 'Mar 24, 2024',
    readTime: '6 min read',
    excerpt:
      'Battery health, charging support and warranty coverage matter more than the odometer on a used EV.',
    image: 'https://thinkarz.com/wp-content/uploads/2024/02/imt-revised-image-homepage-banner-3.jpg',
  },
  {
    slug: 'documents-you-need-before-selling-your-car',
    title: 'Documents You Need Before Selling Your Car',
    category: 'Tips & Advice',
    date: 'Mar 18, 2024',
    readTime: '4 min read',
    excerpt:
      'Keep the transfer process smooth by preparing the right ownership, insurance and loan paperwork.',
    image: 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.00.30-PM-1024x768.jpeg',
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
