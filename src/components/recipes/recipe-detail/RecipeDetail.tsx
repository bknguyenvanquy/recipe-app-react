import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { ingredients } from '../../../store/Store';

class RecipeDetail extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            recipeId: this.props.match.params.recipeId,
            url: this.props.match.url,
            recipes: this.props.recipes
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            recipeId: nextProps.match.params.recipeId,
            url: nextProps.match.url,
            recipes: nextProps.recipes
        }
    }

    toShoppingList = (recipeId: number) => {
        const { recipes } = this.state;
        const recipe = recipes.find((recipeEle: any, index: number) => index.toString() === recipeId.toString());
        // this.props.history.push(`/shopping-list`, {ingredients: recipe.ingredients});
        recipe.ingredients.forEach((ingredient: any) => {
            ingredients.push(ingredient);
        })
        this.props.history.push(`/shopping-list`);
    }

    editRecipe = (recipeId: number) => {
        // console.log(recipeId);
        this.props.editRecipe(recipeId);
    }
    
    deleteRecipe = (recipeId: number) => {
        // console.log(recipeId);
        this.props.deleteRecipe(recipeId);
        this.props.history.push(`/recipes`);
    }

    onSelect = ({target}: any) => {
        const {recipeId} = this.state;
        switch(target.value) {
            case '1': this.toShoppingList(recipeId); break;
            case '2': this.editRecipe(recipeId); break;
            case '3': this.deleteRecipe(recipeId); break;
            default: break;
        }
    }
    render() {
        const { recipeId, recipes } = this.state;
        const recipe = recipes.find((recipeEle: any, index: number) => index.toString() === recipeId.toString());
        if (recipe) {
            return (
                <div className="recipe-detail">
                    <img src={recipe.imageUrl} alt="" />
                    <h3>{recipe.name}</h3>
                    <select className="custom-select" onChange={this.onSelect}>
                        <option defaultValue="0">Open this select actions</option>
                        <option value="1">To Shopping List</option>
                        <option value="2">Edit Recipe</option>
                        <option value="3">Delete Recipe</option>
                    </select>
                    <br />
                    <br />
                    <label>Description: </label>
                    <p>{recipe.description}</p>
                    <br /><br />
                    {
                        (!!recipe.ingredients && recipe.ingredients.length !== 0) ? <ul className="list-group">
                        {
                            recipe.ingredients.map((ingredient: any, index: number) => {
                            return (<li key={index} className="list-group-item">{ingredient.name} - {ingredient.amount}</li>)
                            })
                        }
                    </ul> : null
                    }
                </div>
            );
        } else {
            return <Redirect to="/recipes"></Redirect>
        }
    }
}

export default RecipeDetail;