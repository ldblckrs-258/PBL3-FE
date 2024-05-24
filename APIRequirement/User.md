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

I. User permission

1. Login

- HTTP POST `http://server.com/api/login`

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

- HTTP POST `http://server.com/api/register`

  ```json
  {
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

  - Auto generate default `dateOfBirth` & `name` like `User 10000001`
  - Also save `create_at`

3. Authenticated user by token

- HTTP GET `http://server.com/api/user`

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

- HTTP GET `http://server.com/api/user/data`

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

- HTTP PUT `http://server.com/api/user/data`

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

- HTTP PUT `http://server.com/api/user/password`

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

II. Admin permission

1. User list with token for admin to manage

- HTTP GET `http://server.com/api/user/managelist`

  - Parameters: (Optional)

    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 15)
    - `search`: Search by name
    - `role`: Filter by role (user, admin, all) (Default: user)
    - `sortBy`: Sort by (name, created_at) (Default: created_at)
    - `sortType`: Sort type (asc, desc) (Default: desc)

  - Example: `http://server.com/api/user/managelist?page=1&limit=12&search=John&role=user&sortBy=name&sortType=asc`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": {
  		"total": 100,
  		"page": 1,
  		"limit": 12,
  		"items": [
  			{
  				"id": 10000001,
  				"name": "John Doe",
  				"email": "example@email.com",
  				"createdAt": "2024-05-19T03:31:09.229Z", // Datetime string in ISO 8601 format
  				"role": "user"
  			},
  			{
  				"id": 10000002,
  				"name": "Jane Doe",
  				"email": "example@email.com",
  				"createdAt": "2024-05-19T03:31:09.229Z", // Datetime string in ISO 8601 format
  				"role": "admin"
  			}
  		]
  	}
  }
  ```

  - Requirement: Admin must be authenticated

2. Update user role by token

- HTTP PUT `http://server.com/api/user/update/:id`

  > `:id` is user ID

  ```json
  {
  	"role": "admin"
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Update user role successful"
  }
  ```

  - Requirement: Admin must be authenticated

3. Delete user by token

- HTTP DELETE `http://server.com/api/user/delete/:id`

  > `:id` is user ID

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Delete user successful"
  }
  ```

  - Requirement: Admin must be authenticated

4. Example failed response

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
