**User API requirement**

I. User permission

1. Home page destinations

- Request: GET `http://server.com/api/destination/home`

  - Response:

    ```json
    {
    	"status": 200,
    	"message": "Success",
    	"data": [
    		{
    			"id": 10000001,
    			"name": "Golden Bridge",
    			"address": "Ba Na Hills, Da Nang, Vietnam",
    			"image": "https://example.com/goldenbridge.jpg",
    			"rating": 4.5
    		},
    		{
    			"id": 10000002,
    			"name": "Linh Ung Pagoda",
    			"address": "Son Tra Peninsula, Da Nang, Vietnam",
    			"image": "https://example.com/linhungpagoda.jpg",
    			"rating": 4.8
    		}
    	]
    }
    ```

  - Requirement: Return 10 newest destinations

2. Destination page

- Request: GET `http://server.com/api/destination/list`

  - Parameters: (Optional)

    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 12)
    - `search`: Search by name
    - `location`: Filter by location (Hai Chau, Cam Le, ...)
    - `costFrom`: Filter by cost from
    - `costTo`: Filter by cost to
    - `ratingFrom`: Filter by rating from
    - `ratingTo`: Filter by rating to
    - `isFavorite`: Filter by favorite (true, false)
    - `sortBy`: Sort by (price, rating, name, created_at) (Default: created_at)
    - `sortType`: Sort type (asc, desc) (Default: asc)

  - Example: `http://server.com/api/destination/list?page=1&limit=12&search=Paris&location=Hai%20Chau&costFrom=100&costTo=200&ratingFrom=4&ratingTo=5&sortBy=price&sortType=asc`

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
  				"name": "Golden Bridge",
  				"address": "Ba Na Hills, Da Nang, Vietnam",
  				"image": "https://example.com/goldenbridge.jpg",
  				"rating": 4.5,
  				"cost": 150,
  				"openTime": "8:00",
  				"closeTime": "17:00",
  				"tags": ["tag1", "tag2"],
  				"favorite": true
  			},
  			{
  				"id": 10000002,
  				"name": "Linh Ung Pagoda",
  				"address": "Son Tra Peninsula, Da Nang, Vietnam",
  				"image": "https://example.com/linhungpagoda.jpg",
  				"rating": 4.8,
  				"cost": 200,
  				"openTime": "8:00",
  				"closeTime": "17:00",
  				"tags": ["tag1", "tag2"],
  				"favorite": false
  			}
  		]
  	}
  }
  ```

  - Requirement: Return 12 items per page in default

3. Destination detail

- Request: GET `http://server.com/api/destination/detail/:id`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": {
  		"id": 10000001,
  		"information": {
  			"name": "Golden Bridge",
  			"localName": "Cầu Vàng",
  			"address": "Ba Na Hills, Da Nang, Vietnam",
  			"images": [
  				"https://example.com/goldenbridge1.jpg",
  				"https://example.com/goldenbridge2.jpg",
  				"https://example.com/goldenbridge3.jpg"
  			],
  			"cost": 150,
  			"openTime": "8:00",
  			"closeTime": "17:00",
  			"tags": ["tag1", "tag2"]
  		},
  		"introduction": "<p> ... </p>", // HTML content formatted
  		"googleMapUrl": "https://www.google.com/maps/example",
  		"generalReview": {
  			"rating": 4.5,
  			"totalReview": 100,
  			"detail": {
  				"5": 0.8,
  				"4": 0.15,
  				"3": 0.03,
  				"2": 0.01,
  				"1": 0.01
  			}
  		}
  	}
  }
  ```

  - Requirement: Return 5 reviews per page
  - Note: `generalReview.detail` is percentage of each rating

4. Get reviews by destination ID

- Request: GET `http://server.com/api/destination/review/:id`
  - Parameters: (Optional)
    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 3)
    - `sortBy`: Sort by (rating, created_at) (Default: created_at)
    - `sortType`: Sort type (asc, desc) (Default: desc)
  - Example: `http://server.com/api/destination/review/10000001?page=1&limit=3&sortBy=rating&sortType=desc`

5. Create review with token

- Request: POST `http://server.com/api/destination/review`

  ```json
  {
  	"destinationId": 10000001,
  	"rating": 4.5,
  	"comment": "Good place"
  }
  ```

- Response:

  ```json
  {
  	"status": 201,
  	"message": "Review created"
  }
  ```

  - Requirement: User must be authenticated

6. Update favorite destination with token

- Request: PUT `http://server.com/api/destination/favorite/:id`

  > `:id` is destination ID

  ```json
  {
  	"favorite": true
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Favorite updated"
  }
  ```

  - Requirement: User must be authenticated

7. Get random destinations

- Request: GET `http://server.com/api/destination/random`

  - Parameters: (Optional)
    - `limit`: Number of items (Default: 3)
  - Example: `http://server.com/api/destination/random?limit=3`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": [
  		{
  			"id": 10000011,
  			"name": "Golden Bridge",
  			"address": "Ba Na Hills, Da Nang, Vietnam",
  			"image": "https://example.com/goldenbridge.jpg",
  			"rating": 4.5
  		},
  		{
  			"id": 10000032,
  			"name": "Linh Ung Pagoda",
  			"address": "Son Tra Peninsula, Da Nang, Vietnam",
  			"image": "https://example.com/linhungpagoda.jpg",
  			"rating": 4.8
  		},
  		{
  			"id": 10000033,
  			"name": "My Khe Beach",
  			"address": "My Khe, Da Nang, Vietnam",
  			"image": "https://example.com/mykhebeach.jpg",
  			"rating": 4.7
  		}
  	]
  }
  ```

  - Requirement: Return 3 random destinations

II. Admin permission

1. Destination list with token for admin to manage

- Request: GET `http://server.com/api/destination/managelist`

  - Parameters: (Optional)

    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 15)
    - `search`: Search by name
    - `sortBy`: Sort by (rating, review, favorite, created_at) (Default: created_at)
    - `sortType`: Sort type (asc, desc) (Default: asc)

  - Example: `http://server.com/api/destination/managelist?page=1&limit=12&search=Paris&sortBy=rating&sortType=desc`

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
  				"name": "Golden Bridge",
  				"address": "Ba Na Hills, Da Nang, Vietnam",
  				"rating": 4.5,
  				"review": 100,
  				"favorite": 100,
  				"created_at": "2024-05-19T03:31:09.229Z" // Datetime string in ISO 8601 format
  			}
  		]
  	}
  }
  ```

  - Requirement: Admin must be authenticated

2. Create destination with token

- Request: POST `http://server.com/api/destination/create`

  ```json
  {
  	"name": "Golden Bridge",
  	"localName": "Cầu Vàng",
  	"address": "Ba Na Hills, Da Nang, Vietnam",
  	"googleMapUrl": "https://www.google.com/maps/example",
  	"cost": 150,
  	"openTime": "8:00",
  	"closeTime": "17:00",
  	"images": [
  		"https://example.com/goldenbridge1.jpg",
  		"https://example.com/goldenbridge2.jpg",
  		"https://example.com/goldenbridge3.jpg"
  	],
  	"tags": ["tag1", "tag2"],
  	"introduction": "<p> ... </p>" // HTML content formatted
  }
  ```

- Response:

  ```json
  {
  	"status": 201,
  	"message": "Destination created"
  }
  ```

  - Requirement: Admin must be authenticated
  - Note: also save `created_at` to sort destinations

3. Update destination with token

- Request: PUT `http://server.com/api/destination/update/:id`

  > `:id` is destination ID

  ```json
  {
  	"name": "Golden Bridge",
  	"localName": "Cầu Vàng",
  	"address": "Ba Na Hills, Da Nang, Vietnam",
  	"googleMapUrl": "https://www.google.com/maps/example",
  	"cost": 150,
  	"openTime": "8:00",
  	"closeTime": "17:00",
  	"images": [
  		"https://example.com/goldenbridge1.jpg",
  		"https://example.com/goldenbridge2.jpg",
  		"https://example.com/goldenbridge3.jpg"
  	],
  	"tags": ["tag1", "tag2"],
  	"introduction": "<p> ... </p>" // HTML content formatted
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Destination updated"
  }
  ```

  - Requirement: Admin must be authenticated

4. Delete destination with token

- Request: DELETE `http://server.com/api/destination/delete/:id`

  > `:id` is destination ID

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Destination deleted"
  }
  ```

  - Requirement: Admin must be authenticated
