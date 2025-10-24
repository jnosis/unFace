import type { ComponentType } from 'preact';

type Item<T extends string> = {
  id: T;
  Icon: ComponentType;
};

type PanelProps<T extends string> = {
  name: string;
  items: Item<T>[];
  checked: string;
  onChange(value: T): void;
};

export default function Panel<T extends string>(
  { name, items, checked, onChange }: PanelProps<T>,
) {
  return (
    <ul class='absolute flex flex-col justify-between w-36 h-28 mt-1 p-4 rounded-2xl bottom-8 sm:top-8 shadow bg-surface-variant text-on-surface-variant dark:bg-surface-variant-dark dark:text-on-surface-variant-dark'>
      {items.map((item) => (
        <li key={item.id} class='flex gap-1'>
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
