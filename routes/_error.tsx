import type { PageProps } from 'fresh';
import { HttpError } from 'fresh';

export default function ErrorPage(props: PageProps) {
  let message = 'Oh no...';
  const error = props.error;
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
}
