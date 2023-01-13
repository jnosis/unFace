import type { WorkData } from '~/types.ts';
import WorkCard from '~/components/WorkCard.tsx';

type WorksProps = {
  works: WorkData[];
  filter: string;
};

export default function Works({ works, filter }: WorksProps) {
  return (
    <ul class='mt-4 py-0 sm:py-2 grid grid-cols-1 sm:grid-cols-2 grid-flow-row gap-8'>
      {works.filter((work) =>
        filter === '' ? true : work.techs.includes(filter)
      ).map((work) => <WorkCard key={work.id} work={work} filter={filter} />)}
    </ul>
  );
}
