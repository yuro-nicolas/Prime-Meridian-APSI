import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Listings } from "./pages/Listings";
import { ListingDetail } from "./pages/ListingDetail";
import { AboutUs } from "./pages/AboutUs";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { AdminGate } from "./pages/admin/AdminGate";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminListings } from "./pages/admin/AdminListings";
import { AdminListingEditor } from "./pages/admin/AdminListingEditor";
import { AdminMessages } from "./pages/admin/AdminMessages";

export default function App() {
  return (
    <Routes>
      {/* Public site — Header (with the hamburger + nav), Footer, and
          the floating "Let's Connect" button all live here. */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        {}
        <Route path="/about" element={<Navigate to="/about-us" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin — its own layout entirely, gated by a passcode.
          Deliberately has none of the public site's chrome: no
          hamburger overlay, no Footer, no floating connect button. */}
      <Route path="/admin" element={<AdminGate />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/listings" replace />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="listings/new" element={<AdminListingEditor mode="add" />} />
          <Route path="listings/:id/edit" element={<AdminListingEditor mode="edit" />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Route>
    </Routes>
  );
}
