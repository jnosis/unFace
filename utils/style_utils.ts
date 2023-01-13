export function color(styles: string): string {
  return styles
    .split(' ')
    .map((style) => `${style} dark:${style}-dark`)
    .join(' ');
}
