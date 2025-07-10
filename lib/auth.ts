
type User = {
  name: string;
  email: string;
  password: string;
};

export const login = (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("registeredusers") || "[]");
  const user = users.find((u: User) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("loginUser", JSON.stringify(user));
    return true;
  }
  return false;
};

export const register = (name: string, email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("registeredusers") || "[]");
  if (users.some((u: User) => u.email === email)) return false;
  users.push({ name, email, password });
  localStorage.setItem("registeredusers", JSON.stringify(users));
  localStorage.setItem("loginUser", JSON.stringify(users[users.length - 1]));
  return true;
};

export const logout = () => {
  localStorage.removeItem("loginUser");
};

export const isAuthenticated = () => {
  return localStorage.getItem("loginUser") !== null;
};