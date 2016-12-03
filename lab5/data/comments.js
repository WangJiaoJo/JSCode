const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require("node-uuid");

let exportedMethods = {
	getCommentsByRecipeId(id){
		if (!id) throw "No recipe id provided";
		return recipes().then((recipeCollection) => {
			return recipeCollection.findOne({_id: id}).then((recipe) => {
				if (!recipe) throw "Comments not found";
				
				let recipeId = recipe._id;
				let recipeTitle = recipe.title;
				let comments = recipe.comments;
				
				var rs = [];
				for (i = 0; i < comments.length; i++){
					let commentContent = {
						_id: comments[i]._id,
						recipeId: recipeId,
						recipeTitle: recipeTitle,
						poster: comments[i].poster,
						comment: comments[i].comment
					};
					rs.push(commentContent);
				}
				
				return rs;
			});
		}); 
	},
	
	getCommentsByCommentId(id){
		if (!id) throw "No comment id provided";
		return recipes().then((recipeCollection) => {
			return recipeCollection.findOne({"comments._id": id}).then((recipe) => {
				if (!recipe) throw "Comment not found";
				
				let comments = recipe.comments;
				
				let commentContent = {
					_id: id,
					recipeId: recipe._id,
					recipeTitle: recipe.title
				}
				
				for (i = 0; i < comments.length; i++){
					if (comments[i]._id == id){
						commentContent.poster = comments[i].poster;
						commentContent.comment = comments[i].comment;
						break;
					}
				};
				return commentContent;
			});
		});
	},
	
	addComment(id, info){
		if (!id) throw "No recipe id provided";
		if (!info) throw "No info provided";
		info._id = uuid.v4();
		return recipes().then((recipeCollection) => {
			/*
			let newComment = {
				_id: uuid.v4(),
				poster: poster,
				commentContent: commentContent 
			}
			
			return recipeCollection.insertOne(newComment).then((newInsertInfo) => {
				return newInsertInfo.insertedId;
			}).then((newId) => {
				return this.getCommentsByCommentId(newId);
			});
			*/
			
			return recipeCollection.update({_id: id}, {$push: {"comments": info}}).then((updateInfo) => {
				return this.getCommentsByCommentId(info._id);
			});
			
		});
	},
	
	updateComment(id, commentId, commentContent){
		if (!id) throw "No recipe id provided";
		if (!commentId) throw "No comment id provided";
		if (!commentContent) throw "No comment content provided";
		return recipes().then((recipeCollection) => {
			return recipeCollection.update({_id: id, "comments._id": commentId}, {$set: {"comments.$.comment": commentContent}}).then((updateInfo) => {
				return this.getCommentsByCommentId(commentId);
			});
		});
	},
	
	removeComment(id){
		if (!id) throw "No comment id provided";
		return recipes().then((recipeCollection) => {
			return recipeCollection.update({}, {$pull: {"comments": {_id: id}}}, {multi: true}).then((deleteInfo) => {
				return "OK";
			});
		});
	}
};

module.exports = exportedMethods;