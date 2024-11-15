import prisma from "@/prisma/prismaClient";

const checkIfUserExists = async (email:string) => {

    try {
        const user = await prisma.user.findUnique({
          where: { email },
        });
    
      return user ? true :false;
      } catch (error) {
        console.error('Error checking user by email:', error);
        throw new Error(`Error checking user by email: ${error.message}`); // Throw error if something goes wrong
      }
    }

export default checkIfUserExists;