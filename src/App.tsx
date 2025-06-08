
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PRD from "./pages/PRD";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Products from "./pages/Products";
import Partners from "./pages/Partners";
import Logistics from "./pages/Logistics";
import Contact from "./pages/Contact";
import BuildingMaterials from "./pages/products/BuildingMaterials";
import PackagingSupplies from "./pages/products/PackagingSupplies";
import PlasticRawMaterials from "./pages/products/PlasticRawMaterials";
import ConsumerGoods from "./pages/products/ConsumerGoods";
import MachineryEquipment from "./pages/products/MachineryEquipment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/building-materials" element={<BuildingMaterials />} />
          <Route path="/products/packaging-supplies" element={<PackagingSupplies />} />
          <Route path="/products/plastic-raw-materials" element={<PlasticRawMaterials />} />
          <Route path="/products/consumer-goods" element={<ConsumerGoods />} />
          <Route path="/products/machinery-equipment" element={<MachineryEquipment />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/prd" element={<PRD />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
