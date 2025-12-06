import { GlobalFooter } from "@/components/global/footer";
import { MarketingNavbar } from "@/components/marketing/layout/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNavbar />
      {children}
      <GlobalFooter />
    </div>
  );
}

