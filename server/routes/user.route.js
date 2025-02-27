import express from "express";
import bcrypt from "bcryptjs";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res
				.status(403)
				.json(new ApiResponse("error", {}, 403, "all fields are must"));
			return;
		}
		const userExist = await User.findOne({ email });
		if (userExist) {
			res.json(new ApiResponse("Error", {}, null, "user alreday exist"));
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({ email, password: hashedPassword });
		newUser.save();
		res.json(new ApiResponse("SUCCESS", {}, {}, "user created successfully"));
		return;
	} catch (error) {
		next(error);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res
				.status(403)
				.json(new ApiResponse(403, {}, 403, "all fields are must"));
			return;
		}

		const user = await User.findOne({ email });
		if (!user) {
			res.status(403).json(new ApiResponse("ERROR", {}, 403, "user not found"));
			return;
		}
		const truePass = await bcrypt.compare(password, user.password);
		if (!truePass) {
			res
				.status(403)
				.json(new ApiResponse("ERROR", {}, 403, "incorrect password"));
			return;
		}

		res.json(new ApiResponse("SUCCESS", {}, {}, "user logged in successfully"));
		return;
	} catch (error) {
		next(error);
	}
});

export default router;
