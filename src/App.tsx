
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Dashboard
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import KeywordResearch from "./pages/KeywordResearch";
import ContentGenerator from "./pages/ContentGenerator";
import ContentOptimizer from "./pages/ContentOptimizer";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="keywords" element={<KeywordResearch />} />
            <Route path="content" element={<ContentGenerator />} />
            <Route path="optimize" element={<ContentOptimizer />} />
            <Route path="competitors" element={<CompetitorAnalysis />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
