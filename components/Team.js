'use client';
import { useState } from 'react';
import Image from 'next/image';
import { teamMembers } from '@/data/siteData';
import styles from './Team.module.css';

function TeamCard({ member, index }) {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${(index % 8) * 40}ms` }}
    >
      <div className={styles.cardHeaderGlow} />

      {/* Avatar */}
      <div className={styles.avatarContainer}>
        <div className={styles.avatarRing} />
        <div className={styles.avatarInner}>
          {!imgError && member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="100px"
              className={styles.avatarImage}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {initials}
            </div>
          )}
        </div>
        <span className={styles.statusIndicator} />
      </div>

      {/* Member Details */}
      <h3 className={styles.memberName}>{member.name}</h3>
      <div className={styles.roleBadge}>
        <span>{member.role}</span>
      </div>

      <p className={styles.memberBio}>{member.bio}</p>
    </div>
  );
}

export default function Team() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? teamMembers : teamMembers.slice(0, 6);

  return (
    <section id="team" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-up">
          <span className="section-tag">Executive & Engineering Team</span>
          <h2 className="section-title">
            Meet The <span className="gradient-text">Leadership & Minds</span>
          </h2>
          <p className="section-sub">
            A diverse, world-class team of {teamMembers.length}+ developers, AI architects, and QA specialists dedicated to excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className={styles.grid}>
          {visible.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Show More Button */}
        {teamMembers.length > 6 && (
          <div className={styles.showMoreWrap}>
            <button
              type="button"
              className={styles.showMoreBtn}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>Show Fewer Members ↑</>
              ) : (
                <>View All {teamMembers.length} Team Members ({teamMembers.length - 6} More) ↓</>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
