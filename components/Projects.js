'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { productSolutions, productFilterCategories, pricingData } from '@/data/siteData';
import { productPackagesData } from '@/data/productPackagesData';
import styles from './Projects.module.css';

function ProductCard({ product, onOpenModal }) {
  const [imgError, setImgError] = useState(false);
  const pkgData = productPackagesData[product.slug] || null;

  const displayImage = imgError 
    ? (product.cardImage || '/hero_bg.jpg') 
    : (product.image || product.cardImage || '/hero_bg.jpg');

  const startPrice = pkgData?.packages?.[0]?.price 
    || (product.hyderabadPrice ? `₹${product.hyderabadPrice.toLocaleString('en-IN')}/-` : 'Custom Quote');

  return (
    <article className={styles.card}>
      {/* Top Media Area */}
      <div className={styles.imgWrap}>
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.img}
          onError={() => setImgError(true)}
        />
        <div className={styles.imgGradient} />

        {/* Floating Badges */}
        <div className={styles.topBadges}>
          <span className={styles.categoryBadge}>
            {product.icon} {product.category}
          </span>
          {product.popular && (
            <span className={styles.popularBadge}>
              🔥 Popular
            </span>
          )}
        </div>
      </div>

      {/* Main Card Content */}
      <div className={styles.cardBody}>
        <div className={styles.priceRow}>
          <div>
            <span className={styles.priceLabel}>Starting from</span>
            <span className={styles.priceValue}>{startPrice}</span>
          </div>
          {product.deliveryTime && (
            <span className={styles.deliveryBadge}>
              ⏱️ {product.deliveryTime}
            </span>
          )}
        </div>

        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.desc}>{product.shortDescription || product.longDescription}</p>

        {/* Deliverables / Features List */}
        {product.features && product.features.length > 0 && (
          <ul className={styles.featuresList}>
            {product.features.slice(0, 3).map((feat, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{feat}</span>
              </li>
            ))}
            {product.features.length > 3 && (
              <li className={styles.moreFeats}>+{product.features.length - 3} more modules</li>
            )}
          </ul>
        )}

        {/* Tech Stack Pills */}
        <div className={styles.techStack}>
          {product.technologies && product.technologies.slice(0, 3).map((t) => (
            <span key={t} className={styles.techPill}>{t}</span>
          ))}
          {product.technologies && product.technologies.length > 3 && (
            <span className={styles.techMore}>+{product.technologies.length - 3}</span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.actionBtns}>
          {product.demo?.url && (
            <a
              href={product.demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveBtn}
            >
              <span>Live Demo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}

          <a
            href={`https://api.whatsapp.com/send?phone=919908516950&text=${encodeURIComponent(
              `Hi AI APPS Team, I am interested in ${product.name} (Starting at ${startPrice}). Please share full details and demo.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.044-1.924-.469-1.464-.61-2.404-2.112-2.477-2.21-.07-.099-.604-.805-.604-1.536 0-.73.382-1.09.518-1.238.136-.149.297-.186.396-.186.099 0 .198.001.284.005.091.004.213-.034.333.254.124.297.424 1.035.461 1.11.037.074.062.161.012.26-.049.099-.074.16-.148.247-.074.086-.156.193-.223.259-.074.074-.151.155-.065.303.086.148.385.636.826 1.029.568.507 1.047.665 1.196.739.149.074.235.062.322-.037.086-.099.37-.433.469-.582.099-.149.198-.124.334-.074.136.049.865.408 1.014.482.148.074.247.111.284.173.037.062.037.359-.107.764zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.954-1.397A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.637 0-3.15-.477-4.42-1.298l-.317-.204-2.92.823.824-2.846-.226-.339A8.17 8.17 0 013.8 12c0-4.521 3.679-8.2 8.2-8.2 4.522 0 8.2 3.679 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function ProductModal({ product, onClose }) {
  if (!product) return null;
  const pkgData = productPackagesData[product.slug] || null;

  const launchPrice = pkgData?.packages?.[0]?.price 
    || (product.hyderabadPrice ? `₹${product.hyderabadPrice.toLocaleString('en-IN')}/-` : 'Custom Quote');

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalIconWrap}>{product.icon || '🚀'}</div>
          <div>
            <span className={styles.modalCat}>{product.category} • {product.subcategory}</span>
            <h2 className={styles.modalTitle}>{product.name}</h2>
          </div>
        </div>

        <p className={styles.modalDesc}>{product.longDescription || product.shortDescription}</p>

        {/* Price & SLA Grid */}
        <div className={styles.modalInfoGrid}>
          <div className={styles.modalInfoBox}>
            <span className={styles.infoLabel}>Starting Package Price</span>
            <strong className={styles.infoValGradient}>
              {launchPrice}
            </strong>
          </div>

          <div className={styles.modalInfoBox}>
            <span className={styles.infoLabel}>Standard Other Cities</span>
            <strong className={styles.infoVal}>
              ₹{product.otherCitiesPrice?.toLocaleString('en-IN') || '₹2,20,000'}
            </strong>
          </div>

          <div className={styles.modalInfoBox}>
            <span className={styles.infoLabel}>EMI Option</span>
            <strong className={styles.infoVal}>
              {product.emiOptions?.['12months'] || 'Available on request'}
            </strong>
          </div>

          <div className={styles.modalInfoBox}>
            <span className={styles.infoLabel}>Delivery & Support</span>
            <strong className={styles.infoVal}>
              {pkgData?.deliveryTime || product.deliveryTime || '10-12 Days'} • {product.support || '1 Year Support'}
            </strong>
          </div>
        </div>

        {/* Available Packages from Dexterous */}
        {pkgData?.packages && pkgData.packages.length > 0 && (
          <div className={styles.featuresSection}>
            <h4 className={styles.featuresHeading}>📦 Available Package Tiers</h4>
            <div className={styles.featuresPriceGrid}>
              {pkgData.packages.map((pkg) => (
                <div key={pkg.id} className={styles.featurePriceRow}>
                  <span>✓ {pkg.name} ({pkg.tag})</span>
                  <strong style={{ color: 'var(--primary)' }}>{pkg.price}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demo Credentials Box */}
        {product.demo?.credentials && (
          <div className={styles.credentialsBox}>
            <div className={styles.credHeader}>
              <span>🔑 Live Demo Access & Credentials</span>
              {product.demo?.url && (
                <a
                  href={product.demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.credLink}
                >
                  Open Live Demo ↗
                </a>
              )}
            </div>
            <div className={styles.credGrid}>
              {Object.entries(product.demo.credentials).map(([role, cred]) => (
                <div key={role} className={styles.credItem}>
                  <span className={styles.credRole}>{role.toUpperCase()} PANEL:</span>
                  <code className={styles.credCode}>{cred}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Included Features & Breakdown */}
        {product.featurePrices && (
          <div className={styles.featuresSection}>
            <h4 className={styles.featuresHeading}>Included Modules & Component Value</h4>
            <div className={styles.featuresPriceGrid}>
              {Object.entries(product.featurePrices).map(([name, price]) => (
                <div key={name} className={styles.featurePriceRow}>
                  <span>✓ {name}</span>
                  <strong>{price}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guarantees & Deliverables */}
        <div className={styles.guaranteesGrid}>
          <div className={styles.gItem}>
            <span>💻</span>
            <div>
              <strong>Full Source Code</strong>
              <p>Private GitHub Repository with Commercial License</p>
            </div>
          </div>

          <div className={styles.gItem}>
            <span>☁️</span>
            <div>
              <strong>1 Year Free AWS Hosting</strong>
              <p>High availability setup & 6 Months Free Maintenance</p>
            </div>
          </div>

          <div className={styles.gItem}>
            <span>📱</span>
            <div>
              <strong>Store Deployment</strong>
              <p>Google Play Store & Apple App Store Submission</p>
            </div>
          </div>

          <div className={styles.gItem}>
            <span>🛡️</span>
            <div>
              <strong>Security & Compliance</strong>
              <p>SSL Encryption, Razorpay/Stripe, GDPR Compliant</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className={styles.modalActions}>
          <a
            href="#contact"
            onClick={onClose}
            className={`btn-primary ${styles.modalActionBtn}`}
          >
            <span>Book / Order This Solution</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <button type="button" onClick={onClose} className="btn-ghost">
            <span>Close Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PricingCalculator() {
  const [selectedService, setSelectedService] = useState('website');
  const [selectedAddons, setSelectedAddons] = useState([]);

  const baseService = pricingData.services.find(s => s.id === selectedService) || pricingData.services[0];
  const basePrice = baseService?.base || 0;

  const addonTotal = selectedAddons.reduce((sum, addonId) => {
    const item = pricingData.addons.find(a => a.id === addonId);
    return sum + (item?.price || 0);
  }, 0);

  const totalPrice = basePrice + addonTotal;

  const toggleAddon = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.pricingSection} id="pricing">
      <div className="section-header reveal-up">
        <span className="section-tag">Instant Quote</span>
        <h2 className="section-title">
          Custom <span className="gradient-text">Pricing Calculator</span>
        </h2>
        <p className="section-sub">
          Select your requirements below to get a transparent and instant project estimation.
        </p>
      </div>

      <div className={styles.pricingGrid}>
        {/* Step 1: Select Service */}
        <div className={`${styles.pricingBox} reveal-up`}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNum}>1</span>
            <h4>Select Core Service</h4>
          </div>
          <div className={styles.serviceList}>
            {pricingData.services.map((service) => {
              const isSelected = selectedService === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  className={`${styles.serviceCard} ${isSelected ? styles.serviceCardActive : ''}`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className={styles.serviceInfo}>
                    <span className={styles.serviceName}>{service.label}</span>
                    <span className={styles.serviceDesc}>{service.desc}</span>
                  </div>
                  <div className={styles.servicePriceBadge}>
                    {service.displayPrice}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Feature Addons */}
        <div className={`${styles.pricingBox} reveal-up`}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNum}>2</span>
            <h4>Add Powerful Features</h4>
          </div>
          <div className={styles.addonList}>
            {pricingData.addons.map((addon) => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  className={`${styles.addonCard} ${isChecked ? styles.addonCardActive : ''}`}
                  onClick={() => toggleAddon(addon.id)}
                >
                  <div className={styles.addonLeft}>
                    <span className={styles.addonIcon}>{addon.icon}</span>
                    <div>
                      <span className={styles.addonLabel}>{addon.label}</span>
                    </div>
                  </div>
                  <div className={styles.addonRight}>
                    <span className={styles.addonPrice}>+{addon.displayPrice}</span>
                    <span className={`${styles.checkbox} ${isChecked ? styles.checkboxChecked : ''}`}>
                      {isChecked ? '✓' : ''}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Realtime Estimate Summary */}
        <div className={`${styles.pricingBox} ${styles.summaryBox} reveal-up`}>
          <div className={styles.stepHeader}>
            <span className={styles.stepNum}>3</span>
            <h4>Estimated Quote</h4>
          </div>

          <div className={styles.breakdown}>
            <div className={styles.breakdownItem}>
              <span>{baseService?.label}</span>
              <strong>₹{basePrice.toLocaleString('en-IN')}</strong>
            </div>

            {selectedAddons.map((id) => {
              const addon = pricingData.addons.find(a => a.id === id);
              return (
                <div key={id} className={styles.breakdownItem}>
                  <span>{addon?.icon} {addon?.label}</span>
                  <strong>+₹{addon?.price.toLocaleString('en-IN')}</strong>
                </div>
              );
            })}

            <div className={styles.totalRow}>
              <div>
                <span className={styles.totalLabel}>Estimated Budget</span>
                <span className={styles.totalSub}>GST & Hosting additional</span>
              </div>
              <div className={styles.totalAmount}>
                <span className="gradient-text">₹{totalPrice.toLocaleString('en-IN')}*</span>
              </div>
            </div>

            <p className={styles.disclaimer}>
              *Final quote is customized after full requirement discussion. 100% money-back sprint assurance.
            </p>

            <a href="#contact" className={`btn-primary ${styles.quoteBtn}`}>
              <span>Request Detailed Proposal</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProjects = useMemo(() => {
    return productSolutions.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.shortDescription && item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.technologies && item.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 8);

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-up">
          <span className="section-tag">READY-TO-LAUNCH SOLUTIONS</span>
          <h2 className="section-title">
            Product <span className="gradient-text">Solutions</span>
          </h2>
          <p className="section-sub">
            Explore {productSolutions.length}+ ready-to-deploy mobile apps, multi-vendor marketplaces, and web systems with full source code, Google Play deployment, and free AWS hosting.
          </p>
        </div>

        {/* Filter Bar & Quick Search */}
        <div className={`${styles.filterBar} reveal-up`}>
          <div className={styles.filterTabs}>
            {productFilterCategories.map((f) => {
              const count = f.key === 'all' 
                ? productSolutions.length 
                : productSolutions.filter(p => p.category === f.key).length;
              const isActive = activeCategory === f.key;

              return (
                <button
                  key={f.key}
                  type="button"
                  className={`${styles.filterTab} ${isActive ? styles.filterTabActive : ''}`}
                  onClick={() => {
                    setActiveCategory(f.key);
                    setShowAll(false);
                  }}
                >
                  <span>{f.label}</span>
                  <span className={styles.tabBadge}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="Search product solutions, tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className={styles.clearSearch}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No product solutions found matching your search. Try resetting filters.</p>
            <button
              className={styles.resetBtn}
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={styles.projectsGrid}>
            {visibleProjects.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenModal={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Show More / Show Less Button */}
        {filteredProjects.length > 8 && (
          <div className={styles.showMoreWrap}>
            <button
              type="button"
              className={styles.showMoreBtn}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>Show Fewer Solutions ↑</>
              ) : (
                <>View All {filteredProjects.length} Product Solutions ({filteredProjects.length - 8} More) ↓</>
              )}
            </button>
          </div>
        )}

        {/* Interactive Pricing Estimator */}
        <PricingCalculator />
      </div>

      {/* Interactive Product Detail & Specs Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
