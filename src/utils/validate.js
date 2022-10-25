export const isEmail = (text) => {
  return /^[\w.-]{1,}@[\w-]{2,}(.[\w-]{2,}){1,}$/.test(text);
};

export const isUsername = (text) => {
  return /^[\w]{6,}$/.test(text);
};
