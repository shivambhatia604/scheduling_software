import {z} from 'zod';

const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),          // Ensures name is a non-empty string
    email: z.string().email('Invalid email address'),    // Ensures email is a valid email format
    password: z.string().min(8, 'Password must be at least 8 characters') // Password should be at least 8 characters long
  });

export default signupSchema;