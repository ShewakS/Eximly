import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container — thin wrapper around container-max (max-w-7xl mx-auto).
 * Use wherever you need a centred constrained-width block without a full Section.
 */
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container-max ${className}`}>{children}</div>
  );
}
