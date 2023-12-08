import type { JSX } from 'preact/jsx-runtime';
import { color } from '~/utils/style_utils.ts';

type Item<T extends string> = {
  id: T;
  // deno-lint-ignore no-explicit-any
  Icon: (props: any) => JSX.Element;
};

type PanelProps<T extends string> = {
  name: string;
  items: Item<T>[];
  checked: string;
  onChange: (value: T) => void;
};

export default function Panel<T extends string>(
  { name, items, checked, onChange }: PanelProps<T>,
) {
  return (
    <ul
      class={`absolute flex flex-col justify-between w-36 h-28 mt-1 p-4 rounded-2xl bottom-8 sm:top-8 shadow ${
        color('bg-surface-variant text-on-surface-variant')
      }`}
    >
      {items.map((item) => (
        <li class='flex gap-1'>
          <input
            class='cursor-pointer'
            type='radio'
            name={name}
            id={item.id}
            value={item.id}
            checked={checked === item.id}
            onChange={(e) => onChange(e.currentTarget.value as T)}
          />
          <label class='flex gap-0.5 cursor-pointer' htmlFor={item.id}>
            <item.Icon />
            <span>{capitalize(item.id)}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

function capitalize(str: string) {
  return str.replace(/^./, (char) => char.toUpperCase());
}
