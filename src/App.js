/*
 * Copyright (c) 2020. Adam Arthur Faizal
 */

import React, {Component, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem, NavLink, NavbarText
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            text: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            text: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.state.text.length === 0){
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }

    render() {
        return (
            <div className="App">
                <TodoNav/>
                <header className="App-header">
                    <section className="logo">
                        <img src={logo} className="App-logo" alt="logo" />
                    </section>
                    <section className="todo">
                        <h3>TODO App</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="new-todo">
                                    Ayo tulis sesuatu disini ...
                                </Label>
                                <Input
                                    id="new-todo"
                                    type="text"
                                    onChange={this.handleChange}
                                    value={this.state.text}
                                />
                            </FormGroup>
                            <Button color="info">
                                Add #{this.state.items.length + 1}
                            </Button>
                        </Form>
                    </section>
                    <section className="list-items">
                        <TodoList items={this.state.items} />
                    </section>
                    <section className="react-version">
                        <p className="font-weight-bold">React Js version : {React.version}</p>
                    </section>
                </header>
            </div>
        );
    }
}

class TodoList extends Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        )
    }
}

function TodoNav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <Navbar color="info" dark fixed="top" expand="md">
            <NavbarBrand href="/">Adam Arthur Faizal</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="https://github.com/AdamArthurFaizal">GitHub</NavLink>
                    </NavItem>
                </Nav>
                <NavbarText>React JS version : {React.version}</NavbarText>
            </Collapse>
        </Navbar>
    )
}

class AppRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={TodoApp} exact/>
                </Switch>
            </div>
        )
    }
}

export default AppRouter;
