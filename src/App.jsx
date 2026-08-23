import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Venues from "./pages/Venues";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import MyNavbar from "./Navbar";

import Corprate from "./components/events/Corprate";
import Wedding from "./components/events/Wedding";
import Destinationwedding from "./components/events/Destinationwedding";
import BeachWedding from "./components/events/BeachWedding";
import Entertainment from "./components/events/Entertainment";
import PrivatePartics from "./components/events/PrivatePartics";
import WeddingPhotoVideo from "./components/events/WeddingPhoto&video/WeddingPhotosVideo";
import Catering from "./components/events/Catering";

import ScrollToTop from "./components/ScrollToTop";

/*import KakkattuMana from "./components/venues/KakkattuMana";
import KakkakuniHeritage from "./components/venues/KakkakuniHeritage";
import KalappuraFarmHouse from "./components/venues/KalappuraFarmHouse";
import KampifyKochi from "./components/venues/KampifyKochi";
import KadavuVillas from "./components/venues/KadavuVillas";*/

import PhotoGallery from "./components/gallery/PhotoGallery";
import VideoGallery from "./components/gallery/VideoGallery";
import ShortsGallery from "./components/gallery/ShortsGallery";
import WeddingAlbums from "./components/gallery/WeddingAlbums";
import AlbumDetails from "./components/gallery/AlbumDetails";
import Blogs from "./components/about/Blogs";
import Test from "./components/about/Test";
import Footer from "./pages/Footer";

import WhatsAppButton from "./components/WhatsAppButton";

import MyBookings from "./pages/MyBookings"
import Layout from "./Layout";
import Form from "./Form/Form";
import Register from "./Form/Register/Register"
import Login from "./components/Login/Login"
//admin panel
import ProtectedRoute from "./Admin/ProtectedRoute";
import AdminLogin from "./Admin/Auth/AdminLogin";
import AdminRoutes from "./Admin/AdminRoutes";

import MainLayout from "./Admin/Layouts/MainLayout";
import Dashboard from "./Admin/page/Dashboard";
import Requests from "./Admin/page/Requests";
import Bookings from "./Admin/page/Bookings";
import Customers from "./Admin/page/Customers";
import GalleryAdmin from "./Admin/page/Gallery";
import Venue from "./Admin/page/Venue";
import Availability from "./Admin/page/Availability";
import CancellationPolicy from "./Admin/page/CancellationPolicy";
import Payments from "./Admin/page/Payments";
import Pricing from "./Admin/page/Pricing";
import Reports from "./Admin/page/Reports";
import Reviews from "./Admin/page/Reviews";
import Notifications from "./Admin/page/Notifications";
import AdminMail from "./Admin/page/AdminMail";
import Settings from "./Admin/page/Settings";
import { SettingsProvider } from "./context/SettingsContext";


import VenueDetails from "./pages/VenueDetails";

function App() {
  return (
    <>
     <SettingsProvider>
      <ScrollToTop />

      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />

        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/Test" element={<Test />} />          
        <Route path="/services" element={<> <MyNavbar /> <Services /></> }/>
        <Route path="/venues" element={<Venues />} />
        <Route path="/venue/:slug" element={<VenueDetails />}/>
        <Route path="/gallery" element={<><MyNavbar /><Gallery /></>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-bookings"element={<MyBookings/>}/>

        {/* EVENT ROUTES */}
        <Route path="/Corprate" element={<Corprate />} />
        <Route path="/Wedding" element={<Wedding />} />
        <Route path="/Destinationwedding" element={<Destinationwedding />}/>
        <Route path="/Beachwedding" element={<BeachWedding />} />
        <Route path="/Entertainment" element={<Entertainment />} />
        <Route path="/wedding-photography-videography" element={<WeddingPhotoVideo />}/>
        <Route path="/Catering"element={<Catering />}/> 

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
        <Route path="/wedding-album/:album" element={<AlbumDetails />} />

        {/* VENUE ROUTES 
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
       path="/KampifyKochi"
       element={<KampifyKochi />}
       />

        <Route
          path="/kadavu-villas"
          element={<KadavuVillas />}
        /> */}


        {/* admin  panel */}

{/* ================= ADMIN PANEL ================= */}

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />

  <Route
    path="requests"
    element={<Requests />}
  />

  <Route
    path="bookings"
    element={<Bookings />}
  />

  <Route
    path="customers"
    element={<Customers />}
  />

  <Route
    path="venue"
    element={<Venue />}
  />

  <Route
    path="gallery"
    element={<GalleryAdmin />}
  />

  <Route
    path="availability"
    element={<Availability />}
  />

  <Route
    path="cancellation-policy"
    element={<CancellationPolicy />}
  />

  <Route
    path="payments"
    element={<Payments />}
  />

  <Route
    path="pricing"
    element={<Pricing />}
  />

  <Route
    path="reports"
    element={<Reports />}
  />

  <Route
    path="notifications"
    element={<Notifications />}
  />

  <Route
    path="reviews"
    element={<Reviews />}
  />

  <Route
    path="AdminMail"
    element={<AdminMail />}
  />

  <Route
    path="settings"
    element={<Settings />}
  />

</Route>

      </Routes>
      
      <WhatsAppButton />
      </SettingsProvider>

    </>
  );
}

export default App;