**Blog API Requirement**

I. User permission

0. Note

- Blog.type: `places`, `tips`, `all`
- Blog.status: `pending`, `published`, `rejected`

1. Blog home page

- Request: GET `http://server.com/api/blog/home`

  - Response:

    ```json
    {
    	"status": 200,
    	"message": "Success",
    	"data": [
    		{
    			"id": 10000001,
    			"title": "Top 10 best destinations in Vietnam",
    			"image": "https://example.com/top10bestdestinations.jpg",
    			"author": "John Doe",
    			"created_at": "2024-05-19T03:31:09.229Z"
    		},
    		{
    			"id": 10000002,
    			"title": "The most beautiful beaches in the world",
    			"image": "https://example.com/mostbeautifulbeaches.jpg",
    			"author": "Jane Doe",
    			"created_at": "2024-05-19T03:31:09.229Z"
    		}
    	]
    }
    ```

  - Requirement: Return 5 most viewed blogs

2. Blogs page

- Request: GET `http://server.com/api/blog/list`

  - Parameters: (Optional)

    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 5)
    - `search`: Search by title
    - `sortBy`: Sort by (title, views, created_at) (Default: created_at)
    - `sortType`: Sort type (asc, desc) (Default: desc)

  - Example: `http://server.com/api/blog/list?page=1&limit=5&search=Vietnam&sortBy=views&sortType=desc`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": [
  		{
  			"id": 10000001,
  			"title": "Top 10 best destinations in Vietnam",
  			"image": "https://example.com/top10bestdestinations.jpg",
  			"type": "places",
  			"author": {
  				"id": 10000001,
  				"name": "John Doe",
  				"avatar": "https://example.com/johndoe.jpg"
  			},
  			"created_at": "2024-05-19T03:31:09.229Z",
  			"views": 1000,
  			"introduction": "Vietnam is a beautiful country with many famous destinations. Here are the top 10 best destinations in Vietnam."
  		},
  		{
  			"id": 10000002,
  			"title": "First time traveling to Da Nang - Things you need to know",
  			"image": "https://example.com/firsttimetravelingtodanang.jpg",
  			"type": "tips",
  			"author": {
  				"id": 10000002,
  				"name": "Jane Doe",
  				"avatar": "https://example.com/janedoe.jpg"
  			},
  			"created_at": "2024-05-19T03:31:09.229Z",
  			"views": 800,
  			"introduction": "Da Nang is a beautiful city in Vietnam. Here are some tips for your first time traveling to Da Nang."
  		},
  		{
  			"id": 10000003,
  			"title": "Ultimate guide to travel to Da Nang",
  			"image": "https://example.com/ultimateguidetotraveltodanang.jpg",
  			"type": "all",
  			"author": {
  				"id": 10000001,
  				"name": "John Doe",
  				"avatar": "https://example.com/johndoe.jpg"
  			},
  			"created_at": "2024-05-19T03:31:09.229Z",
  			"views": 500,
  			"introduction": "Da Nang is a beautiful city in Vietnam. Here is the ultimate guide to travel to Da Nang."
  		}
  	]
  }
  ```

  - Requirement: Default return 5 most recent blogs

3. Random blogs

- Request: GET `http://server.com/api/blog/random`

  - Parameters: (Optional)
    - `limit`: Number of random blogs (Default: 5)
  - Example: `http://server.com/api/blog/random?limit=3`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": [
  		{
  			"id": 10000001,
  			"title": "Top 10 best destinations in Vietnam",
  			"type": "places",
  			"image": "https://example.com/top10bestdestinations.jpg",
  			"author": "John Doe",
  			"created_at": "2024-05-19T03:31:09.229Z"
  		},
  		{
  			"id": 10000002,
  			"title": "First time traveling to Da Nang - Things you need to know",
  			"type": "tips",
  			"image": "https://example.com/firsttimetravelingtodanang.jpg",
  			"author": "Jane Doe",
  			"created_at": "2024-05-19T03:31:09.229Z"
  		},
  		{
  			"id": 10000003,
  			"title": "Ultimate guide to travel to Da Nang",
  			"type": "all",
  			"image": "https://example.com/ultimateguidetotraveltodanang.jpg",
  			"author": "John Doe",
  			"created_at": "2024-05-19T03:31:09.229Z"
  		}
  	]
  }
  ```

  - Requirement: Default return 5 random blogs

4. Blog detail

- Request: GET `http://server.com/api/blog/:id`

  > `:id` is blog ID

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": {
  		"id": 10000001,
  		"title": "Top 10 best destinations in Vietnam",
  		"type": "places",
  		"author": {
  			"id": 10000001,
  			"name": "John Doe",
  			"avatar": "https://example.com/johndoe.jpg"
  		},
  		"created_at":
  		"views": 1000,
  		"content": "<p> ... </p>" // HTML content
  	}
  }
  ```

  - Requirement: Increase view count by 1 each time this API is called

5. Request create blog with token

- Request: POST `http://server.com/api/blog/create`

  ```json
  {
  	"title": "Top 10 best destinations in Vietnam",
  	"type": "places",
  	"image": "https://example.com/top10bestdestinations.jpg",
  	"introduction": "Vietnam is a beautiful country with many famous destinations. Here are the top 10 best destinations in Vietnam.",
  	"content": "<p> ... </p>" // HTML content
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": {
  		"id": 10000001
  	}
  }
  ```

  - Requirement: User must be authenticated
  - Default status: `pending`
  - Auto assign author

6. Update blog with token

- Request: PUT `http://server.com/api/blog/update/:id`

  > `:id` is blog ID

  ```json
  {
  	"title": "Top 10 best destinations in Vietnam",
  	"type": "places",
  	"image": "https://example.com/top10bestdestinations.jpg",
  	"introduction": "Vietnam is a beautiful country with many famous destinations. Here are the top 10 best destinations in Vietnam.",
  	"content": "<p> ... </p>" // HTML content
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success"
  }
  ```

  - Requirement: User must be authenticated, only author can update blog

7. Delete blog with token

- Request: DELETE `http://server.com/api/blog/delete/:id`

  > `:id` is blog ID

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success"
  }
  ```

  - Requirement: User must be authenticated, only author or admin can delete blog

II. Admin permission

1. Get blog list with token for admin to manage

- Request: GET `http://server.com/api/blog/managelist`

  - Parameters: (Optional)

    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 12)
    - `search`: Search by title
    - `type`: Filter by type (places, tips, all)
    - `status`: Filter by status (pending, published, rejected)
    - `sortBy`: Sort by (title, views, created_at) (Default: created_at)
    - `sortType`: Sort type (asc, desc) (Default: desc)

  - Example: `http://server.com/api/blog/managelist?page=1&limit=5&search=Vietnam&type=places&status=pending&sortBy=created_at&sortType=desc`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": [
  		{
  			"id": 10000001,
  			"title": "Top 10 best destinations in Vietnam",
  			"type": "places",
  			"author": "John Doe",
  			"created_at": "2024-05-19T03:31:09.229Z",
  			"status": "pending"
  		},
  		{
  			"id": 10000002,
  			"title": "First time traveling to Da Nang - Things you need to know",
  			"type": "tips",
  			"author": "Jane Doe",
  			"created_at": "2024-05-19T03:31:09.229Z",
  			"status": "published"
  		},
  		{
  			"id": 10000003,
  			"title": "Ultimate guide to travel to Da Nang",
  			"type": "all",
  			"author": "John Doe",
  			"created_at": "2024-05-19T03:31:09.229Z",
  			"status": "rejected"
  		}
  	]
  }
  ```

  - Requirement: Admin must be authenticated

2. Update blog status with token

- Request: PUT `http://server.com/api/blog/updatestatus/:id`

  > `:id` is blog ID

  ```json
  {
  	"status": "published"
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success"
  }
  ```

  - Requirement: Admin must be authenticated

3. Delete blog with token (Same as user permission)
