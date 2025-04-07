import { Outlet } from "react-router-dom";
import Header from "./components/header/index";

function App() {
  return (
    <div>
      <Header />
      {/* <Navbar /> */}
      <Outlet /> {/* This is where child pages (Login, Dashboard, etc.) will be displayed */}
      
    </div>
  );
}


export default App;
