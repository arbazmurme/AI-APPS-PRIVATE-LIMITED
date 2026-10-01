import './globals.css';
import { Outfit, Space_Grotesk } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
  preload: false,
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://aiappshub.com');

const BASE_URL = SITE_URL;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#070913' },
  ],
};

export const metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Title ── */
  title: {
    default: 'AI APPS PRIVATE LIMITED | Software & AI Development Company Hyderabad',
    template: '%s | AI APPS PRIVATE LIMITED',
  },

  /* ── Description ── */
  description:
    'AI APPS PRIVATE LIMITED — Leading software & AI development company in Hyderabad, India. We build web apps, mobile apps (Flutter/React Native), AI systems, SaaS platforms, ERP/CRM, IoT & Blockchain solutions for enterprises & startups worldwide.',

  /* ── Keywords ── */
  keywords: [
    'AI APPS PRIVATE LIMITED',
    'AI development company India',
    'software development company Hyderabad',
    'mobile app development company Hyderabad',
    'web development company India',
    'AI solutions Hyderabad',
    'Flutter app development',
    'React Next.js development',
    'SaaS product development India',
    'ERP CRM development Hyderabad',
    'IoT development company',
    'blockchain development India',
    'AR VR development',
    'DevOps automation services',
    'cybersecurity company India',
    'cloud solutions AWS Azure',
    'UI UX design agency Hyderabad',
    'data analytics company India',
    'readymade app source code',
    'custom software development India',
    'enterprise AI solutions',
    'best software company Hyderabad 2024',
  ],

  /* ── Author / Publisher ── */
  authors:   [{ name: 'AI APPS PRIVATE LIMITED', url: BASE_URL }],
  creator:   'AI APPS PRIVATE LIMITED',
  publisher: 'AI APPS PRIVATE LIMITED',

  /* ── Canonical ── */
  alternates: {
    canonical: BASE_URL,
    languages: { 'en-US': BASE_URL },
  },

  /* ── Robots ── */
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

  /* ── Favicon / Icons ── */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.webp', type: 'image/webp' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
  },

  /* ── PWA Manifest ── */
  manifest: '/site.webmanifest',

  /* ── Open Graph (WhatsApp, Facebook, LinkedIn, Telegram) ── */
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         BASE_URL,
    siteName:    'AI APPS PRIVATE LIMITED',
    title:       'AI APPS PRIVATE LIMITED | Software & AI Development Company',
    description: 'Web, Mobile, AI, SaaS, ERP, IoT & Blockchain solutions by India\'s leading software company. Based in Hyderabad — serving clients worldwide.',
    images: [
      {
        url:    `${BASE_URL}/og_image.jpg`,
        width:  1200,
        height: 630,
        alt:    'AI APPS PRIVATE LIMITED — Next-Gen Software & AI Solutions',
        type:   'image/jpeg',
      },
      {
        url:    `${BASE_URL}/og_image.png`,
        width:  1200,
        height: 630,
        alt:    'AI APPS PRIVATE LIMITED — Next-Gen Software & AI Solutions',
        type:   'image/png',
      },
    ],
  },

  /* ── Twitter Card ── */
  twitter: {
    card:        'summary_large_image',
    site:        '@aiappshub',
    creator:     '@aiappshub',
    title:       'AI APPS PRIVATE LIMITED | Software & AI Development',
    description: 'Web, Mobile, AI, SaaS, ERP, IoT & Blockchain solutions. Hyderabad, India.',
    images:      [`${BASE_URL}/og_image.jpg`],
  },

  category:   'technology',
  classification: 'Software Development & AI Services',
};

/* ── Schema.org JSON-LD ── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    /* Organization */
    {
      '@type':         'Organization',
      '@id':           `${BASE_URL}/#organization`,
      name:            'AI APPS PRIVATE LIMITED',
      alternateName:   ['AI APPS', 'AI Apps Hub', 'AIAPPS', 'AI Apps Studio'],
      url:             BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url:     `${BASE_URL}/favicon.png`,
        width:   '1254',
        height:  '1254',
      },
      image:           `${BASE_URL}/og_image.png`,
      description:     'AI APPS PRIVATE LIMITED is a premier software engineering and AI company in Hyderabad, India, delivering custom web apps, mobile apps, AI systems, SaaS platforms, ERP/CRM, IoT, Blockchain, AR/VR and DevOps solutions.',
      foundingDate:    '2019',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 49 },
      email:           'contact@aiappshub.com',
      telephone:       '+918074900749',
      address: {
        '@type':           'PostalAddress',
        streetAddress:     'H.No: 1-98/9/3/83, Cyber View Building, VIP Hills, Jai Hind Gandhi Road, Madhapur',
        addressLocality:   'Hyderabad',
        addressRegion:     'Telangana',
        postalCode:        '500081',
        addressCountry:    'IN',
      },
      geo: {
        '@type':    'GeoCoordinates',
        latitude:   '17.448293',
        longitude:  '78.391485',
      },
      contactPoint: [
        {
          '@type':       'ContactPoint',
          telephone:     '+918074900749',
          contactType:   'customer service',
          areaServed:    ['IN', 'US', 'GB', 'AU', 'AE'],
          availableLanguage: ['English', 'Hindi'],
        },
        {
          '@type':       'ContactPoint',
          telephone:     '+919908516950',
          contactType:   'sales',
          contactOption: 'TollFree',
        },
      ],
      sameAs: [
        'https://www.linkedin.com/company/aiappshub',
        'https://twitter.com/aiappshub',
        'https://www.facebook.com/aiappshub',
        'https://api.whatsapp.com/send?phone=919908516950',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name:    'Software & AI Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Machine Learning' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SaaS Product Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP & CRM Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Blockchain & Web3' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud Solutions & DevOps' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IoT & Embedded Systems' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cybersecurity Solutions' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AR / VR Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data Analytics & BI' } },
        ],
      },
    },

    /* WebSite */
    {
      '@type':     'WebSite',
      '@id':       `${BASE_URL}/#website`,
      url:         BASE_URL,
      name:        'AI APPS PRIVATE LIMITED',
      description: 'Next-Gen Software Development & AI Solutions — Hyderabad, India.',
      publisher:   { '@id': `${BASE_URL}/#organization` },
      inLanguage:  'en-US',
      potentialAction: {
        '@type':       'SearchAction',
        target:        { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },

    /* LocalBusiness */
    {
      '@type':      ['LocalBusiness', 'ProfessionalService', 'SoftwareApplication'],
      '@id':        `${BASE_URL}/#localbusiness`,
      name:         'AI APPS PRIVATE LIMITED',
      image:        `${BASE_URL}/og_image.png`,
      url:          BASE_URL,
      telephone:    '+918074900749',
      priceRange:   '₹₹₹',
      currenciesAccepted: 'INR, USD',
      paymentAccepted:    'Cash, Credit Card, Bank Transfer, UPI',
      address: {
        '@type':           'PostalAddress',
        streetAddress:     'Cyber View Building, VIP Hills, Madhapur',
        addressLocality:   'Hyderabad',
        addressRegion:     'Telangana',
        postalCode:        '500081',
        addressCountry:    'IN',
      },
      openingHoursSpecification: [
        {
          '@type':     'OpeningHoursSpecification',
          dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens:       '09:30',
          closes:      '18:30',
        },
      ],
      aggregateRating: {
        '@type':       'AggregateRating',
        ratingValue:   '4.9',
        reviewCount:   '30',
        bestRating:    '5',
        worstRating:   '1',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Australia' },
      ],
    },

    /* WebPage */
    {
      '@type':     'WebPage',
      '@id':       `${BASE_URL}/#webpage`,
      url:         BASE_URL,
      name:        'AI APPS PRIVATE LIMITED | Software & AI Development Company Hyderabad',
      description: 'Explore 12+ software services — Web, Mobile, AI, SaaS, ERP, IoT, Blockchain, AR/VR and more. Hyderabad-based company serving clients worldwide.',
      isPartOf:    { '@id': `${BASE_URL}/#website` },
      about:       { '@id': `${BASE_URL}/#organization` },
      inLanguage:  'en-US',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        ],
      },
    },

    /* FAQPage */
    {
      '@type': 'FAQPage',
      '@id':   `${BASE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name:    'What services does AI APPS PRIVATE LIMITED offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'We offer Web Development, Mobile App Development (Flutter/React Native), AI & ML solutions, SaaS platforms, ERP/CRM systems, IoT, Blockchain, AR/VR, DevOps, Cybersecurity, Data Analytics, and UI/UX Design.',
          },
        },
        {
          '@type': 'Question',
          name:    'Where is AI APPS PRIVATE LIMITED located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'We are headquartered in Hyderabad, Telangana, India (Madhapur, 500081) and serve clients globally across 12+ countries.',
          },
        },
        {
          '@type': 'Question',
          name:    'How can I contact AI APPS PRIVATE LIMITED?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'You can reach us at +91-8074900749, email contact@aiappshub.com, or via WhatsApp at +91-9908516950.',
          },
        },
        {
          '@type': 'Question',
          name:    'How long has AI APPS been in business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:    'AI APPS PRIVATE LIMITED was founded in 2019 in Hyderabad, India, and has since delivered 150+ projects across 12+ countries.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Favicon explicit tags for all browsers & mobile devices */}
        <link rel="icon"             href="/favicon.ico" sizes="any" />
        <link rel="icon"             href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="icon"             href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon"             href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon"             href="/favicon.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon"    href="/favicon.ico" />

        {/* WhatsApp / Telegram / iMessage / Facebook Open Graph image (under 120KB for guaranteed preview) */}
        <meta property="og:image"            content={`${BASE_URL}/og_image.jpg`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/og_image.jpg`} />
        <meta property="og:image:type"       content="image/jpeg" />
        <meta property="og:image:width"      content="1200" />
        <meta property="og:image:height"     content="630" />
        <meta property="og:image:alt"        content="AI APPS PRIVATE LIMITED — Next-Gen Software & AI Solutions" />

        {/* Fallback PNG */}
        <meta property="og:image"            content={`${BASE_URL}/og_image.png`} />
        <meta property="og:image:type"       content="image/png" />

        {/* Twitter / X */}
        <meta name="twitter:image"       content={`${BASE_URL}/og_image.jpg`} />
        <meta name="twitter:card"        content="summary_large_image" />

        {/* Local SEO Geo Tags */}
        <meta name="geo.region"    content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad, Telangana, India" />
        <meta name="geo.position"  content="17.448293;78.391485" />
        <meta name="ICBM"          content="17.448293, 78.391485" />

        {/* Extra SEO */}
        <meta name="rating"        content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language"      content="English" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
