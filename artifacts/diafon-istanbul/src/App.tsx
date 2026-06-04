import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Blog from "@/pages/Blog";
import BlogAdmin from "@/pages/BlogAdmin";
import Hakkimizda from "@/pages/Hakkimizda";
import BolgeDetay from "@/pages/BolgeDetay";
import GoruntulDiafon from "@/pages/GoruntulDiafon";
import GoruntulDiafonFiyatlari from "@/pages/GoruntulDiafonFiyatlari";
import GoruntulDiafonModelleri from "@/pages/GoruntulDiafonModelleri";
import { ThemeProvider } from "@/lib/theme-context";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteContentProvider } from "@/hooks/useSiteContent";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/urunler" component={Products} />
        <Route path="/hakkimizda" component={Hakkimizda} />
        <Route path="/goruntulu-diafon" component={GoruntulDiafon} />
        <Route path="/goruntulu-diafon-fiyatlari" component={GoruntulDiafonFiyatlari} />
        <Route path="/goruntulu-diafon-modelleri" component={GoruntulDiafonModelleri} />
        <Route path="/blog/admin" component={BlogAdmin} />
        <Route path="/blog/:slug" component={Blog} />
        <Route path="/blog" component={Blog} />
        <Route path="/:slug" component={BolgeDetay} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SiteContentProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </SiteContentProvider>
    </ThemeProvider>
  );
}

export default App;
