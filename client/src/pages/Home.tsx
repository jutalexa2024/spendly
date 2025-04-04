import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../styles/home.css";


const Home = () => {
    const navigate = useNavigate();   
  return (
    <div>
    <header>
        <section className="home-main">
            <div className="left-column">
      <h1>Welcome to Spendly</h1>
      <p>
        Having trouble keeping up with your subscriptions or what bills are due and when? 
        If this is you, then you have come to the right place! Spendly is a simple and easy to use app that helps you keep track of your subscriptions and bills. 
        You can add, edit, and delete subscriptions and bills, and you can also see a list of all your subscriptions and bills in one place. 
        Spendly is the perfect app for anyone who wants to take control of their finances and stay on top of their bills.
      </p>
      <ul>
        <li><Link to="/about">About</Link></li>
      </ul>
      </div>
      <div className="right-column">
        <img src="https://via.placeholder.com/400" alt="Placeholder" />
        <img src="https://via.placeholder.com/150" alt="Placeholder" />
        <p>Download This App</p>
        <button onClick={() => console.log('App Store button clicked')}>
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
        </button>
        <button onClick={() => console.log('Google Play button clicked')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
        </button>
      </div>
      </section>
      </header>
    </div>
  );
}

export default Home;