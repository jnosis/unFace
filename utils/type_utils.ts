import type { FileData, FileDataLike, MenuItem } from '~/types.ts';

export function isMenuItem(menu: unknown): menu is MenuItem {
  return menu === 'home' || menu === 'works' || menu === 'contact';
}

export function isFileData(value: FileDataLike): value is FileData {
  return !!(value as FileData).path;
}
