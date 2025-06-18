export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e20] px-4">
      <div className="w-full max-w-md bg-[#2a2b2d] rounded-xl shadow-xl p-8 border border-[#3b3c3f]">
        {children}
      </div>
    </div>
  );
}
