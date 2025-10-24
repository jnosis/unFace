import type { TargetedMouseEvent } from 'preact';
import type { MenuItem } from '~/types.ts';
import { useEffect } from 'preact/hooks';
import { useSignal, useSignalEffect } from '@preact/signals';
import NavItem from '~/components/NavItem.tsx';
import ThemeToggler from '~/islands/ThemeToggler.tsx';
import { isMenuItem } from '~/utils/type_utils.ts';

type HeaderProps = {
  menus: MenuItem[];
};

export default function Header({ menus }: HeaderProps) {
  const scrolled = useSignal<boolean>(false);
  const tinted = useSignal<boolean>(false);
  const activated = useSignal<MenuItem>('home');

  const handleClick = (e: TargetedMouseEvent<HTMLUListElement>) => {
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
    const { pathname } = location;
    const activeMenu = menus.find((menu) => pathname.includes(menu));
    if (activeMenu) {
      activated.value = activeMenu;
    }
  });

  useSignalEffect(() => {
    tinted.value = location.pathname !== '/' || scrolled.value;
  });

  useEffect(() => {
    const handleScroll = () => {
      scrolled.value = globalThis.scrollY > 0;

      if (location.pathname === '/') {
        const isBottom =
          Math.ceil(globalThis.scrollY + globalThis.innerHeight) >=
            document.body.clientHeight;
        if (isBottom) {
          activated.value = 'contact';
        } else if (globalThis.scrollY === 0) {
          activated.value = 'home';
        }
      }
    };

    const observerOption = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries, _observer) => {
      entries.forEach((entry) => {
        if (
          location.pathname === '/' &&
          !entry.isIntersecting &&
          entry.intersectionRatio > 0
        ) {
          const menu = entry.target.id;
          if (!isMenuItem(menu)) return;

          const menuIndex = menus.indexOf(menu);
          if (entry.boundingClientRect.y < 0) {
            if (menuIndex < menus.length - 1) {
              activated.value = menus[menuIndex + 1];
            }
          } else if (menuIndex > 0) {
            activated.value = menus[menuIndex - 1];
          }
        }
      });
    }, observerOption);

    const sections = menus
      .map((menu) => document.getElementById(menu))
      .filter((section) => section !== null);

    sections.forEach((section) => observer.observe(section));
    globalThis.addEventListener('scroll', handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, [menus]);

  return (
    <header
      class={`fixed top-0 left-0 z-10 w-full h-16 p-4 flex justify-between items-center sm:bg-bar text-on-surface dark:sm:bg-bar-dark dark:text-on-surface-dark ${
        tinted.value
          ? 'bg-bar dark:bg-bar-dark'
          : 'bg-background dark:bg-background-dark'
      }`}
    >
      <h1 class='text-xl font-bold'>
        <a href='/'>unFace</a>
      </h1>
      <nav>
        <ul
          class='flex gap-2 fixed sm:static bottom-0 left-0 w-full h-16 justify-center items-center bg-bar dark:bg-bar-dark'
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
