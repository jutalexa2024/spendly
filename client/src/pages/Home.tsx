import { useNavigate } from "react-router-dom";
import "../styles/home.css";


const Home = () => {
    const navigate = useNavigate();   
  return (
    <div>
    <header>
        <section className="home-main">
            <div className="left-column">
      <h1 className="welcome-title">Welcome to Spendly</h1>
      <p>
        Take control of your subscriptions and bills all in one place! Spendly maked it easy to track, manage, and stay on top of what you pay, so you can focus on what matters most!
      </p>
      </div>
      <div className="right-column">
        <img src="Spendly-preview-img.png" alt="Preview Image" className="preview-image" />
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://spendly.app" alt="QR Code" className="qr-code" />
        <p>Download This App</p>
        <div className="store-buttons">
        <button onClick={() => console.log('App Store button clicked')}>
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
        </button>
        <button onClick={() => console.log('Google Play button clicked')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
        </button>
        </div>
      </div>
      </section>
      </header>
    </div>
  );
}

export default Home;