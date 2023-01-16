import { JSX } from 'preact/jsx-runtime';
import { useEffect, useState } from 'preact/hooks';
import type { MenuItem } from '~/types.ts';
import NavItem from '~/components/NavItem.tsx';
import ThemeToggler from '~/islands/ThemeToggler.tsx';
import { color } from '~/utils/style_utils.ts';
import { isMenuItem } from '~/utils/type_utils.ts';

type HeaderProps = {
  menus: MenuItem[];
};

export default function Header({ menus }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<MenuItem>();

  const handleClick = (e: JSX.TargetedMouseEvent<HTMLUListElement>) => {
    const { dataset: { name } } = e.target as HTMLElement;
    if (isMenuItem(name)) {
      setActive(name);
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

  useEffect(() => {
    globalThis.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  useEffect(() => {
    const { pathname } = location;
    const active = menus.find((menu) => pathname.includes(menu));
    active && setActive(active);
  }, []);

  useEffect(() => {
    globalThis.addEventListener('scroll', () => {
      const { pathname } = location;
      const isBottom = Math.ceil(window.scrollY + window.innerHeight) >=
        document.body.clientHeight;
      const isTop = Math.ceil(window.scrollY) === 0;

      if (pathname === '/' && isBottom) {
        setActive('contact');
      } else if (pathname === '/' && isTop) {
        setActive('home');
      }
    });
  }, []);

  useEffect(() => {
    const switchActiveWhenScrolled = (menu: MenuItem, isUp: boolean) => {
      switch (menu) {
        case 'home':
          if (isUp) {
            setActive('home');
          } else {
            setActive('works');
          }
          break;
        case 'works':
          if (isUp) {
            setActive('home');
          } else {
            setActive('contact');
          }
          break;
        case 'contact':
          if (isUp) {
            setActive('works');
          } else {
            setActive('contact');
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
  }, []);

  return (
    <header
      class={`fixed top-0 left-0 z-10 w-full h-16 p-4 flex justify-between items-center ${
        color(
          `${
            isScrolled ? 'bg-bar' : 'bg-background'
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
            <ThemeToggler />
          </li>
          {menus.map((menu, index) => (
            <NavItem
              key={index}
              name={menu}
              activated={menu === active}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
