import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NewRecipe from './new-recipe/NewRecipe';
import RecipeDetail from './recipe-detail/RecipeDetail';
import { recipesStore } from '../../store/Store';

class Recipes extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            recipes: recipesStore
        }
    }

    goToDetail = (recipeId: number) => {
        const url = this.props.match.url;
        this.props.history.push(`${url}/recipe-detail/${recipeId}`);
    }

    goToCreateNewRecipe = () => {
        const url = this.props.match.url;
        this.props.history.push(`${url}/create-recipe`);
    }

    addRecipe = (value: any) => {
        const {recipes} = this.state;
        recipes.push(value);
        this.setState({recipes});
    }
    
    updateRecipe = (value: any) => {
        const {recipes} = this.state;
        let index = recipes.findIndex((recipe: any) => {
            return recipe.id.toString() === value.id.toString();
        });
        if(index > -1) {
            recipes[index] = value;
        }
        this.setState({recipes});
    }

    editRecipe = (recipeId: number) => {
        this.props.history.push(`/recipes/update-recipe/${recipeId}`);
    }

    deleteRecipe = (recipeId: number) => {
        const {recipes} = this.state;
        let index = recipes.findIndex((recipe: any) => {
            return recipe.id.toString() === recipeId.toString();
        });
        if(index > -1) {
            recipes.splice(index, 1)
        }
        this.setState({recipes});
    }
    render() {
        const url = this.props.match.url;
        const {recipes} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <button type="button" className="btn btn-success" onClick={this.goToCreateNewRecipe}>New Recipe</button>
                        {
                            recipes.map((recipe: any, index: number) => {
                                return (<div className="card" key={recipe.id} onClick={() => this.goToDetail(index)}>
                                    <img className="card-img-top" src={recipe.imageUrl} alt=""/>
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.name}</h5>
                                        <p className="card-text">{recipe.description}</p>
                                    </div>
                                </div>);
                            })
                        }
                    </div>
                    <div className="col-9">
                        <Switch>
                            <Route path={`${url}/create-recipe`} 
                            render={(props) => (<NewRecipe {...props} isUpdate={false} addRecipe={this.addRecipe}></NewRecipe>)}>
                            </Route>
                            <Route path={`${url}/update-recipe/:recipeId`} 
                            render={(props) => (<NewRecipe {...props} 
                                    recipes={this.state.recipes} 
                                    updateRecipe={this.updateRecipe}
                                    isUpdate={true}></NewRecipe>)}>
                            </Route>
                            <Route path={`${url}/recipe-detail/:recipeId`} 
                            render={(props) => (<RecipeDetail {...props} 
                                    recipes={this.state.recipes}
                                    editRecipe={this.editRecipe}
                                    deleteRecipe={this.deleteRecipe}
                                    ></RecipeDetail>)}>
                            </Route>
                            <Route exact path="/recipes/" render={() => <h3>Please select a Recipe!</h3>}></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipes;