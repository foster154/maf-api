const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	date: {type: Date, default: Date.now},
	title: String,
  body: String,
	slug: {
		type: String,
		required: true,
		unique: true
	},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
});

PostSchema.method("update", function(updates, callback) {
	Object.assign(this, updates, {updatedAt: new Date()});
	this.save(callback);
});

const Post = mongoose.model("Post", PostSchema);

module.exports.Post = Post;