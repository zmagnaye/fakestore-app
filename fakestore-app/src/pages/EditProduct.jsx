import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

function EditProduct() {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
    });

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
            setFormData(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError("Failed to load electronic product.");
            setLoading(false);
        });
    }, [id]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false);
        setError("");

        axios.put(`https://fakestoreapi.com/products/${id}`, formData)
        .then(() => {
            setSuccess(true);
        }).catch(() => {
            setError("Failed to update product.");
        });
    };

     if (loading) {
        return <Spinner animation="border"/>;
    }

    return (
        <Container className="mt-4">
            <h2>Edit Product</h2>
            {success && <Alert variant="success">Product created successfully!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                        <Form.Control name="title" value={formData.title} onChange={handleChange} required />                
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                        <Form.Control name="price" value={formData.price} onChange={handleChange} required />                
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                        <Form.Control name="description" value={formData.description} onChange={handleChange} required />                
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Catergory</Form.Label>
                        <Form.Control name="category" value={formData.category} onChange={handleChange} required />                
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                        <Form.Control name="image" value={formData.image} onChange={handleChange} required />                
                </Form.Group>
            
                <Button variant="success" type="submit">Edit Product</Button>
            </Form>
        </Container>
    )
}

export default EditProduct;