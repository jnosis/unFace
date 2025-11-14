import { HttpError } from 'fresh';
import { define } from '~/utils/define.ts';

export default define.page(function ErrorPage(props) {
  let message = 'Oh no...';
  const error = props.error;
  console.error(error);

  if (error instanceof HttpError) {
    const status = error.status;
    if (status === 404) {
      message = 'Not Found';
    }
  }

  return (
    <section class='flex flex-col justify-center items-center w-full h-full mt-16 pt-8'>
      <h1 class='text-3xl font-bold'>{message}</h1>
      <a href='/'>Go To Home</a>
    </section>
  );
});
