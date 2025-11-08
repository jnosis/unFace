type TechProps = {
  name: string;
  selected: boolean;
  onClick?(name: string): void;
};

function getTechClasses(selected: boolean, isClickable: boolean): string {
  const base = 'block h-6 px-4 rounded-lg font-bold text-xs leading-6';
  const style = selected
    ? isClickable
      ? 'bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark'
      : 'bg-tertiary-container dark:bg-tertiary-container-dark text-on-tertiary-container dark:text-on-tertiary-container-dark'
    : 'outline outline-outline dark:outline-outline-dark text-on-surface-variant dark:text-on-surface-variant-dark';

  return `${base} ${style}`;
}

export default function Tech({ name, selected, onClick }: TechProps) {
  const handleClick = () => onClick?.(name);

  return (
    <li>
      {onClick
        ? (
          <button
            type='button'
            class={`${getTechClasses(selected, true)} cursor-pointer`}
            onClick={handleClick}
          >
            {name}
          </button>
        )
        : <span class={getTechClasses(selected, false)}>{name}</span>}
    </li>
  );
}
