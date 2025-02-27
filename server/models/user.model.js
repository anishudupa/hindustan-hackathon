import mongoose from "mongoose";
import Item from "./item.model.js";
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		orders: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Item",
		},
		sales: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Item",
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
