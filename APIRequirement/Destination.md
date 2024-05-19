**User API requirement**

I. User permission

1. Home page destinations

- Request: GET `server.com/api/destination/home`

  - Response:

    ```json
    {
    	"status": 200,
    	"message": "Success",
    	"data": [
    		{
    			"id": 10000001,
    			"name": "Paris",
    			"address": "Paris, France",
    			"image": "https://example.com/paris.jpg",
    			"rating": 4.5
    		},
    		{
    			"id": 10000002,
    			"name": "New York",
    			"address": "New York, USA",
    			"image": "https://example.com/newyork.jpg",
    			"rating": 4.8
    		}
    	]
    }
    ```

  - Requirement: Return 10 newest destinations

2. Destination page

- Request: GET `server.com/api/destination/list`

  - Parameters: (Optional)

    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 12)
    - `search`: Search by name
    - `location`: Filter by location (Hai Chau, Cam Le, ...)
    - `costFrom`: Filter by cost from
    - `costTo`: Filter by cost to
    - `ratingFrom`: Filter by rating from
    - `ratingTo`: Filter by rating to
    - `sortBy`: Sort by (price, rating, name, created_at) (Default: created_at)
    - `sortType`: Sort type (asc, desc) (Default: asc)

  - Example: `server.com/api/destination/list?page=1&limit=12&search=Paris&location=Hai%20Chau&costFrom=100&costTo=200&ratingFrom=4&ratingTo=5&sortBy=price&sortType=asc`

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

- Request: GET `server.com/api/destination/detail/:id`

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

- Request: GET `server.com/api/destination/review/:id`
  - Parameters: (Optional)
    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 3)
    - `sortBy`: Sort by (rating, created_at) (Default: created_at)
    - `sortType`: Sort type (asc, desc) (Default: desc)
  - Example: `server.com/api/destination/review/10000001?page=1&limit=3&sortBy=rating&sortType=desc`

5. Create review with token

- Request: POST `server.com/api/destination/review`

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

- Request: PUT `server.com/api/destination/favorite/:id`

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

II. Admin permission

1. Create destination with token

- Request: POST `server.com/api/destination/create`

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

2. Update destination with token

- Request: PUT `server.com/api/destination/update/:id`

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

3. Delete destination with token

- Request: DELETE `server.com/api/destination/delete/:id`

  > `:id` is destination ID

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Destination deleted"
  }
  ```

  - Requirement: Admin must be authenticated
