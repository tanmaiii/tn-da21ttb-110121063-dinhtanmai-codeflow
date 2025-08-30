import Header from '@/components/layout/Header/Header';
import Sidebar from '@/components/layout/Sidebar';
import { menuUser } from '@/data/menuUser';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CodeFlow',
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 mt-14 ">
        <Sidebar menu={menuUser} />
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
