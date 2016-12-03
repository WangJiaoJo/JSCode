const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require("node-uuid");

let exportedMethods = {
	getAllRecipes(){
		return recipes().then((recipeCollection) => {
			return recipeCollection.find({}, {_id: 1, title: 1}).toArray();
		});
	},
	
	getRecipeById(id){
		if (!id) throw "No id provided";
		return recipes().then((recipeCollection) => {
			return recipeCollection.findOne({_id: id}).then((recipe) => {
				if (!recipe) throw "Recipe not found";
				return recipe;
			});
		});
	},
	
	addRecipe(title, ingredients, steps){
		if (!title) throw "No title provided";
		if (!ingredients) throw "No indegredients provided";
		if (!steps) throw "No steps provided";
		return recipes().then((recipeCollection) => {
			let newRecipe = {
				_id: uuid.v4(),
				title: title,
				ingredients: ingredients,
				steps: steps,
				comments: []
			}
			
			return recipeCollection.insertOne(newRecipe).then((newInsertInfo) => {
				return newInsertInfo.insertedId;
			}).then((newId) => {
				return this.getRecipeById(newId);
			});
		});
	},
	
	updateRecipe(id, updatedRecipe){
		if (!id) throw "No id provided";
		if (!updatedRecipe) throw "No updated recipe provided";
		return this.getRecipeById(id).then((currentRecipe) => {
			let newRecipe = {};
	
			if (updatedRecipe.title) newRecipe.title = updatedRecipe.title;
			if (updatedRecipe.ingredients) newRecipe.ingredients = updatedRecipe.ingredients;
			if (updatedRecipe.steps) newRecipe.steps = updatedRecipe.steps;
			
			let updateCommand = {
				$set: newRecipe
			};
			
			return recipes().then((recipeCollection) => {
				return recipeCollection.updateOne({_id: id}, updateCommand).then(() => {
					return this.getRecipeById(id);
				});
			});
		});
	},
	
	removeRecipe(id){
		if (!id) throw "No id provided";
		return recipes().then((recipeCollection) => {
			return recipeCollection.removeOne({_id: id}).then((deletionInfo) => {
				if (deletionInfo.deletionCount === 0)
					throw (`Could not delete recipe with id of ${id}`);
			});
		});
	}
};

module.exports = exportedMethods;