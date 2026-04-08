import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Splash from "./pages/Splash.tsx";
import Home from "./pages/Home.tsx";
import Agenda from "./pages/Agenda.tsx";
import ActivityDetail from "./pages/ActivityDetail.tsx";
import Register from "./pages/Register.tsx";
import VerifyOTP from "./pages/VerifyOTP.tsx";
import RegisterProfile from "./pages/RegisterProfile.tsx";
import RegisterRole from "./pages/RegisterRole.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/verify" element={<VerifyOTP />} />
          <Route path="/register/profile" element={<RegisterProfile />} />
          <Route path="/register/role" element={<RegisterRole />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/activity" element={<ActivityDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
