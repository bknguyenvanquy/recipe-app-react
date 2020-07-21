import React, { Component } from 'react';
import { Form, Field, ErrorMessage, Formik, FieldArray } from 'formik';
import { countId } from '../../../store/CountId';

interface FormState {
    name: string;
    imageUrl: string;
    description: string;
}

interface FormError {
    name?: string;
    imageUrl?: string;
    description?: string
}

interface Ingredient {
    name: string;
    amount: number;
}

class NewRecipe extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            recipes: this.props.recipes,
            recipeId: this.props.match.params.recipeId,
            url: this.props.match.url
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            recipeId: nextProps.match.params.recipeId,
            url: nextProps.match.url,
            recipes: nextProps.recipes
        }
    }

    goBackRecipes = () => {
        this.props.history.push('/recipes');
    }
    formikSubmit = (values: any) => {
        if (this.props.isUpdate) {
            this.props.updateRecipe(values)
        } else {
            this.props.addRecipe(values);
        }
        this.goBackRecipes();
    };
    formikValidate = (values: FormState) => {
        let error: FormError = {};
        if (values.name.length === 0) {
            error.name = 'Name is required';
        }
        if (values.imageUrl.length === 0) {
            error.imageUrl = 'Image Url is required';
        }
        if (values.description.length === 0) {
            error.description = 'Description is required';
        }
        return error;
    }
    render() {
        const {recipeId, recipes} = this.state;
        let recipe;
        if(this.props.isUpdate) {
            recipe = recipes.find((recipeEle: any) => {
                return recipeEle.id.toString() === recipeId.toString();
            })
        } else {
            recipe = { id: countId.id++, name: '', imageUrl: '', description: '', ingredients: new Array<Ingredient>() }
        }

        return (
            <div>
                <div className="row">
                    <Formik initialValues={recipe} onSubmit={this.formikSubmit} validate={this.formikValidate}>
                        {
                            (values) => <Form>
                                <button type="submit" className="btn btn-success" disabled={values.values.name.length === 0 || values.values.imageUrl.length === 0 || values.values.description.length === 0}>Save</button>
                                <button type="button" className="btn btn-danger" onClick={this.goBackRecipes}>Cancel</button>

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field id="name" className="form-control" type="text" name="name" />
                                    <ErrorMessage component='div' name="name" className="text-danger" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="imageUrl">Image Url</label>
                                    <Field id="imageUrl" className="form-control" type="text" name="imageUrl" />
                                    <ErrorMessage component='div' name="imageUrl" className="text-danger" />
                                </div>
                                {
                                    values.values.imageUrl && (
                                        <img style={{ width: '200px', height: '200px' }} src={values.values.imageUrl} alt="" />
                                    )
                                }
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <Field as="textarea" id="description" className="form-control" type="text" name="description" />
                                    <ErrorMessage component='div' name="description" className="text-danger" />
                                </div>
                                <FieldArray
                                    name="ingredients"
                                    render={arrayHelpers => (
                                        <div>
                                            {(values.values as any).ingredients.map((ingredient: any, index: any) => (
                                                <div key={index}>
                                                    <Field name={`ingredients[${index}].name`} />
                                                    <Field name={`ingredients.${index}.amount`} />
                                                    <button className="btn btn-danger" type="button" onClick={() => arrayHelpers.remove(index)}>
                                                        x
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                className="btn btn-success"
                                                type="button"
                                                onClick={() => arrayHelpers.push({ name: '', amount: 1 })}>
                                                Add Ingredient
                                            </button>
                                        </div>
                                    )}
                                />
                            </Form>
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default NewRecipe;