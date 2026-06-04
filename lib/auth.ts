import users from '@/data/user.json'

export const login = (email: string, password: string) => {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  return user || null;
};