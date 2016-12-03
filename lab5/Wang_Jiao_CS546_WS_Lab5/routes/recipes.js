const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.get("/", (req, res) => {
	recipeData.getAllRecipes().then((recipeList) => {
		res.json(recipeList);
	}, () => {
		res.sendStatus(500);
	});
});

router.get("/:id", (req, res) => {
	recipeData.getRecipeById(req.params.id).then((recipe) => {
		res.json(recipe);
	}).catch(() => {
		res.status(404).json({error: "recipe not found"});
	});
});

router.post("/", (req, res) => {
	let recipeInfo = req.body;
	
	if (!recipeInfo){
		res.status(404).json({error: "You must provide data to create a recipe"});
		return;
	}
	
	if (!recipeInfo.title){
		res.status(404).json({error: "You must provide a title"});
		return;
	}
	
	if (!recipeInfo.ingredients){
		res.status(404).json({error: "You must provide ingredients"});
		return;
	}
	
	if (!recipeInfo.steps){
		res.status(404).json({error: "You must provide steps"});
		return;
	}
	
	recipeData.addRecipe(recipeInfo.title, recipeInfo.ingredients, recipeInfo.steps)
		.then((newRecipe) => {
			res.json(newRecipe);
		}, () => {
			res.sendStatus(500);
		});
});

router.put("/:id", (req, res) => {
	let recipeInfo = req.body;
	
	if (!recipeInfo){
		res.status(404).json({error: "You must provide data to create a recipe"});
		return;
	}
	
	let recipe = recipeData.getRecipeById(req.params.id).then(() => {
		return recipeData.updateRecipe(req.params.id, recipeInfo).then((updatedRecipe) => {
			res.json(updatedRecipe);
		}, () => {
			res.sendStatus(500);
		});
	}).catch(() => {
		res.status(404).json({error: "Recipe not found"});
	});
});

router.delete("/:id", (req, res) => {
	let recipe = recipeData.getRecipeById(req.params.id).then(() => {
		return recipeData.removeRecipe(req.params.id).then(() => {
			res.sendStatus(200);
		}).catch(() => {
			res.sendStatus(500);
		});
	}).catch(() => {
		res.status(400).json({error: "Recipe not found"});
	});
});

module.exports = router;