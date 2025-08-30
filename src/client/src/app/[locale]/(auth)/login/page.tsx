import Login from '@/components/pages/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập | CodeFlow',
};

export default function Page() {
  return  <Login />
}
