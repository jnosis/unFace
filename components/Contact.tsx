import { IconBrandGithub, IconMail } from '~/components/Icons.tsx';

type ContactProps = {
  email: string;
  github: string;
};

export default function Contact({ email, github }: ContactProps) {
  return (
    <article class='py-12 rounded-[2rem] bg-secondary text-on-secondary dark:bg-secondary-dark dark:text-on-secondary-dark'>
      <h1 class='text-4xl font-bold'>Contact</h1>
      <ul class='w-24 h-12 flex justify-between items-center mt-8 mx-auto mb-4'>
        <li>
          <a
            href={`mailto:${email}`}
            aria-label='Email'
          >
            <IconMail class='w-8 h-8' />
          </a>
        </li>
        <li>
          <a
            href={github}
            aria-label='Github'
            target='_blank'
          >
            <IconBrandGithub class='w-8 h-8' />
          </a>
        </li>
      </ul>
    </article>
  );
}
