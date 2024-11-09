// utils/auth.ts
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  return token !== null;
};