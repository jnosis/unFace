import type { WorkData } from '~/types.ts';
import WorkCard from '~/components/WorkCard.tsx';

type WorksProps = {
  works: WorkData[];
  filters: string[];
};

export default function Works({ works, filters }: WorksProps) {
  return (
    <>
      {works.map((work) => (
        <WorkCard key={work.id} work={work} filters={filters} />
      ))}
    </>
  );
}
