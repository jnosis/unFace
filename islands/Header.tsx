import { JSX } from 'preact/jsx-runtime';
import { useEffect, useState } from 'preact/hooks';
import type { MenuItem } from '~/types.ts';
import NavItem from '~/components/NavItem.tsx';
import { isMenuItem } from '~/utils/type_utils.ts';
import { color } from '~/utils/style_utils.ts';

type HeaderProps = {
  menus: MenuItem[];
};

export default function Header({ menus }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<MenuItem>(menus[0]);

  const handleClick = (e: JSX.TargetedMouseEvent<HTMLUListElement>) => {
    const { dataset: { name } } = e.target as HTMLElement;
    if (isMenuItem(name)) {
      setActive(name);
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
