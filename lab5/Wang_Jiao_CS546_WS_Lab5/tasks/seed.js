const dbConnection = require("../config/mongoConnection");
const uuid = require("node-uuid");

dbConnection().then((db) => {
	return db.collection("recipes").drop().then(() => {
		return db;
	}, () => {
		return db;
	}).then((db) => {
		return db.createCollection("recipes");
	}).then((recipeCollection) => {
		var makeDoc = (title, ingredients, steps) => {
			return {
				_id: uuid.v4(),
				title: title,
				ingredients: ingredients,
				steps: steps,
				comments: []
			};
		};
		
		var addComments = (recipe, poster, comment) => {
			var newComment = {
				_id: uuid.v4(),
				poster: poster,
				comment: comment
			};
			
			recipe.comments.push(newComment);
		};
		
		var listOfRecipes = [];
		
		var friedEggsIngre = [
			{
				name: "Egg",
				amount: "2 eggs"
			},
			{
				name: "Olive Oil",
				amount: "2 tea spoons"
			}
		];
		
		var friedEggsSteps = [
			"First, heat a non-stick pan on medium-high until hot",
            "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
            "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
            "Gently pour the egg from the bowl onto the oil",    
            "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
            "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
            "Remove from oil and plate",
            "Repeat for second egg"
		];
		
		var friedEggs = makeDoc("Fried Eggs", friedEggsIngre, friedEggsSteps);
		addComments(friedEggs, "Wang", "Very good");
		addComments(friedEggs, "Li", "Excellent");
		addComments(friedEggs, "Zhang", "Perfect");
		
		var cheeseCakeIngre = [
			{
				name: "Egg",
				amount: "two eggs"
			},
			{
				name: "Cream Cheese",
				amount: "500g"
			},
			{
				name: "Whapping Cream",
				amount: "120g"
			}
		];
		
		var cheeseCakeSteps = [
			"Preheat oven to 350 degrees F (175 degrees C). Grease and flour three 9 inch round cake layer pans",
            "Combine the cake mix, instant vanilla pudding, milk, vegetable oil and the 3 whole eggs. Mix until blended. Pour batter into the prepared pans",
            "Bake at 350 degrees F (175 degrees C) for 25 minutes or until cakes test done. Set aside cakes to cool",
            "To Make Lemon Cheese Filling: In the top half of a double boiler combine the egg yolks, white sugar, butter or margarine, flour, grated lemon rind and lemon juice. Cook stirring constantly over medium heat until mixture is thick enough to spread. Let cool before spreading between cooled cake layers"
		];
		
		var cheeseCake = makeDoc("Cheese Cake", cheeseCakeIngre, cheeseCakeSteps);
		addComments(cheeseCake, "Wang", "Excellent");
		addComments(cheeseCake, "Li", "Perfect");
		
		var friedChickenIngre = [
			{
				name: "Egg",
				amount: "1 egg"
			},
			{
				name: "Black Pepper",
				amount: "1/2 tea spoon ground black pepper"
			},
			{
				name: "Chicken",
				amount: "6 skinless, boneless chicken breast halves"
			}
		];
		
		var friedChickenSteps = [
			 "Place crackers in a large resealable plastic bag; seal bag and crush crackers with a rolling pin until they are coarse crumbs. Add the flour, potato flakes, seasoned salt, and pepper and mix well",
            "Beat egg in a shallow dish or bowl. One by one, dredge chicken pieces in egg, then place in bag with crumb mixture. Seal bag and shake to coat",
            "Heat oil in a deep-fryer or large saucepan to 350 degrees F (175 degrees C).",
            "Fry chicken, turning frequently, until golden brown and juices run clear, 15 to 20 minutes."
		];
		
		var friedChicken = makeDoc("Fried Chicken", friedChickenIngre, friedChickenSteps);
		
		listOfRecipes.push(friedEggs, cheeseCake, friedChicken);
		
		return recipeCollection.insertMany(listOfRecipes).then(() => {
			return recipeCollection.find().toArray();
		});
	});
});