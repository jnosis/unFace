import { JSX } from 'preact/jsx-runtime';
import type { Techs } from '~/types.ts';
import Tech from '~/components/Tech.tsx';

type TechsProps = {
  techs: Techs;
  selected: string;
  onClick?(e: JSX.TargetedMouseEvent<HTMLUListElement>): void;
};

export default function Techs({ techs, selected, onClick }: TechsProps) {
  return (
    <ul class='flex flex-wrap mt-3 gap-2' onClick={onClick}>
      {techs.map((tech, index) => (
        <Tech
          key={index}
          name={tech}
          selected={selected === tech}
          clickable={!!onClick}
        />
      ))}
    </ul>
  );
}
