function Home(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <p>{props.subtitle}</p>
        </div>
    );
}

export default Home;