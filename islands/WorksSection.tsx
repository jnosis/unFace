import type { WorkData } from '~/types.ts';
import { useMemo } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import Techs from '~/islands/Techs.tsx';
import Works from '~/islands/Works.tsx';
import NoItemsFound from '~/components/NoItemFound.tsx';

type WorksSectionProps = {
  works: WorkData[];
};

export default function WorksSection({ works }: WorksSectionProps) {
  const techs = useMemo(() => {
    return [...new Set(works.map((work) => work.techs).flat())];
  }, [works]);
  const selected = useSignal<string[]>([]);

  const filteredWorks = useMemo(() => {
    if (selected.value.length === 0) {
      return works;
    }
    return works.filter((work) =>
      selected.value.every((f) => work.techs.includes(f))
    );
  }, [works, selected.value]);

  const toggleTech = (tech: string) => {
    if (selected.value.includes(tech)) {
      selected.value = [...selected.value.filter((str) => str !== tech)];
    } else {
      selected.value = [...selected.value, tech];
    }
  };

  const clearFilters = () => selected.value = [];

  return (
    <section
      class='w-full mt-10 scroll-mt-20 sm:mt-16 px-4 sm:px-10'
      id='works'
    >
      <h1 class='mb-3 text-4xl font-bold'>Works</h1>
      <div class='px-0 sm:px-2'>
        <Techs
          techs={techs}
          selected={selected.value}
          onClear={clearFilters}
          onTechClick={toggleTech}
        />
        <ul class='mt-4 py-0 sm:py-2 grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-8'>
          {filteredWorks.length > 0
            ? <Works works={filteredWorks} filters={selected.value} />
            : <NoItemsFound onClick={clearFilters} />}
        </ul>
      </div>
    </section>
  );
}
