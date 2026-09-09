import React from "react";
import { Outlet } from "react-router-dom";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import TrustBar from "@/components/layout/TrustBar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <TrustBar />
      <Footer />
      <CartDrawer />
    </div>
  );
}