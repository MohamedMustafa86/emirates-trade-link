
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SecurityHeaders from "./components/SecurityHeaders";
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
import SupplierDashboard from "./pages/SupplierDashboard";
import ProductSearch from "./pages/ProductSearch";
import AddProduct from "./pages/AddProduct";
import SupplierRating from "./pages/SupplierRating";
import Manufacturers from "./pages/Manufacturers";
import Suppliers from "./pages/Suppliers";
import Messages from "./pages/Messages";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ModernMessages from "./pages/ModernMessages";
import SupplierRegistration from "./pages/SupplierRegistration";
import ShoppingCart from "./pages/ShoppingCart";
import Tips from "./pages/Tips";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SecurityHeaders />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/products/building-materials" element={<BuildingMaterials />} />
          <Route path="/products/packaging-supplies" element={<PackagingSupplies />} />
          <Route path="/products/plastic-raw-materials" element={<PlasticRawMaterials />} />
          <Route path="/products/consumer-goods" element={<ConsumerGoods />} />
          <Route path="/products/machinery-equipment" element={<MachineryEquipment />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/messages" element={<ModernMessages />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="/product-search" element={<ProductSearch />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/rate-supplier" element={<SupplierRating />} />
          <Route path="/prd" element={<PRD />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/supplier-registration" element={<SupplierRegistration />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/tips" element={<Tips />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
