import { db } from '../src/client';
import * as schema from '../src/schema';
import { eq } from 'drizzle-orm';

async function createAdmin() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('Usage: bun run create-admin <email> <password>');
    console.log('Example: bun run create-admin admin@example.com SecurePass123!');
    process.exit(1);
  }

  console.log(`Creating admin user: ${email}`);

  try {
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      await db.update(schema.users)
        .set({ role: 'admin' })
        .where(eq(schema.users.email, email));
      console.log(`✅ Updated existing user ${email} to admin role`);
    } else {
      console.log(`\n⚠️  User ${email} does not exist.`);
      console.log('Please use the Better Auth sign-up flow first:');
      console.log(`1. Visit /admin/login`);
      console.log(`2. The user will need to be created via Better Auth's API`);
      console.log(`\nOr use the Better Auth client to create the user:`);
      console.log(`await authClient.signUp.email({`);
      console.log(`  email: '${email}',`);
      console.log(`  password: '${password}',`);
      console.log(`  name: 'Admin'`);
      console.log(`});`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();
