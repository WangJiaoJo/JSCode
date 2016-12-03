const express = require("express");
const router = express.Router();
const data = require("../data");
const commentData = data.comments;

router.get("/recipe/:recipeId", (req, res) => {
	commentData.getCommentsByRecipeId(req.params.recipeId).then((commentList) => {
		res.json(commentList);
	}).catch(() => {
		res.status(400).json({error: "Comments not found"});
	});
});

router.get("/:commentId", (req, res) => {
	commentData.getCommentsByCommentId(req.params.commentId).then((comment) => {
		res.json(comment);
	}).catch(() => {
		res.status(400).json({error: "Comment not found"});
	});
});

router.post("/:recipeId", (req, res) => {
	let commentInfo = req.body;
	
	if (!commentInfo){
		res.status(404).json({error: "You must provide data to create a comment"});
		return;
	}
	
	if (!commentInfo.poster){
		res.status(404).json({error: "You must provide a poster"});
		return;
	}
	
	if (!commentInfo.comment){
		res.status(404).json({error: "You must provide a comment"});
		return;
	}
	
	commentData.addComment(req.params.recipeId, commentInfo).then((newComment) => {
		res.json(newComment);
	}).catch((e) => {
		res.status(500).json({error: e});
	});
});

router.put("/:recipeId/:commentId", (req, res) => {
	let commentInfo = req.body;
	
	if (!commentInfo){
		res.status(404).json({error: "You must provide data to create a comment"});
		return;
	}
	
	if (!commentInfo.comment){
		res.status(404).json({error: "You must provide a comment"});
		return;
	}
	
	commentData.updateComment(req.params.recipeId, req.params.commentId, commentInfo.comment).then((updatedComment) => {
		res.json(updatedComment);
	}).catch((e) => {
		res.status(500).json({error: e});
	});
});

router.delete("/:id", (req, res) => {
	let comment = commentData.getCommentsByCommentId(req.params.id).then(() => {
		return commentData.removeComment(req.params.id).then(() => {
			res.sendStatus(200);
		}).catch(() => {
			res.sendStatus(500);
		});
	}).catch(() => {
		res.status(400).json({error: "Comment not found"});
	});
});

module.exports = router;