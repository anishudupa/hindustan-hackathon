import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	from: {
		type: String,
		required: true,
	},
	to: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
});

const Message = new mongoose.model("Message", messageSchema);
export default Message;
