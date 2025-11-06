import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ArtisansList from "./pages/ArtisansList";
import ArtisanDetail from "./pages/ArtisanDetail";
import MentionsLegales from "./pages/MentionsLegales";
import DonneesPersonnelles from "./pages/DonneesPersonnelles";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:slug" element={<ArtisansList />} />
        <Route path="/artisan/:id" element={<ArtisanDetail />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/donnees-personnelles" element={<DonneesPersonnelles />} />
        <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
