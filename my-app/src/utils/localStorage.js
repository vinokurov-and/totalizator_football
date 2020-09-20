export const setAuthParamsLS = (id, token) => {
  localStorage.setItem('t', token);
  localStorage.setItem('i', id);
};

export const getAuthParamsLS = () => {
  const token = localStorage.getItem('t');
  const id = localStorage.getItem('i');
  if (token === 'null' || id === 'null') {
    localStorage.clear();
    return null;
  }
  return { token, id };
};
