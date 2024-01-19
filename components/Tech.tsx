type TechProps = {
  name: string;
  selected: boolean;
  clickable?: boolean;
};

export default function Tech({ name, selected, clickable }: TechProps) {
  return (
    <li
      class={`h-6 px-4 rounded-lg font-bold text-xs leading-6 ${
        selected
          ? clickable
            ? 'bg-secondary-container dark:bg-secondary-container-dark text-on-secondary-container dark:text-on-secondary-container-dark'
            : 'bg-tertiary-container dark:bg-tertiary-container-dark text-on-tertiary-container dark:text-on-tertiary-container-dark'
          : 'outline outline-1 outline-outline dark:outline-outline-dark text-on-surface-variant dark:text-on-surface-variant-dark'
      }${clickable ? ' cursor-pointer' : ''}`}
      data-tech={name}
    >
      {name}
    </li>
  );
}
