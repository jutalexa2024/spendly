import { Outlet } from "react-router-dom";
import Header from "./components/header/index";
import Footer from "./components/footer/index";

function App() {
  return (
    <div>
      <Header />
      {/* <Navbar /> */}
      <Outlet /> {/* This is where child pages (Login, Dashboard, etc.) will be displayed */}
      <Footer />
      
    </div>
  );
}


export default App;
