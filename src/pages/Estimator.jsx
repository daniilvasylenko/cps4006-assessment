import { useState, useEffect } from "react";



function Estimator() {
    const [distance, setDistance] = useState(localStorage.getItem("distance") || "");
    const [mode, setMode] = useState(localStorage.getItem("mode") || "bus");
    const [mode2, setMode2] = useState("train");
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
        setError("")
        setComparison({first: firstMode, second: secondMode, cheapest: cheapest, fastest: fastest});
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
        if(mode === "walking"){
            pricePerKm = 0;
            speed = 3;
        } else if(mode === "cycling"){
            pricePerKm = 0.05;
            speed = 15;
        } else if(mode === "bus"){
            pricePerKm = 0.35;
            speed = 40;
        } else if(mode === "train"){
            pricePerKm = 0.7;
            speed = 150;
        } 
        const totalCost = km * pricePerKm;
        const totalMinutes = (km / speed) * 60;
        return{
            cost: totalCost.toFixed(2),
            time: formatTime(totalMinutes),
            rawCost: totalCost,
            rawMinutes: totalMinutes
        }
    };    
   
    useEffect(() => {calculate();}, [distance, mode, mode2]);
    useEffect(() => {localStorage.setItem("distance", distance);}, [distance]);
    useEffect(() => {localStorage.setItem("mode", mode);}, [mode]);
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
                <div className="comparison-card">
                    <h3>{capitalise(mode)}</h3>
                    <p>Cost: £{comparison.first.cost}</p>
                    <p>{comparison.first.time}</p>
                </div>
                <div className="comparison-card">
                    <h3>{capitalise(mode2)}</h3>
                    <p>Cost: £{comparison.second.cost}</p>
                    <p>{comparison.second.time}</p>
                </div>
                <div className="best-options">
                    <p>Cheapest: {capitalise(comparison.cheapest)}</p>
                    <p>Fastest: {capitalise(comparison.fastest)}</p>
                </div>
              </div>
            </div>
        )}  
  </div>
);
    
    

};



export default Estimator;