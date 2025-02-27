import mongoose from "mongoose";
import User from "./user.model.js";

const itemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		seelingPrice: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ["SOLD", "IN-SALE"],
		},
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
