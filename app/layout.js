import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050811',
};

export const metadata = {
  metadataBase: new URL('https://aiappshub.com'),
  title: {
    default: 'AI APPS PRIVATE LIMITED | Next-Gen Software & AI App Development Company',
    template: '%s | AI APPS PRIVATE LIMITED',
  },
  description:
    'AI APPS PRIVATE LIMITED – Leading enterprise software & AI development company in Hyderabad, India. Explore 16+ ready-to-deploy mobile apps, multi-vendor marketplaces, SaaS products, full source code licenses, and custom AI engineering.',
  keywords: [
    'AI APPS PRIVATE LIMITED',
    'AI development company India',
    'Mobile app development company Hyderabad',
    'Ready to launch mobile apps',
    'Readymade app source code',
    'E-commerce app development',
    'Food delivery app source code',
    'Multi vendor marketplace software',
    'Grocery delivery app script',
    'Flutter mobile app developers',
    'Next.js web development',
    'Enterprise AI solutions',
    'SaaS application development',
    'Custom software development India',
    'Taxi booking app clone script',
    'Fintech app development',
    'AWS cloud architecture',
  ],
  authors: [{ name: 'AI APPS PRIVATE LIMITED', url: 'https://aiappshub.com' }],
  creator: 'AI APPS PRIVATE LIMITED',
  publisher: 'AI APPS PRIVATE LIMITED',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://aiappshub.com',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'AI APPS PRIVATE LIMITED | Next-Gen Software Development & AI Solutions',
    description:
      'Explore 16+ ready-to-deploy mobile apps, multi-vendor marketplaces, and intelligent software systems with 100% source code, free setup & AWS hosting.',
    url: 'https://aiappshub.com',
    siteName: 'AI APPS PRIVATE LIMITED',
    images: [
      {
        url: '/share_img.png',
        width: 1200,
        height: 630,
        alt: 'AI APPS PRIVATE LIMITED - Building Smart Solutions for a Digital Tomorrow',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI APPS PRIVATE LIMITED | Next-Gen Software Development & AI Solutions',
    description:
      'Explore 16+ ready-to-deploy mobile apps, multi-vendor marketplaces, and intelligent software systems with 100% source code & AWS hosting.',
    images: ['/share_img.png'],
    creator: '@aiappshub',
  },
  category: 'technology',
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://aiappshub.com/#organization',
      name: 'AI APPS PRIVATE LIMITED',
      alternateName: ['AI APPS', 'AI Apps Hub', 'AI Apps Studio'],
      url: 'https://aiappshub.com',
      logo: 'https://aiappshub.com/logo.png',
      image: 'https://aiappshub.com/share_img.png',
      description:
        'AI APPS PRIVATE LIMITED is an advanced software engineering and artificial intelligence company providing enterprise software, ready-to-launch mobile apps, and custom digital platforms.',
      email: 'contact@aiappshub.com',
      telephone: '+918074900749',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'H.No: 1-98/9/3/83, Cyber View Building, VIP Hills, Jai Hind Gandhi Road, Madhapur',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500081',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '17.448293',
        longitude: '78.391485',
      },
      sameAs: [
        'https://www.linkedin.com/company/aiappshub',
        'https://twitter.com/aiappshub',
      ],
      knowsAbout: [
        'Artificial Intelligence',
        'Mobile Application Development',
        'Web Engineering',
        'Cloud Infrastructure',
        'Enterprise SaaS',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://aiappshub.com/#website',
      url: 'https://aiappshub.com',
      name: 'AI APPS PRIVATE LIMITED',
      publisher: {
        '@id': 'https://aiappshub.com/#organization',
      },
      inLanguage: 'en-US',
      description:
        'Next-Gen Software Development & Ready-To-Launch AI, Mobile, and Web Solutions.',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://aiappshub.com/#localbusiness',
      name: 'AI APPS PRIVATE LIMITED',
      image: 'https://aiappshub.com/share_img.png',
      url: 'https://aiappshub.com',
      telephone: '+918074900749',
      priceRange: '₹₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'H.No: 1-98/9/3/83, Cyber View Building, VIP Hills, Madhapur',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500081',
        addressCountry: 'IN',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:30',
          closes: '18:30',
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': 'https://aiappshub.com/#product-list',
      name: 'Ready-To-Launch Product Solutions',
      description: 'Production-ready mobile apps, multi-vendor marketplace platforms, and AI systems with full source code.',
      numberOfItems: 16,
      itemListElement: [
        {
          '@type': 'SoftwareApplication',
          position: 1,
          name: 'Grocery E-Commerce Website & App',
          applicationCategory: 'ShoppingApplication',
          operatingSystem: 'Android, iOS, Web',
          offers: {
            '@type': 'Offer',
            price: '34999',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'SoftwareApplication',
          position: 2,
          name: 'Multi Restaurant Food Delivery System',
          applicationCategory: 'FoodDeliveryApplication',
          operatingSystem: 'Android, iOS, Web',
          offers: {
            '@type': 'Offer',
            price: '34999',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'SoftwareApplication',
          position: 3,
          name: 'Multi-Vendor E-Commerce System',
          applicationCategory: 'ShoppingApplication',
          operatingSystem: 'Android, iOS, Web',
          offers: {
            '@type': 'Offer',
            price: '34999',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'SoftwareApplication',
          position: 4,
          name: 'On-Demand Multi-Service & Handyman System',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Android, iOS, Web',
          offers: {
            '@type': 'Offer',
            price: '34999',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Geo & Location Tags for Local SEO */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad" />
        <meta name="geo.position" content="17.448293;78.391485" />
        <meta name="ICBM" content="17.448293, 78.391485" />

        {/* Social / WhatsApp fallback meta tags */}
        <meta property="og:image" content="/share_img.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image" content="/share_img.png" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Schema.org Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

