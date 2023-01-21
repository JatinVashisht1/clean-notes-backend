import { cleanEnv, port, str } from "envalid";

/**Using environment variables in a typesafe manner using `envalid` library.*/
export const env = cleanEnv(process.env, {
  /**MongoDB connection URI*/
  MONGO_URI: str(),
  /**Port number of application.*/
  PORT: port(),
});
