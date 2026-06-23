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

import Dashboard from "./Admin/pages/Dashboard";
import PricingRequests from "./Admin/pages/PricingRequests";
import Users from "./Admin/pages/Users";
import Bookings from "./Admin/pages/Bookings";
import Settings from "./Admin/pages/Settings";
import VenueTypes from "./Admin/pages/VenueTypes";
import Locations from "./Admin/pages/Locations";
import Enquiries from "./Admin/pages/Enquiries";
import Subscribers from "./Admin/pages/Subscribers";
import Admin from "./Admin/Layout/AdminLayout";

import Layout from "./Layout";

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
      
  

      <Routes>
          
           {/* Admin panel ROUTES */}
        <Route path="/admin" element={<Dashboard />} />

        <Route
          path="/admin/venue-types"
          element={<VenueTypes />}
        />

        <Route
          path="/admin/locations"
          element={<Locations />}
        />

        <Route
          path="/admin/bookings"
          element={<Bookings />}
        />

        <Route
          path="/admin/pricing"
          element={<PricingRequests />}
        />

        <Route
          path="/admin/enquiries"
          element={<Enquiries />}
        />

        <Route
          path="/admin/users"
          element={<Users />}
        />

        <Route
          path="/admin/subscribers"
          element={<Subscribers />}
        />

        <Route
          path="/admin/settings"
          element={<Settings />}
        />
      </Routes>
    </>
  );
}

export default App;