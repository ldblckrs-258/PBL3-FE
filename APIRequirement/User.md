**User API requirement**

0. Token payload

```json
{
	"id": 10000001, // Registered claim: Subject (user ID)
	"role": "user", // Private claim: User role
	"iat": 1500000000, // Registered claim: Issued at (timestamp)
	"exp": 1600000000 // Registered claim: Expiration time (timestamp)
}
```

1. Login

- Request: POST `http://server.com/api/login`

  ```json
  {
  	"email": "example@email.com",
  	"password": "123456"
  }
  ```

- Response:

  - HttpCookie: `token` with expiration time

  ```json
  {
  	"status": 200,
  	"message": "Login successful",
  	"data": {
  		"id": 10000001,
  		"name": "John Doe",
  		"avatar": "https://example.com/avatar.jpg",
  		"email": "example@email.com",
  		"role": "user"
  	}
  }
  ```

2. Register

- Request: POST `http://server.com/api/register`

  ```json
  {
  	"name": "John Doe",
  	"email": "example@email.com",
  	"password": "123456"
  }
  ```

- Response:

  ```json
  {
  	"status": 201,
  	"message": "Register successful"
  }
  ```

3. Authenticated user by token

- Request: GET `http://server.com/api/user`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Authenticated",
  	"data": {
  		"id": 10000001,
  		"name": "John Doe",
  		"avatar": "https://example.com/avatar.jpg",
  		"email": "example@email.com",
  		"role": "user"
  	}
  }
  ```

4. Get user data by token

- Request: GET `http://server.com/api/user/data`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Get user data successful",
  	"data": {
  		"id": 10000001,
  		"name": "John Doe",
  		"avatar": "https://example.com/avatar.jpg",
  		"email": "example@email.com",
  		"role": "user",
  		"dateOfBirth": "2024-05-19T03:31:09.229Z" // Datetime string in ISO 8601 format
  	}
  }
  ```

5. Update user data by token

- Request: PUT `http://server.com/api/user/data`

  ```json
  {
  	"name": "John Doe",
  	"avatar": "https://example.com/avatar.jpg",
  	"dateOfBirth": "2024-05-19T03:31:09.229Z"
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Update user data successful"
  }
  ```

6. Change password by token

- Request: PUT `http://server.com/api/user/password`

  ```json
  {
  	"oldPassword": "123456",
  	"newPassword": "654321"
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Change password successful"
  }
  ```

7. Example failed response

- Response: Wrong request format or missing required fields

  ```json
  {
  	"status": 400,
  	"message": "Bad request"
  }
  ```

- Response: Unauthorized while accessing protected resources

  ```json
  {
  	"status": 401,
  	"message": "Unauthorized"
  }
  ```

- Response: Forbidden while accessing restricted resources

  ```json
  {
  	"status": 403,
  	"message": "Forbidden"
  }
  ```

- Response: Not found while accessing non-existent resources

  ```json
  {
  	"status": 404,
  	"message": "Not found"
  }
  ```
