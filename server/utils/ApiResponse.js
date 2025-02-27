class ApiResponse {
	status;
	data;
	statusCode;
	message;
	constructor(status = "SUCCESS", data, statusCode, message) {
		this.status = status;
		this.data = data;
		this.statusCode = statusCode;
		this.message = message;
	}
}

export default ApiResponse;
