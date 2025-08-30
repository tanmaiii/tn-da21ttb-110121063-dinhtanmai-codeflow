import Header from '@/components/layout/Header/Header';
import Sidebar from '@/components/layout/Sidebar';
import { menuAdmin } from '@/data/menuAdmin';
import { paths } from '@/data/path';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang quản trị | CodeFlow',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 mt-14">
        <Sidebar prefix={paths.ADMIN} menu={menuAdmin} />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
