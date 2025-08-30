export default function PageContent({ children }: { children: React.ReactNode }) {
  return <div className="w-full px-2 py-2 md:px-4 lg:px-10">{children}</div>;
}
