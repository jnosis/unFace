export function convertStringToTechs(rawTechs: string): Techs {
  return rawTechs.split(',');
}

export function convertTechsToString(techs: Techs): string {
  return techs.join(',');
}
