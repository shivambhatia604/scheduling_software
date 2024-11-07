import { emailRegex } from "../constants";
export const validateSignInData = (email: string, password: string) => {
  // Check if email and password are provided
  if (!email || !password) {
    return "Email and password are required";
  }

  // Validate email format

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  // Validate password length (minimum 6 characters)
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  // If everything is valid, return null (no errors)
  return null;
};
