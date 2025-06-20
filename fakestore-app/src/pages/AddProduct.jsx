import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function AddProduct() {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "",
        image: ""
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        setError("");

        try{
            const response = await axios.post("https://fakestoreapi.com/products", formData);
            console.log(response.data);
            setSuccess(true);
            setFormData({
                title: "",
                price: "",
                description: "",
                category: "",
                image: ""
            });
        } catch (err) {
            console.error(err);
            setError("Failed to add product.");
        }
    };

    return (
        <Container className="mt-4">
            <h2>Add New Product</h2>
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

                <Button variant="success" type="submit">Add Product</Button>
            </Form>
        </Container>
    );
}

export default AddProduct;