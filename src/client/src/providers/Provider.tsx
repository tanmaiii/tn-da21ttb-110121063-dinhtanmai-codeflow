import { Toaster } from '@/components/ui/toaster';
import AuthProvider from './AuthProvider';
import ReactQueryProvider from './ReactQueryProvider';
import GithubProvide from './GithubProvide';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <GithubProvide>{children}</GithubProvide>
        <Toaster />
      </AuthProvider>
    </ReactQueryProvider>
  );
}
