import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import Loja from "./pages/Loja";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Sobre from "./pages/Sobre";
import Termos from "./pages/Termos";
import Reembolso from "./pages/Reembolso";
import Contato from "./pages/Contato";
import Auth from "./pages/Auth";
import Conta from "./pages/Conta";
import SejaFornecedor from "./pages/SejaFornecedor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner position="top-right" theme="dark" richColors />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/loja" element={<Loja />} />
                <Route path="/produto/:id" element={<Produto />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/termos" element={<Termos />} />
                <Route path="/reembolso" element={<Reembolso />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/seja-fornecedor" element={<SejaFornecedor />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/conta" element={<Conta />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
