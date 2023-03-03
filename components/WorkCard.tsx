import type { WorkData } from '~/types.ts';
import Techs from '~/islands/Techs.tsx';
import { color } from '~/utils/style_utils.ts';

type WorkCardProps = {
  work: WorkData;
  filter: string;
};

export default function WorkCard({ work, filter }: WorkCardProps) {
  const { thumbnail, title, description, techs } = work;
  const { fileUrl } = thumbnail;

  const handleClick = () => {
    location.assign(`/works/${title}`);
  };

  return (
    <li
      class={`relative w-full h-full min-h-[20rem] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 duration-300 ${
        color('bg-surface-variant text-on-surface-variant')
      }`}
      onClick={handleClick}
    >
      <img
        class='w-full aspect-[8/5] rounded-b-2xl'
        src={fileUrl || '/images/default.jpg'}
        alt='work thumbnail'
      />
      <div class='pt-1 px-4 pb-4 mb-2'>
        <h1 class='text-3xl font-bold'>{title}</h1>
        <p class='pt-2 text-base'>{description}</p>
        <Techs techs={techs} selected={filter} />
      </div>
    </li>
  );
}
