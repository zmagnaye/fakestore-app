import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
    return (
        <Container className="text-center mt-5">
            <h1>📱Welcome to ElectroStore💻</h1>
            <p className="lead">
                One stop shop for latest gadgets, gears, and electronics.
            </p>
            <Link to="/products">
                <Button variant="dark" size="lg"> Browse Electronics </Button>
            </Link>
        </Container>
    );
}

export default Home;