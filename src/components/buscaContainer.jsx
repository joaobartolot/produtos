import { ListGroup, Form, Button } from "react-bootstrap";

import React, { Component } from "react";

export default class BuscaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            productsList: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ productName: e.target.value });
    }

    handleSubmit(e) {
        fetch(
            `https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${this.state.productName}&source=nanook`
        ).then(async (response) => {
            const data = await response.json();
            this.setState({
                productsList: data.products,
            });
        });
        e.preventDefault();
    }

    render() {
        return (
            <div className="p-5">
                <Form className="p-2" onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Produto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome do produto"
                            value={this.state.productName}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div>
                    {this.state.productsList &&
                    this.state.productsList.length > 0 ? (
                        <ListGroup>
                            {this.state.productsList.map((item) => (
                                <ListGroup.Item data-id={item.id}>
                                    {item.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>Nenhum produto</p>
                    )}
                </div>
            </div>
        );
    }
}
