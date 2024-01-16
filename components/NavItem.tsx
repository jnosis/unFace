import type { MenuItem } from '~/types.ts';

type NavItemProps = {
  name: MenuItem;
  activated: boolean;
};

export default function NavItem({ name, activated }: NavItemProps) {
  return (
    <li
      class={`cursor-pointer px-4 py-2 rounded-2xl transition duration-300 ${
        activated
          ? 'bg-secondary-container text-on-secondary-container dark:bg-secondary-container-dark dark:text-on-secondary-container-dark'
          : 'hover:bg-surface-variant hover:text-on-surface-variant dark:hover:bg-surface-variant-dark dark:hover:text-on-surface-variant-dark'
      }`}
      data-name={name}
    >
      {name.toUpperCase()}
    </li>
  );
}
