const travelModes = [
    {
        name: "Bus",
        icon: "🚌",
        description: "Affordable public transport for short and medium journeys",
        benefit: "Low cost and widely available",
        limitation: "Can be delayed in traffic"
    },
    {
        name: "Rail",
        icon: "🚆",
        description: "Fast transport option for long routes across the city",
        benefit: "Quick and reliable on long distances",
        limitation: "More expensive at peak times"
    },
    {
        name: "Cycling",
        icon: "🚲",
        description: "Healty and sustainable way to travel across urban areas",
        benefit: "Low cost and environmently friendly",
        limitation: "Can be influenced by weather, road safety can be a concern"
    },
    {
        name: "Walking",
        icon: "🚶",
        description: "Simple and free option for shorts travels in local area",
        benefit: "Free, healthy, and accessible",
        limitation: "Not sustainable for long distances"
    }
];

function Modes() {
    return (
        <div>
            <h1>Travel Modes</h1>

            {travelModes.map((mode) => (
                <div key={mode.name}>
                    <h2>{mode.icon} {mode.name}</h2>
                    <p>{mode.description}</p>
                    <p><strong>Benefit:</strong> {mode.benefit}</p>
                    <p><strong>Limitation: </strong> {mode.limitation}</p>
                </div>
            ))}
        </div>
    );
}

export default Modes;