export const getLS = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};
export const setLS = (code: string, value) => {
	return localStorage.setItem(code, JSON.stringify(value));
};
 