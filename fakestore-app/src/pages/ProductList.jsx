import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert, Button} from "react-bootstrap";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products/category/electronics")
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to load electronic products.");
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Spinner animation="border"/>;
    }
    if  (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Electronics</h2>
            <Row>
                {products.map((product) => (
                    <Col md={6} lg={4} key={product.id} className="mb-4">
                        <div className="border p-2 rounded">
                            <img src={product.image} alt={product.title} className="img-fluid mb-2" style={{height:"200px", obejectFit:"contain"}}/>
                            <h5 className="text-truncate">{product.title}</h5>
                            <p className="mb-1">${product.price}</p>
                            <Link to={`/products/${product.id}`}>
                                <Button variant="primary" size="sm">View Product Details</Button>
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default ProductList;