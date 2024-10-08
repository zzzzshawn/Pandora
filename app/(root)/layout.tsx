import Navbar from "@/components/Navbar";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen relative font-glancyr w-full bg-black text-white overflow-hidden">
      <Navbar />
      <DotPattern
        className={cn(
          "-z-[0] [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />
      <Toaster />
      {children}
    </main>
  );
};

export default Layout;
