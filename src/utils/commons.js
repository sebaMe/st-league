export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

export const replaceCharAt = (string, index, replace) => {
  return string.substring(0, index) + replace + string.substring(index + 1);
};
