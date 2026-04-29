import { Link } from "react-router-dom";

function Home() {
    return(
        <div className="home-page">
            <h1>St Mary's Urban Mobility Hub</h1>
            <p>
                Simple web application designed to help users plan everyday journeys around the city
            </p>
            <p>
                This app consists of various travel modes which you can explore to decide what is best for you based on price and speed!
            </p>
            <div className="home-links">
                <Link to="/modes">Explore Travel Modes</Link>
                <Link to="/estimator">Estimate your journey</Link>
            </div>
        </div>
    )
}

export default Home;