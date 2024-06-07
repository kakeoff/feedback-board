export const isTokenExists = (): boolean => {
  return !!localStorage.getItem("token");
};
