import type { MenuItem } from '~/types.ts';
import { color } from '~/utils/style_utils.ts';

type NavItemProps = {
  name: MenuItem;
  activated: boolean;
};

export default function NavItem({ name, activated }: NavItemProps) {
  return (
    <li
      class={`cursor-pointer px-4 py-2 rounded-2xl transition duration-300 ${
        color(
          activated
            ? 'bg-secondary-container text-on-secondary-container'
            : 'hover:bg-surface-variant hover:text-on-surface-variant',
        )
      }`}
      data-name={name}
    >
      {name.toUpperCase()}
    </li>
  );
}
