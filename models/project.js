const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	date: {type: Date, default: Date.now},
	title: String,
	slug: {
		type: String,
		required: true,
		unique: true
	},
	coverImage: String,
	summary: String,
	body: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now}
});

ProjectSchema.method("update", function(updates, callback) {
	Object.assign(this, updates, {updatedAt: new Date()});
	this.save(callback);
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports.Project = Project;