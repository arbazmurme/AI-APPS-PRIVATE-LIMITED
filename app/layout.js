import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://aiappshub.com'),
  title: 'AI APPS PRIVATE LIMITED | Next-Gen Software Development & AI Solutions',
  description: 'AI APPS PRIVATE LIMITED – Premium software development company specializing in ready-to-launch mobile apps, web solutions, AI architectures, and enterprise platforms.',
  keywords: ['AI development', 'mobile apps', 'ready to launch solutions', 'web development', 'software company India', 'Hyderabad tech company'],
  authors: [{ name: 'AI APPS PRIVATE LIMITED' }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'AI APPS PRIVATE LIMITED | Next-Gen Software Development & AI Solutions',
    description: 'Explore 16+ ready-to-deploy mobile apps, multi-vendor marketplaces, and intelligent software systems with source code & AWS hosting.',
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
    description: 'Explore 16+ ready-to-deploy mobile apps, multi-vendor marketplaces, and intelligent software systems with source code & AWS hosting.',
    images: ['/share_img.png'],
  },
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
        {/* OpenGraph & WhatsApp Social Card Fallback Tags */}
        <meta property="og:image" content="/share_img.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image" content="/share_img.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
