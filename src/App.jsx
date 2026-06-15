import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Venues from "./pages/Venues";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import MyNavbar from "./Navbar";

import Details from "./components/events/Details";
import Wedding from "./components/events/Wedding";
import Destinationwedding from "./components/events/Destinationwedding";
import BeachWedding from "./components/events/BeachWedding";
import Entertainment from "./components/events/Entertainment";
import PrivatePartics from "./components/events/PrivatePartics";

import ScrollToTop from "./components/ScrollToTop";

import KakkattuMana from "./components/venues/KakkattuMana";
import KakkakuniHeritage from "./components/venues/KakkakuniHeritage";
import KalappuraFarmHouse from "./components/venues/KalappuraFarmHouse";
import KampifyKochi from "./components/venues/KampifyKochi";
import KadavuVillas from "./components/venues/KadavuVillas";

import PhotoGallery from "./components/gallery/PhotoGallery";
import VideoGallery from "./components/gallery/VideoGallery";
import ShortsGallery from "./components/gallery/ShortsGallery";
import WeddingAlbums from "./components/gallery/WeddingAlbums";
import Blogs from "./components/about/Blogs";
import Test from "./components/about/Test";


import Footer from "./pages/Footer";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/Test" element={<Test />} />
          
        <Route
          path="/services"
          element={
            <>
              <MyNavbar />
              <Services />
            </>
          }
        />

        <Route path="/venues" element={<Venues />} />

        <Route path="/gallery" element={<><MyNavbar /><Gallery /></>}/>

        <Route path="/contact" element={<Contact />} />

        {/* EVENT ROUTES */}
        <Route path="/details" element={<Details />} />
        <Route path="/Wedding" element={<Wedding />} />
        <Route
          path="/Destinationwedding"
          element={<Destinationwedding />}
        />
        <Route path="/Beachwedding" element={<BeachWedding />} />
        <Route path="/Entertainment" element={<Entertainment />} />

        {/* FIXED ROUTE */}
        <Route
          path="/PrivatePartics"
          element={<PrivatePartics />}
        />

        {/* GALLERY ROUTES */}
        <Route
          path="/PhotoGallery"
          element={<PhotoGallery/>}
        />

        <Route
          path="/VideoGallery"
          element={<VideoGallery />}
        />

        <Route
          path="/ShortsGallery"
          element={<ShortsGallery />}
        />

        <Route
          path="/Wedding-Albums"
          element={<WeddingAlbums />}
        />

        {/* VENUE ROUTES */}
        <Route
          path="/kakkattu-mana"
          element={<KakkattuMana />}
        />

        <Route
          path="/kakkakuni-heritage"
          element={<KakkakuniHeritage />}
        />

        <Route
          path="/kalappura-farm-house"
          element={<KalappuraFarmHouse />}
        />

        <Route
          path="/kampify-kochi"
          element={<KampifyKochi />}
        />

        <Route
          path="/kadavu-villas"
          element={<KadavuVillas />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;