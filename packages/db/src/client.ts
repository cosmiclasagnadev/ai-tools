import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create the connection
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString);

// Create and export the database instance
export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === 'development',
});

export default db;

