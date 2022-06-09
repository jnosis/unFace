export function convertStringToTechs(rawTechs: string): Techs {
  const techs = rawTechs.split(',');
  const init: Techs = {};

  return techs.reduce((obj, tech, index) => {
    obj[index] = tech;
    return obj;
  }, init);
}

export function convertTechsToString(techs: Techs): string {
  const rawTechs = Object.keys(techs)
    .map((key) => techs[key])
    .join(',');

  return rawTechs;
}
