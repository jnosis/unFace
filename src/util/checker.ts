export function isWorkData(work: unknown): work is WorkData {
  return (
    (work as WorkData).id !== undefined &&
    (work as WorkData).title !== undefined &&
    (work as WorkData).description !== undefined &&
    (work as WorkData).repo !== undefined &&
    (work as WorkData).thumbnail !== undefined
  );
}

export function isWorkDataBase(works: unknown): works is WorksDatabase {
  const temp = { ...(works as WorksDatabase) };
  let check = Object.keys(temp).every((key) => isWorkData(temp[key]));

  return check;
}

export function isMenuItem(menu: unknown): menu is MenuItem {
  return menu === 'home' || menu === 'works' || menu === 'contact';
}
