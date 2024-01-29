import type { JSX } from 'preact/jsx-runtime';
import { IconClearAll } from '~/components/Icons.tsx';

type ClearAllProps = {
  onClick?(e: JSX.TargetedMouseEvent<HTMLLIElement>): void;
};

export default function ClearAll({ onClick }: ClearAllProps) {
  return (
    <li
      class='flex items-center h-6 px-4 rounded-lg font-bold text-xs leading-6 bg-tertiary-container dark:bg-tertiary-container-dark text-on-tertiary-container dark:text-on-tertiary-container-dark cursor-pointer'
      onClick={onClick}
    >
      <IconClearAll class='w-5 h-5' />
    </li>
  );
}
