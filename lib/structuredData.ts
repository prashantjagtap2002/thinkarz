export function generateOrganizationSchema(reviews?: { name: string; quote: string; rating: number }[]) {
  const aggregateRating =
    reviews && reviews.length > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
            reviewCount: reviews.length,
          },
          review: reviews.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.name },
            reviewBody: r.quote,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.rating,
              bestRating: 5,
            },
          })),
        }
      : {};

  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'THINKARZ',
    url: 'https://thinkarz.com',
    logo: 'https://thinkarz.com/icon.png',
    description:
      'THINKARZ - trusted pre-owned cars, transparent deals. Buy, sell, service and test drive quality used cars in Mumbai.',
    telephone: '+91 80974 44826',
    email: 'info.thinkarz@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dheeraj Sagar Building, New Link Rd, Opp. Goregaon Sports Club, Ekta Nagar',
      addressLocality: 'Malad West, Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400064',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.182148',
      longitude: '72.836216',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '18:30',
      },
    ],
    sameAs: [
      'https://www.facebook.com/thinkarz',
      'https://www.instagram.com/thinkarz',
      'https://www.youtube.com/@thinkarz',
      'https://www.linkedin.com/company/thinkarz',
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'Gautam Modi Group',
    },
    ...aggregateRating,
  };
}

export function generateCarSchema(car: {
  name: string;
  description?: string;
  image: string;
  make: string;
  model: string;
  year: number;
  price: number;
  fuel: string;
  transmission: string;
  kms: number;
  color: string;
  id: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: car.name,
    description: car.description || `Pre-owned ${car.year} ${car.make} ${car.model}`,
    image: `https://thinkarz.com${car.image}`,
    url: `https://thinkarz.com/pre-owned-cars/${car.id}`,
    brand: {
      '@type': 'Brand',
      name: car.make,
    },
    model: car.model,
    vehicleModelDate: String(car.year),
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'THINKARZ',
      },
    },
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.kms,
      unitCode: 'KMT',
    },
    color: car.color,
    vehicleConfiguration: car.model,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBlogPostingSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://thinkarz.com${post.image}`,
    url: `https://thinkarz.com/blogs/${post.slug}`,
    datePublished: new Date(post.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'THINKARZ',
      url: 'https://thinkarz.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'THINKARZ',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thinkarz.com/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://thinkarz.com/blogs/${post.slug}`,
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'THINKARZ',
    url: 'https://thinkarz.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://thinkarz.com/pre-owned-cars?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
