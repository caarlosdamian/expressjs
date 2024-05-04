import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const comparePassword = async (plain, hash) => {
  return await bcrypt.compare(plain, hash);
};
