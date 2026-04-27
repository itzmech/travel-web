export const AUTH_COOKIE = "tripnova_auth";

export const DEMO_LOGIN = {
  email: "admin@tripnova.com",
  password: "TripNova@123",
};

export function isValidCredentials(email: string, password: string) {
  return email === DEMO_LOGIN.email && password === DEMO_LOGIN.password;
}
