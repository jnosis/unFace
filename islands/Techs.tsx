import type { Techs } from '~/types.ts';
import Tech from '~/components/Tech.tsx';
import ClearAll from '~/components/ClearAll.tsx';

type TechsProps = {
  techs: Techs;
  selected: 'all' | string[];
  onClear?(): void;
  onTechClick?(tech: string): void;
};

export default function Techs(
  { techs, selected, onClear, onTechClick }: TechsProps,
) {
  return (
    <ul class='flex flex-wrap gap-2'>
      {techs.sort().map((tech, index) => (
        <Tech
          key={index}
          name={tech}
          selected={selected === 'all' || selected.includes(tech)}
          onClick={onTechClick}
        />
      ))}
      {!!onTechClick && selected.length > 0 && <ClearAll onClick={onClear} />}
    </ul>
  );
}
