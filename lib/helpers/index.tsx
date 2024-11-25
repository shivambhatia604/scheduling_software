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
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  // If everything is valid, return null (no errors)
  return null;
};

export const convertDateToStartUTCDateTime = (date: Date) => {
  const localDate = new Date(date);

  localDate.setHours(0, 0, 0, 0);

  // const timeZoneOffsetInMillSec = localDate.getTimezoneOffset() * 60 * 1000;

  // const utcStartOfDay = new Date(localDate.getTime() - timeZoneOffsetInMillSec);
  return localDate.toISOString();
};

export const convertToDateTimeToCurrentTimezone = (date: Date) => {

  // const 
};
