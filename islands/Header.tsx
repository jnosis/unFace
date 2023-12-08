import type { JSX } from 'preact/jsx-runtime';
import type { MenuItem } from '~/types.ts';
import { useSignal, useSignalEffect } from '@preact/signals';
import NavItem from '~/components/NavItem.tsx';
import ThemeToggler from '~/islands/ThemeToggler.tsx';
import { color } from '~/utils/style_utils.ts';
import { isMenuItem } from '~/utils/type_utils.ts';

type HeaderProps = {
  menus: MenuItem[];
};

export default function Header({ menus }: HeaderProps) {
  const scrolled = useSignal<boolean>(false);
  const tinted = useSignal<boolean>(false);
  const activated = useSignal<MenuItem>('home');

  const handleClick = (e: JSX.TargetedMouseEvent<HTMLUListElement>) => {
    const { dataset: { name } } = e.target as HTMLElement;
    if (isMenuItem(name)) {
      activated.value = name;
      if (location.pathname === '/') {
        document.getElementById(name)?.scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
        });
      } else {
        location.assign(`/#${name}`);
      }
    }
  };

  useSignalEffect(() => {
    globalThis.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        scrolled.value = true;
      } else {
        scrolled.value = false;
      }
    });
  });

  useSignalEffect(() => {
    const { pathname } = location;
    activated.value = menus.find((menu) => pathname.includes(menu)) ||
      activated.value;
  });

  useSignalEffect(() => {
    if (location.pathname !== '/') tinted.value = true;
  });

  useSignalEffect(() => {
    if (location.pathname === '/') tinted.value = scrolled.value;
  });

  useSignalEffect(() => {
    globalThis.addEventListener('scroll', () => {
      const { pathname } = location;
      const isBottom = Math.ceil(window.scrollY + window.innerHeight) >=
        document.body.clientHeight;
      const isTop = Math.ceil(window.scrollY) === 0;

      if (pathname === '/' && isBottom) {
        activated.value = 'contact';
      } else if (pathname === '/' && isTop) {
        activated.value = 'home';
      }
    });
  });

  useSignalEffect(() => {
    const switchActiveWhenScrolled = (menu: MenuItem, isUp: boolean) => {
      switch (menu) {
        case 'home':
          if (isUp) {
            activated.value = 'home';
          } else {
            activated.value = 'works';
          }
          break;
        case 'works':
          if (isUp) {
            activated.value = 'home';
          } else {
            activated.value = 'contact';
          }
          break;
        case 'contact':
          if (isUp) {
            activated.value = 'works';
          } else {
            activated.value = 'contact';
          }
          break;

        default:
          throw new Error(`MenuItem(${menu}) is undefined`);
      }
    };

    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
          const menu = entry.target.id;
          if (!isMenuItem(menu)) return;
          if (entry.boundingClientRect.y < 0) {
            switchActiveWhenScrolled(menu, false);
          } else {
            switchActiveWhenScrolled(menu, true);
          }
        }
      });
    }, observerOption);

    menus
      .map((menu) => document.getElementById(menu))
      .forEach((section) => section && observer.observe(section));
  });

  return (
    <header
      class={`fixed top-0 left-0 z-10 w-full h-16 p-4 flex justify-between items-center ${
        color(
          `${
            tinted.value ? 'bg-bar' : 'bg-background'
          } sm:bg-bar text-on-surface`,
        )
      }`}
    >
      <h1 class='text-xl font-bold'>
        <a href='/'>unFace</a>
      </h1>
      <nav>
        <ul
          class={`flex gap-2 fixed sm:static bottom-0 left-0 w-full h-16 justify-center items-center ${
            color('bg-bar')
          }`}
          onClick={(e) => handleClick(e)}
        >
          <li>
            <ThemeToggler prev='system' />
          </li>
          {menus.map((menu, index) => (
            <NavItem
              key={index}
              name={menu}
              activated={menu === activated.value}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
