export const validateLogin = (value: string): string => {
  const minLength = {
    value: 5,
    message: 'Минимальная длина - 5',
  };

  const maxLength = {
    value: 100,
    message: 'Максимальная длина - 100',
  };

  const patternRussian = {
    value: /^[^а-яА-ЯеЁ]+$/,
    message: 'Не должен содержать русских букв',
  };

  switch (true) {
    case String(value).length < minLength.value:
      return minLength.message;

    case String(value).length > maxLength.value:
      return maxLength.message;

    case !String(value).match(patternRussian.value):
      return patternRussian.message;

    default:
      return '';
  }
};

export const validatePassword = (value: string): string => {
  const minLength = {
    value: 5,
    message: 'Минимальная длина - 5',
  };

  const maxLength = {
    value: 100,
    message: 'Максимальная длина - 100',
  };

  const patternRussian = {
    value: /^[^а-яА-ЯеЁ]+$/,
    message: 'Не должен содержать русских букв',
  };

  switch (true) {
    case String(value).length < minLength.value:
      return minLength.message;

    case String(value).length > maxLength.value:
      return maxLength.message;

    case !String(value).match(patternRussian.value):
      return patternRussian.message;

    default:
      return '';
  }
};

export const validateTags = (value: string): string => {
  const maxLength = {
    value: 50,
    message: 'Максимальная длина - 50',
  };

  if (String(value).length > maxLength.value) {
    return maxLength.message;
  }

  return '';
};
