import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  /** Background colour value, e.g. "#ffffff" or "var(--neutral-lightGray)". Defaults to "#ffffff". */
  bg?: string;
  /** Extra inline styles on the <section> element */
  className?: string;
  id?: string;
}

/**
 * Section — standardised page section with consistent vertical rhythm (py-20 px-6).
 * Wraps content in a <section> and applies a centred container-max div.
 */
export default function Section({ children, bg = 'bg-white', className = '', id }: SectionProps) {
  return (
    <section
      id={id}
      className={`page-section ${bg} ${className}`}
    >
      <div className="container-max">{children}</div>
    </section>
  );
}
