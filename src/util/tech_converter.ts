export function convertTechs(rawTechs: string): Techs {
  const techs = rawTechs.split(',');
  const init: Techs = {};

  return techs.reduce((obj, tech, index) => {
    obj[index] = tech;
    return obj;
  }, init);
}
