import { HttpError } from 'fresh';
import { define } from '~/utils/define.ts';

export default define.page(function ErrorPage(props) {
  let message = 'Oh no...';
  const error = props.error;

  if (error instanceof Error) {
    if (error instanceof HttpError) {
      const status = error.status;
      if (status === 404) {
        message = 'Not Found';
      }
    }
    props.state.msg = error.message;
  }

  return (
    <section class='flex flex-col justify-center items-center w-full h-full mt-16 pt-8'>
      <h1 class='text-3xl font-bold'>{message}</h1>
      <a href='/'>Go To Home</a>
    </section>
  );
});
