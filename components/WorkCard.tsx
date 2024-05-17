import type { WorkData } from '~/types.ts';
import Techs from '~/islands/Techs.tsx';
import { isFileData } from '~/utils/type_utils.ts';

type WorkCardProps = {
  work: WorkData;
  filters: string[];
};

export default function WorkCard({ work, filters }: WorkCardProps) {
  const { thumbnail, title, description, techs } = work;
  const fileUrl = isFileData(thumbnail) ? thumbnail.path : thumbnail.url;

  const handleClick = () => {
    location.assign(`/works/${title}`);
  };

  return (
    <li
      class='relative w-full h-full min-h-[20rem] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 duration-300 bg-surface-variant text-on-surface-variant dark:bg-surface-variant-dark dark:text-on-surface-variant-dark'
      onClick={handleClick}
    >
      <img
        class='w-full aspect-[8/5] rounded-b-2xl'
        src={fileUrl || '/images/default.jpg'}
        alt='work thumbnail'
      />
      <div class='mb-2 pt-1 px-4 pb-4'>
        <h1 class='text-3xl font-bold'>{title}</h1>
        <p class='pt-2 mb-3 text-base'>{description}</p>
        <Techs techs={techs} selected={filters} />
      </div>
    </li>
  );
}
