import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PublicRouteMotion = ({ children }) => {
  const location = useLocation();
  const contentRef = useRef(null);
  const isAdmin = location.pathname.startsWith('/admin');

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element || isAdmin || !element.animate || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const styles = window.getComputedStyle(element);
    const duration = Number.parseFloat(styles.getPropertyValue('--motion-route')) || 220;
    const easing = styles.getPropertyValue('--motion-ease-out').trim() || 'cubic-bezier(0.16, 1, 0.3, 1)';

    const animation = element.animate(
      [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration, easing }
    );
    return () => animation.cancel();
  }, [location.key, isAdmin]);

  if (isAdmin) return children;
  return <div ref={contentRef} className="public-app">{children}</div>;
};

export default PublicRouteMotion;
