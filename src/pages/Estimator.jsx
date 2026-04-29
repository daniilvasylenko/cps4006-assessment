import { useState, useEffect } from "react";



function Estimator() {
    const [distance, setDistance] = useState(localStorage.getItem("distance") || "");
    const [mode, setMode] = useState(localStorage.getItem("mode") || "bus");
    const [mode2, setMode2] = useState(localStorage.getItem("mode2") || "train");
    const [error, setError] = useState("");
    const [comparison, setComparison] = useState(null);

    const capitalise = (text) =>{
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const calculate = () => {
        if (distance === ""){
            setError("");
            setComparison(null);
            return;
        }
        const km = Number(distance);
        if (km <= 0){
            setError("Please enter a valid distance");
            setComparison(null);
            return;
        }
        const firstMode = getData(mode, km);
        const secondMode = getData(mode2, km);
        const cheapest = firstMode.rawCost <= secondMode.rawCost ? mode : mode2;
        const fastest = firstMode.rawMinutes <= secondMode.rawMinutes ? mode : mode2;
        const greenest = firstMode.rawCO2 <= secondMode.rawCO2 ? mode : mode2;
        setError("");
        setComparison({first: firstMode, second: secondMode, cheapest: cheapest, fastest: fastest, greenest: greenest});
    }
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.floor(minutes % 60);
        const hourText = hours === 1 ? "hour" : "hours";
        const minuteText = remainingMinutes === 1 ? "minute" : "minutes";
        if (hours > 0) {
            return "Time: " + hours + " " + hourText + ", " + remainingMinutes + " " + minuteText;
        }
        return "Time: " + remainingMinutes + " " + minuteText;
    }
    const getData = (mode, km) => {
        let pricePerKm = 0;
        let speed = 0;
        let co2PerKm = 0;
        if(mode === "walking"){
            pricePerKm = 0;
            speed = 3;
            co2PerKm = 0;
        } else if(mode === "cycling"){
            pricePerKm = 0;
            speed = 15;
            co2PerKm = 0;
        } else if(mode === "bus"){
            pricePerKm = 0.35;
            speed = 40;
            co2PerKm = 80;
        } else if(mode === "train"){
            pricePerKm = 0.7;
            speed = 150;
            co2PerKm = 45;
        } 
        const totalCost = km * pricePerKm;
        const totalMinutes = (km / speed) * 60;
        const totalCO2 = km * co2PerKm;
        return{
            cost: totalCost.toFixed(2),
            time: formatTime(totalMinutes),
            co2: totalCO2.toFixed(0),
            rawCost: totalCost,
            rawMinutes: totalMinutes,
            rawCO2: totalCO2
            
        }
    };    
   
    useEffect(() => {calculate();}, [distance, mode, mode2]);
    useEffect(() => {localStorage.setItem("distance", distance);}, [distance]);
    useEffect(() => {localStorage.setItem("mode", mode);}, [mode]);
    useEffect(() => {localStorage.setItem("mode2", mode2);}, [mode2]);
    return (
    <div>
       <h1>Cost Estimator</h1>

        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="cycling">Cycling</option>
            <option value="walking">Walking</option>
        </select>
        <select value={mode2} onChange={(e) => setMode2(e.target.value)}>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="cycling">Cycling</option>
            <option value="walking">Walking</option>
        </select>     
        <p style={{color: "red"}}>{error}</p>  

        {comparison && (
            <div className="comparison-section">
                <h2>Comparison</h2>
                <div className="comparison-cards">
                <div className={`comparison-card ${comparison.cheapest === mode ? "cheapest" : ""} ${comparison.fastest === mode ? "fastest" : ""}`}>
                    <div className="card-header">
                        <h3>{capitalise(mode)}</h3>
                    </div>
                    <div className="badges">
                        {comparison.first.rawCost <= comparison.second.rawCost  && (
                            <span className="badge green">Cheapest</span>
                        )}
                        {comparison.fastest === mode && <span className="badge blue">Fastest</span>}
                        {comparison.first.rawCO2 === comparison.second.rawCO2 && (
                            <span className="badge eco">Eco</span>
                        )}
                        {comparison.first.rawCO2 < comparison.second.rawCO2 && (
                            <span className="badge eco">Eco</span>
                        )}
                    </div>
                    <div className="card-body">
                        <p><strong>Cost: £{comparison.first.cost}</strong></p>
                        <p><strong>{comparison.first.time}</strong></p>
                        <p><strong>CO2: {comparison.first.co2} g</strong></p>
                    </div>
                </div>
                <div className={`comparison-card ${comparison.cheapest === mode2 ? "cheapest" : ""} ${comparison.fastest === mode2 ? "fastest" : ""}`}>
                    <div className="card-header">
                        <h3>{capitalise(mode2)}</h3>
                    </div>
                    <div className="badges">
                        {comparison.second.rawCost <= comparison.first.rawCost && (
                            <span className="badge green">Cheapest</span>
                        )}
                        {comparison.fastest === mode2 && <span className="badge blue">Fastest</span>}
                        {comparison.first.rawCO2 === comparison.second.rawCO2 && (
                            <span className="badge eco">Eco</span>
                        )}
                        {comparison.second.rawCO2 < comparison.first.rawCO2 && (
                            <span className="badge eco">Eco</span>
                        )}
                    </div>
                    <div className="card-body">
                        <p><strong>Cost: £{comparison.second.cost}</strong></p>
                        <p><strong>{comparison.second.time}</strong></p>
                        <p><strong>CO2: {comparison.second.co2} g</strong></p>
                    </div>
                </div>
                <div className="best-options">
                    {comparison.cheapest === comparison.fastest ? (
                        <>
                        <p>Best overall: {capitalise(comparison.cheapest)}</p>
                        <p>Most eco-friendly: {capitalise(comparison.greenest)}</p>
                        </>  
                    ) : (
                        <>
                        <p>Cheapest: {capitalise(comparison.cheapest)}</p>
                        <p>Fastest: {capitalise(comparison.fastest)}</p>
                        <p>Most eco-friendly: {capitalise(comparison.greenest)}</p>
                        </>
                    )}
                </div> 
              </div>
            </div>
        )}  
  </div>
);
    
    

};



export default Estimator;