export const compareLocation = (location1, location2) => {
  if (!location1.endsWith('/')) location1 += '/';
  if (!location2.endsWith('/')) location2 += '/';

  location1 = decodeURI(location1.trim());
  location2 = decodeURI(location2.trim());

  return location1 === location2;
};
