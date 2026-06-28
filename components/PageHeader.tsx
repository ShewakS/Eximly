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
  const isCentered = align === 'center';
  const alignClass = isCentered ? 'page-header-centered' : 'page-header-left';

  return (
    <div className={`page-header ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="page-header-eyebrow font-bold tracking-wider text-xs uppercase block mb-3">
          {eyebrow}
        </span>
      )}
      <h1 className="page-header-title font-extrabold leading-tight mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="page-header-subtitle text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
