import Footer from "./pages/Footer";

function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default Layout;