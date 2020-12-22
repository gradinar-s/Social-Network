export const required = (value) => {
  if (value) return undefined;
  return "Field is required";
};

export const minLength = (minLength) => {
  return (value) => {
    if (value && value.length < minLength) return `Min length sting is ${minLength} symbols`;
    return undefined;
  };
};

export const maxLength = (maxLength) => {
  return (value) => {
    if (value && value.length > maxLength) return `Max length sting is ${maxLength} symbols`;
    return undefined;
  };
};
