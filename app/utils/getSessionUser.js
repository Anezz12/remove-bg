import { getServerSession } from 'next-auth/next';
import { authOptions } from './authOptions';

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return {
    userId: session.user.id,
    user: session.user,
  };
};
