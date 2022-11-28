import React, { useEffect, useState } from 'react';

export type IntersectionOptions = IntersectionObserverInit & {
  onChange?(entry: IntersectionObserverEntry): void;
};

export default function useIntersectionObserver<E extends Element>(
  ref: React.RefObject<E>,
  options: IntersectionOptions
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const { threshold, root, rootMargin, onChange } = options;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    onChange && onChange(entry);
    setEntry(entry);
  };

  useEffect(() => {
    const node = ref?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref?.current, JSON.stringify(threshold), root, rootMargin]);

  return entry;
}
