import Header from "./_components/_common/Header";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <Header />
      <div className="w-full flex-1">
        <div>{children}</div>
      </div>
    </div>
  );
}
