import type { MenuItem } from '~/types.ts';

export function isMenuItem(menu: unknown): menu is MenuItem {
  return menu === 'home' || menu === 'works' || menu === 'contact';
}
