import crypto from "crypto";
const createHashedPassword = (password: string) => {
  return crypto.createHash("sha512").update(password).digest("base64");
};

export default createHashedPassword;
