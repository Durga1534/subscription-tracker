import { config } from 'dotenv';
import { z } from 'zod';
import { SignOptions } from 'jsonwebtoken';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z.string().url(),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('1d'),
  ARCJET_ENV: z.enum(['development', 'production']).default('development'),
  ARCJET_KEY: z.string().min(1),
  QSTASH_TOKEN: z.string().min(1),
  QSTASH_URL: z.string().url(),
  SERVER_URL: z.string().url(),
  EMAIL_PASSWORD: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  JWT_SECRET,
  ARCJET_ENV,
  ARCJET_KEY,
  QSTASH_TOKEN,
  QSTASH_URL,
  SERVER_URL,
  EMAIL_PASSWORD,
} = parsedEnv.data;

export const JWT_EXPIRES_IN = parsedEnv.data.JWT_EXPIRES_IN as SignOptions['expiresIn'];
