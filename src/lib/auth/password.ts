import * as argon from "argon2";

export const hashPassword = (password: string): Promise<string> => argon.hash(password);

export const verifyPassword = (password: string, hashedPassword: string): Promise<boolean> =>
  argon.verify(hashedPassword, password);
