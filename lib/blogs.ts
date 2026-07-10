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
    image: 'https://picsum.photos/seed/thinkarz-blog-1/900/600',
  },
  {
    slug: 'how-to-get-the-best-resale-value-for-your-car',
    title: 'How to Get the Best Resale Value for Your Car',
    category: 'Tips & Advice',
    date: 'May 15, 2024',
    readTime: '4 min read',
    excerpt:
      'Simple steps that can significantly boost your car resale value before you sell it.',
    image: 'https://picsum.photos/seed/thinkarz-blog-2/900/600',
  },
  {
    slug: 'understanding-car-insurance-a-complete-guide',
    title: 'Understanding Car Insurance: A Complete Guide',
    category: 'Car Insurance',
    date: 'May 10, 2024',
    readTime: '6 min read',
    excerpt:
      'Everything you need to know about car insurance policies, coverage and claims.',
    image: 'https://picsum.photos/seed/thinkarz-blog-3/900/600',
  },
  {
    slug: '5-essential-car-maintenance-tips-for-a-smooth-drive',
    title: '5 Essential Car Maintenance Tips for a Smooth Drive',
    category: 'Car Maintenance',
    date: 'May 05, 2024',
    readTime: '5 min read',
    excerpt:
      'Keep your car running smoothly with these easy and essential maintenance tips.',
    image: 'https://picsum.photos/seed/thinkarz-blog-4/900/600',
  },
  {
    slug: 'bs6-vs-bs4-whats-the-difference',
    title: "BS6 Vs BS4: What's the Difference?",
    category: 'Automobile News',
    date: 'Apr 30, 2024',
    readTime: '4 min read',
    excerpt:
      'A quick breakdown of the emission norms and what they mean for buyers.',
    image: 'https://picsum.photos/seed/thinkarz-blog-5/900/600',
  },
  {
    slug: 'upcoming-cars-in-india-in-2024',
    title: 'Upcoming Cars in India in 2024',
    category: 'Automobile News',
    date: 'Apr 25, 2024',
    readTime: '5 min read',
    excerpt: 'A look at the most anticipated car launches coming to India this year.',
    image: 'https://picsum.photos/seed/thinkarz-blog-6/900/600',
  },
  {
    slug: 'summer-car-care-keep-your-car-cool-and-efficient',
    title: 'Summer Car Care: Keep Your Car Cool & Efficient',
    category: 'Tips & Advice',
    date: 'Apr 25, 2024',
    readTime: '4 min read',
    excerpt: 'Beat the heat with these summer car care tips to protect your vehicle.',
    image: 'https://picsum.photos/seed/thinkarz-blog-7/900/600',
  },
];

export const blogCategories = [
  { name: 'Buying Guide', count: 12 },
  { name: 'Car Maintenance', count: 10 },
  { name: 'Car Insurance', count: 6 },
  { name: 'Automobile News', count: 8 },
  { name: 'Tips & Advice', count: 9 },
];
