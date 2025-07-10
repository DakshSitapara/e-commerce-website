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
    document.cookie = `authenticated=true; path=/`;
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
  document.cookie = `authenticated=true; path=/`;
  return true;
};

export const logout = () => {
  localStorage.removeItem("loginUser");
  document.cookie = `authenticated=; Max-Age=0; path=/`;
};

export const isAuthenticated = () => {
  if (localStorage.getItem("loginUser")) return true;
  return false;
};
