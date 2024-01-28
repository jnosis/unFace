export default function NoItemsFound() {
  return (
    <li class='relative flex flex-col justify-center items-center w-full h-full min-h-[20rem] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.01] duration-300 bg-surface-variant text-on-surface-variant dark:bg-surface-variant-dark dark:text-on-surface-variant-dark'>
      <h1 class='text-3xl font-bold'>No Items Found</h1>
    </li>
  );
}
