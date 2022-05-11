export function isWorkData(work: unknown): work is WorkData {
  return (
    (work as WorkData).id !== undefined &&
    (work as WorkData).title !== undefined &&
    (work as WorkData).description !== undefined &&
    (work as WorkData).url !== undefined &&
    (work as WorkData).thumbnail !== undefined
  );
}

export function isWorkDataBase(works: unknown): works is WorksDatabase {
  const temp = { ...(works as WorksDatabase) };
  let check = Object.keys(temp).every((key) => isWorkData(temp[key]));

  return check;
}
