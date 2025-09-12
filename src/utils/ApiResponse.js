export class ApiResponse {
  constructor(statusCode, data = null, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // ✅ true only for 2xx–3xx
  }
}
