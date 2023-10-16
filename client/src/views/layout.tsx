import { Footer, Header } from "@/components/interface";
import { Router } from "@/components/routes";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="p-4 mb-auto">
        <Router />
      </main>
      <Footer />
    </div>
  );
};
