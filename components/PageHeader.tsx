import React from 'react';

interface PageHeaderProps {
  /** Small eyebrow text above the heading */
  eyebrow?: string;
  /** Main page title (h1) */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Alignment: "left" | "center" (default "center") */
  align?: 'left' | 'center';
  /** Extra classes on the outer wrapper */
  className?: string;
}

/**
 * PageHeader — reusable hero/title block for inner pages.
 * Renders eyebrow, h1, and optional subtitle with consistent styling.
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: PageHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl mb-12 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-3 block">
          {eyebrow}
        </span>
      )}
      <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-darkBlue leading-tight mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-neutral-gray text-base leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
