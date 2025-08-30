import PageContent from '@/components/layout/PageContent';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PageContent>{children}</PageContent>;
}
