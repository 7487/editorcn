import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-background relative flex min-h-svh flex-col">
    <SiteHeader />
    <main className="flex flex-1 flex-col">{children}</main>
    <SiteFooter />
  </div>
);
export default AppLayout;
