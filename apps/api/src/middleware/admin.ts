import { Elysia } from 'elysia';
import { db } from '@aitools/db';
import { eq } from 'drizzle-orm';
import { users } from '@aitools/db';

export const adminMiddleware = new Elysia({ name: 'admin-middleware' })
  .derive({ as: 'scoped' }, async ({ request, set }) => {
    const cookieHeader = request.headers.get('cookie');
    
    if (!cookieHeader) {
      set.status = 401;
      return { user: null };
    }

    const sessionToken = cookieHeader
      .split(';')
      .find(c => c.trim().startsWith('better-auth.session_token='))
      ?.split('=')[1];

    if (!sessionToken) {
      set.status = 401;
      return { user: null };
    }

    const session = await db.query.sessions.findFirst({
      where: (sessions, { eq, gt }) => 
        eq(sessions.token, sessionToken) && gt(sessions.expiresAt, new Date()),
    });

    if (!session) {
      set.status = 401;
      return { user: null };
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, session.userId),
    });

    if (!user || user.role !== 'admin') {
      set.status = 403;
      return { user: null };
    }

    return { user };
  });
