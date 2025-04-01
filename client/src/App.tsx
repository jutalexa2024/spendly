import { Navigate, Outlet } from "react-router-dom";
import  Navbar from "./components/nav/index";
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Outlet /> {/* This is where child pages (Login, Dashboard, etc.) will be displayed */}
    </div>
  );
}


export default App;
