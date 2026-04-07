import { define } from '~/utils/define.ts';

export default define.layout(function ErrorPage(props) {
  let message = 'Oh no...';
  const error = props.error;

  if (error instanceof Error) {
    message = error.message;
  }
  props.state.msg = message;

  return (
    <section class='flex flex-col justify-center items-center w-full h-full mt-16 pt-8'>
      <h1 class='text-3xl font-bold'>{message}</h1>
      <a href='/'>Go To Home</a>
    </section>
  );
});
