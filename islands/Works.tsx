import type { WorkData } from '~/types.ts';
import NoItemsFound from '~/components/NoItemFound.tsx';
import WorkCard from '~/components/WorkCard.tsx';

type WorksProps = {
  works: WorkData[];
  filters: string[];
};

export default function Works({ works, filters }: WorksProps) {
  const filtered = works.filter((work) =>
    filters.length === 0 ? true : filters.reduce(
      (prev, filter) => prev && work.techs.includes(filter),
      true,
    )
  );

  return (
    <ul class='mt-4 py-0 sm:py-2 grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-8'>
      {filtered.length
        ? filtered.map((work) => (
          <WorkCard key={work.id} work={work} filters={filters} />
        ))
        : <NoItemsFound />}
    </ul>
  );
}
