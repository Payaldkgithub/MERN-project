import bcrypt from "bcrypt";
const saltRound = 10;
export const createHashPassword = async (password) => {
  try {
    return bcrypt.hashSync(password, saltRound);
  } catch (error) {
    throw new Error("error in password hashing");
  }
};
export const comparePassword = async (password, hashedpassword) => {
  try {
    return bcrypt.compare(password, hashedpassword);
  } catch (error) {
    throw new Error("Error while comparing password");
  }
};
