import { useEffect, useRef } from 'react';

export default function ProductLoadMore({ hasMore, isLoading, error, onLoadMore }) {
  const triggerRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !hasMore || isLoading || error) return undefined;

    const checkScrollPosition = () => {
      const { top } = trigger.getBoundingClientRect();
      if (top <= window.innerHeight + 240) onLoadMore();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: '240px' },
    );
    observer.observe(trigger);
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition);
    checkScrollPosition();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [hasMore, isLoading, error, onLoadMore]);

  if (!hasMore && !error) return null;

  return (
    <div className="product-load-more" ref={triggerRef} aria-live="polite">
      {isLoading && <span>Loading more products…</span>}
      {!isLoading && !error && (
        <button type="button" className="secondary-btn" onClick={onLoadMore}>
          Load more products
        </button>
      )}
      {error && (
        <>
          <span>Could not load more products: {error}</span>
          <button type="button" className="secondary-btn" onClick={onLoadMore}>Try again</button>
        </>
      )}
    </div>
  );
}
