import React, { useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Spinner, Alert, Button, Card} from "react-bootstrap";

function ProductDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(res => {
            setProduct(res.data);
            setLoading(false);
        }).catch(() => {
            setError("Product not found.");
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <Spinner animation="border"/>;
    }
    if  (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container className="mt-4">
            <Button variant="link" onClick={() => navigate(-1)}>Back</Button>
            <Card className="p-4 shadow">
                <div>
                    <img src={product.image} alt={product.title} className="img-fluid mb-3" style={{maxWidth:"250px", objectFit:"contain"}}/>
                    <div className="ms-md-4">
                        <h2>{product.title}</h2>
                        <p className="text-muted">{product.category}</p>
                        <p>{product.description}</p>
                        <h4>{product.price}</h4>
                        <Button variant="danger" disabled>Delete</Button>
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default ProductDetails;