import { color } from '~/utils/style_utils.ts';

type TechProps = {
  name: string;
  selected: boolean;
  clickable?: boolean;
};

export default function Tech({ name, selected, clickable }: TechProps) {
  return (
    <li
      class={`h-6 px-4 rounded-lg font-bold text-xs leading-6 ${
        color('text-on-surface-variant')
      } ${
        selected
          ? clickable
            ? color('bg-secondary-container')
            : color('bg-tertiary-container')
          : `outline outline-1 ${color('outline-outline')}`
      }${clickable ? ' cursor-pointer' : ''}`}
      data-tech={name}
    >
      {name}
    </li>
  );
}
