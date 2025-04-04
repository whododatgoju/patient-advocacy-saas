import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  role?: 'patient' | 'advocate' | 'provider';
  animation?: 'fadeIn' | 'slideUp' | 'pulse';
  status?: 'new' | 'pending' | 'completed' | 'cancelled';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  interactive = false,
  padding = 'md',
  bordered = false,
  role,
  animation,
  status,
  onClick,
}) => {
  const cardClasses = [
    styles.card,
    interactive ? styles.interactive : '',
    styles[`padding-${padding}`],
    bordered ? styles.bordered : '',
    role ? styles[role] : '',
    animation ? styles[animation] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} onClick={interactive ? onClick : undefined}>
      {status && (
        <div className={`${styles.statusBadge} ${styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )}
      {children}
    </div>
  );
};

// Card subcomponents for organized structure
Card.Header = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`${styles.header} ${className}`}>{children}</div>
);

Card.Body = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`${styles.body} ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`${styles.footer} ${className}`}>{children}</div>
);

Card.Grid = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`${styles.cardGrid} ${className}`}>{children}</div>
);

export default Card;
