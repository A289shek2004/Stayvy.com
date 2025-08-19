import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import FlexibleDatesPage from "./pages/FlexibleDatesPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/flexible-dates" element={<FlexibleDatesPage />} />
          <Route path="/listing/:id" element={<PlaceholderPage title="Listing Details" description="Detailed listing page with photos, amenities, map pin, and price breakdown coming soon!" />} />
          <Route path="/host" element={<PlaceholderPage title="Host Dashboard" description="Manage your listings, calendar, and see upcoming bookings. Continue prompting to build this page!" />} />
          <Route path="/host/create" element={<PlaceholderPage title="Create Listing" description="Create and host a new listing. Continue prompting to build this page!" />} />
          <Route path="/wishlist" element={<PlaceholderPage title="Your Wishlist" description="Save your favorite places for later. Continue prompting to build this page!" />} />
          <Route path="/profile" element={<PlaceholderPage title="Your Profile" description="Manage your profile and account settings. Continue prompting to build this page!" />} />
          <Route path="/experiences" element={<PlaceholderPage title="Experiences" description="Discover local experiences and activities. Continue prompting to build this page!" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
