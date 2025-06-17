import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MessagesProvider } from "@/contexts/MessagesContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import EstablishmentDashboard from "./pages/EstablishmentDashboard";
import BrowseJobs from "./pages/BrowseJobs";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterFreelancer from "./pages/RegisterFreelancer";
import RegisterEstablishment from "./pages/RegisterEstablishment";
import FreelancersList from "./pages/FreelancersList";
import FreelancerProfile from "./pages/FreelancerProfile";
import AdminDashboard from "./pages/AdminDashboard";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FavoritesProvider>
        <MessagesProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-freelancer" element={<RegisterFreelancer />} />
                <Route path="/register-establishment" element={<RegisterEstablishment />} />
                <Route path="/freelancers" element={<FreelancersList />} />
                <Route path="/freelancer/:id" element={<FreelancerProfile />} />
                <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
                <Route path="/establishment-dashboard" element={<EstablishmentDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/browse-jobs" element={<BrowseJobs />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </AuthProvider>
        </MessagesProvider>
      </FavoritesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
