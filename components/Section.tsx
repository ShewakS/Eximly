import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  /** Background class, e.g. "bg-white", "bg-neutral-lightGray". Defaults to "bg-white". */
  bg?: string;
  /** Extra classes to merge onto the <section> element */
  className?: string;
  id?: string;
}

/**
 * Section — standardised page section with consistent vertical rhythm (py-20 px-6).
 * Wraps content in a <section> and applies a centred container-max div.
 */
export default function Section({ children, bg = 'bg-white', className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-6 ${bg} ${className}`}>
      <div className="container-max">{children}</div>
    </section>
  );
}
