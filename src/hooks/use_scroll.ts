import { useRef } from 'react';

type Scroll<E> = [React.RefObject<E>, () => void];

export default function useScroll<E extends HTMLElement>(
  options: ScrollIntoViewOptions = { behavior: 'smooth' }
): Scroll<E> {
  const elementRef = useRef<E>(null);
  const onScrollIntoElement = () => {
    elementRef.current?.scrollIntoView(options);
  };

  return [elementRef, onScrollIntoElement];
}

export function useScrolls<K extends string, E extends HTMLElement>(
  names: K[],
  options: ScrollIntoViewOptions = { behavior: 'smooth' }
): Record<K, Scroll<E>> {
  return names.reduce(
    (prev, name) => ({ ...prev, [name]: useScroll<E>(options) }),
    {} as Record<K, Scroll<E>>
  );
}
