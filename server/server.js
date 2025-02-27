import http from "node:http";
import express from "express";
import cors from "cors";
import ApiResponse from "./utils/ApiResponse.js";
import ApiError from "./utils/ApiError.js";
import connectDb from "./db/connect.js";
import userRoutes from "./routes/user.route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/v1", (_, res) => {
	res.json(new ApiResponse("SUCCESS", {}, 200, "hi from api"));
});
app.use("/api/v1/user", userRoutes);
app.use((err, req, res, next) => {
	if (err instanceof ApiError) {
		console.log("reached here");
		res
			.status(400)
			.json(new ApiResponse("ERROR", null, err.statusCode, err.apiMessage));
	} else {
		res.status(500).json({ message: "Server error" });
	}
});

const server = http.createServer(app);
(async function main() {
	await connectDb();
	server.listen(process.env.PORT ?? 8000, () => console.log("Server running"));
})();
