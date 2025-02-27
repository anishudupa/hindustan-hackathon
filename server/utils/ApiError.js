class ApiError extends Error {
	apiMessage;
	statusCode;
	errors;
	stack;
	constructor(
		apiMessage = "Something went wrong",
		statusCode = 500,
		errors,
		stack = ""
	) {
		super(apiMessage);
		this.statusCode = statusCode;
		this.apiMessage = apiMessage;
		this.errors = errors;
		this.statusCode = statusCode;

		if (stack) this.stack = stack;
		else Error.captureStackTrace(this, this.constructor);
	}
}

export default ApiError;
