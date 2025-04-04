import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();   
  return (
    <div>
    <header>
      <h2>Welcome to Spendly</h2>
      <p>
        Having trouble keeping up with your subscriptions or what bills are due and when? 
        If this is you, then you have come to the right place! Spendly is a simple and easy to use app that helps you keep track of your subscriptions and bills. 
        You can add, edit, and delete subscriptions and bills, and you can also see a list of all your subscriptions and bills in one place. 
        Spendly is the perfect app for anyone who wants to take control of their finances and stay on top of their bills.
      </p>
      <ul>
        <li><Link to="/about">About</Link></li>
      </ul>
      </header>
    </div>
  );
}

export default Home;