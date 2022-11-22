import useScrollInto, { Scroll } from './use_scroll_into';
import useIntersectionObserver, {
  IntersectionOptions,
} from './use_intersection_observer';

export default function useScrolls<K extends string, E extends HTMLElement>(
  names: K[],
  intersectionOptions: IntersectionOptions,
  scrollIntoOptions: ScrollIntoViewOptions = { behavior: 'smooth' }
): Record<K, Scroll<E>> {
  return names.reduce((prev, name) => {
    const [ref, onScrollInto] = useScrollInto<E>(scrollIntoOptions);
    useIntersectionObserver(ref, intersectionOptions);
    return { ...prev, [name]: [ref, onScrollInto] };
  }, {} as Record<K, Scroll<E>>);
}
