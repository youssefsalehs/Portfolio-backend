import { config } from "dotenv";
config();
import { z } from "zod";
const schema = z.object({
  PORT: z.string().default("5000"),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string(),
  CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  FRONTEND_URL: z.string(),
});

const parsed = schema.parse(process.env);

export const env = {
  db: {
    url: parsed.MONGODB_URI,
  },

  jwt: {
    secret: parsed.JWT_SECRET,
  },
  cloudinary: {
    cloudName: parsed.CLOUD_NAME,
    apiKey: parsed.CLOUDINARY_API_KEY,
    apiSecret: parsed.CLOUDINARY_API_SECRET,
  },
  frontend: { url: parsed.FRONTEND_URL },
  port: Number(parsed.PORT),
};
