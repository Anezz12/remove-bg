import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';
import { redirect } from 'next/navigation';
import SideBarContainer from '@/app/components/Settings/SideBarContainer';

export default async function ProfileLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <SideBarContainer user={session.user}>{children}</SideBarContainer>;
}
