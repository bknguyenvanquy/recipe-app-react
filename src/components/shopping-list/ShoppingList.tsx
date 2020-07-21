import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import { ingredients } from '../../store/Store';

class ShoppingList extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            ingredients: ingredients,
            currentIngredient: {},
            currentIndex: -1
        }
    }

    formikSubmit = (values: any) => {
        const { currentIndex, ingredients } = this.state;
        if (currentIndex < 0) {
            ingredients.push(values);
        } else {
            ingredients.splice(currentIndex, 1, values);
        }
        this.setState({
            ingredients
        });
    }

    handleSelect = (values: any, ingredient: any, index: any) => {
        values.setFieldValue('name', ingredient.name);
        values.setFieldValue('amount', ingredient.amount);
        this.setState({ currentIngredient: ingredient, currentIndex: index })
    }

    handleClear = (values: any) => {
        const { currentIngredient } = this.state;
        currentIngredient.amount = 0;
        values.setFieldValue('amount', currentIngredient.amount);
        this.setState({ currentIngredient: currentIngredient });
    }

    handleDelete = (values: any) => {
        const { currentIndex, ingredients } = this.state;
        ingredients.splice(currentIndex, 1);
        values.setFieldValue('name', '');
        values.setFieldValue('amount', '');
        this.setState({
            ingredients,
            currentIngredient: {},
            currentIndex: -1
        });
    }

    render() {
        const { ingredients, currentIndex } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <Formik initialValues={{ name: '', amount: '' }} onSubmit={this.formikSubmit}>
                        {
                            (values) => <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field id="name" className="form-control" type="text" name="name" />
                                    <label htmlFor="amount">Amount</label>
                                    <Field id="amount" className="form-control" type="text" name="amount" />
                                </div>
                                {
                                    currentIndex >= 0 ? (<><button type="submit" className="btn btn-success">Update</button>
                                        <button type="button" className="btn btn-danger" onClick={() => this.handleDelete(values)}>Delete</button></>) :
                                        <button disabled={currentIndex < 0 && (!values.values.name || !values.values.amount)} type="submit" className="btn btn-success">Add</button>
                                }
                                <button type="button" className="btn btn-info" onClick={() => this.handleClear(values)}>Clear</button>

                                <br /><br />
                                {
                                    (!!ingredients && ingredients.length !== 0) ? <ul className="list-group">
                                        {
                                            ingredients.map((ingredient: any, index: number) => {
                                                return (
                                                    <li key={index} className="list-group-item" onClick={() => this.handleSelect(values, ingredient, index)}>{ingredient.name} ({ingredient.amount})</li>
                                                )
                                            })
                                        }
                                    </ul> : null
                                }
                            </Form>
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default ShoppingList;