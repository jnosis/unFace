import type { JSX } from 'preact/jsx-runtime';
import { useState } from 'preact/hooks';
import type { WorkData } from '~/types.ts';
import Techs from '~/islands/Techs.tsx';
import Works from '~/islands/Works.tsx';

type WorksSectionProps = {
  works: WorkData[];
};

export default function WorksSection({ works }: WorksSectionProps) {
  const techs = works && [...new Set(works.map((work) => work.techs).flat())];
  const [selected, setSelected] = useState<string>('');

  const handleTechClick = (e: JSX.TargetedMouseEvent<HTMLUListElement>) => {
    const { dataset: { tech } } = e.target as HTMLElement;
    tech && (tech === selected ? setSelected('') : setSelected(tech));
  };

  return (
    <section
      class={`w-full mt-10 ${'scroll-mt-20'} sm:mt-16 px-4 sm:px-10`}
      id='works'
    >
      <h1 class='text-4xl font-bold'>Works</h1>
      <div class='px-0 sm:px-2'>
        <Techs techs={techs} selected={selected} onClick={handleTechClick} />
        <Works works={works} filter={selected} />
      </div>
    </section>
  );
}
