const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LearningItemSchema = new Schema({
	date: {type: Date, default: Date.now},
	text: String,
	subtext: String,
	image: String,
	url: String,
	tags: [ String ],
	status: Number
});

LearningItemSchema.method("update", function(updates, callback) {
	Object.assign(this, updates, {updatedAt: new Date()});
	this.save(callback);
});

const LearningItem = mongoose.model("LearningItem", LearningItemSchema);

module.exports.LearningItem = LearningItem;