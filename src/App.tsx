import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Splash from "./pages/Splash.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Home from "./pages/Home.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Agenda from "./pages/Agenda.tsx";
import ActivityDetail from "./pages/ActivityDetail.tsx";
import Register from "./pages/Register.tsx";
import VerifyOTP from "./pages/VerifyOTP.tsx";
import RegisterProfile from "./pages/RegisterProfile.tsx";
import RegisterRole from "./pages/RegisterRole.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Profile from "./pages/Profile.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";
import MyQR from "./pages/MyQR.tsx";
import ScanContact from "./pages/ScanContact.tsx";
import Networking from "./pages/Networking.tsx";
import ContactDetail from "./pages/ContactDetail.tsx";
import Exhibitors from "./pages/Exhibitors.tsx";
import ExhibitorDetail from "./pages/ExhibitorDetail.tsx";
import Sponsors from "./pages/Sponsors.tsx";
import SponsorDetail from "./pages/SponsorDetail.tsx";
import MyTickets from "./pages/MyTickets.tsx";
import TicketQR from "./pages/TicketQR.tsx";
import CheckoutSummary from "./pages/CheckoutSummary.tsx";
import CheckoutBuyer from "./pages/CheckoutBuyer.tsx";
import CheckoutPayment from "./pages/CheckoutPayment.tsx";
import CheckoutProcessing from "./pages/CheckoutProcessing.tsx";
import CheckoutSuccess from "./pages/CheckoutSuccess.tsx";
import CheckoutError from "./pages/CheckoutError.tsx";
import ReserveSummary from "./pages/ReserveSummary.tsx";
import ReserveSuccess from "./pages/ReserveSuccess.tsx";
import { CheckoutProvider } from "./lib/checkoutContext";
import { GuestProvider } from "./lib/guestContext";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GuestProvider>
          <CheckoutProvider>
            <Routes>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/" element={<Splash />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/verify" element={<VerifyOTP />} />
              <Route path="/register/profile" element={<RegisterProfile />} />
              <Route path="/register/role" element={<RegisterRole />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/activity" element={<ActivityDetail />} />
              <Route path="/activity/:id" element={<ActivityDetail />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/perfil/editar" element={<EditProfile />} />
              <Route path="/perfil/contrasena" element={<ChangePassword />} />
              <Route path="/perfil/qr" element={<MyQR />} />
              <Route path="/escanear" element={<ScanContact />} />
              <Route path="/networking" element={<Networking />} />
              <Route path="/networking/:id" element={<ContactDetail />} />
              <Route path="/expositores" element={<Exhibitors />} />
              <Route path="/expositores/:id" element={<ExhibitorDetail />} />
              <Route path="/patrocinadores" element={<Sponsors />} />
              <Route path="/patrocinadores/:id" element={<SponsorDetail />} />
              <Route path="/entradas" element={<MyTickets />} />
              <Route path="/entradas/:id" element={<TicketQR />} />
              <Route path="/comprar" element={<CheckoutSummary />} />
              <Route path="/comprar/:id" element={<CheckoutSummary />} />
              <Route path="/comprar/datos" element={<CheckoutBuyer />} />
              <Route path="/comprar/pago" element={<CheckoutPayment />} />
              <Route path="/comprar/procesando" element={<CheckoutProcessing />} />
              <Route path="/comprar/exito" element={<CheckoutSuccess />} />
              <Route path="/comprar/error" element={<CheckoutError />} />
              <Route path="/reservar/:id" element={<ReserveSummary />} />
              <Route path="/reservar/exito" element={<ReserveSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CheckoutProvider>
        </GuestProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
