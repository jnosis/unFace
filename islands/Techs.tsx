import type { JSX } from 'preact/jsx-runtime';
import type { Techs } from '~/types.ts';
import Tech from '~/components/Tech.tsx';
import ClearAll from '~/components/ClearAll.tsx';

type TechsProps = {
  techs: Techs;
  selected: 'all' | string[];
  clearFilters?(e: JSX.TargetedMouseEvent<HTMLLIElement>): void;
  onClick?(e: JSX.TargetedMouseEvent<HTMLUListElement>): void;
};

export default function Techs(
  { techs, selected, clearFilters, onClick }: TechsProps,
) {
  return (
    <ul class='flex flex-wrap gap-2' onClick={onClick}>
      {techs.sort().map((tech, index) => (
        <Tech
          key={index}
          name={tech}
          selected={selected === 'all' || selected.includes(tech)}
          clickable={!!onClick}
        />
      ))}
      {!!onClick && selected.length > 0 && <ClearAll onClick={clearFilters} />}
    </ul>
  );
}
