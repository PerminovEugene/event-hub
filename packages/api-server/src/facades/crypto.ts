import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const generateSalt = async (
  rounds: number = SALT_ROUNDS,
): Promise<string> => {
  return await bcrypt.genSalt(rounds);
};

export const hashText = async (
  myPlaintextPassword: string,
  salt: string,
): Promise<string> => {
  return await bcrypt.hash(myPlaintextPassword, salt);
};
