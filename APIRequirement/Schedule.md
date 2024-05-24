**Schedule API Requirement**

0. Note

- Schedule.status: `planning`, `ongoing`, `completed`, `canceled`

1. Get my schedule list by token

- HTTP GET `http://server.com/api/schedule/myschedule`

  - Parameters: (Optional)
    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 5)
    - `search`: Search by title
    - `status`: Filter by status (planning, ongoing, completed, canceled, all) (Default: all)
    - `sortBy`: Sort by (title, startDate, updatedAt) (Default: start_date)
    - `sortType`: Sort type (asc, desc) (Default: desc)
  - Example: `http://server.com/api/schedule/myschedule?page=1&limit=5&search=Japan&status=planning&sortBy=start_date&sortType=asc`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": {
  		"total": 100,
  		"page": 1,
  		"limit": 5,
  		"items": [
  			{
  				"id": 10000001,
  				"status": "planning",
  				"title": "5-Day Itinerary: Unveiling the Coastal Charm of Central Vietnam",
  				"description": "Discover the beauty of Central Vietnam with this 5-day itinerary. From the ancient town of Hoi An to the bustling city of Da Nang, this trip will take you to some of the most beautiful places in the region.",
  				"destinations": [
  					"Hoi An",
  					"My Khe Beach",
  					"Marble Mountains",
  					"Golden Bridge",
  					"Ba Na Hills"
  				],
  				"startDate": "2021-12-01",
  				"totalDays": 5,
  				"totalBudget": 500,
  				"updatedAt": "2024-05-19T03:31:09.229Z"
  			},
  			{
  				"id": 10000002,
  				"status": "ongoing",
  				"title": "10-Day Adventure: Exploring the Wonders of Northern Vietnam",
  				"description": "Embark on a 10-day adventure to explore the wonders of Northern Vietnam. From the bustling streets of Hanoi to the stunning landscapes of Ha Long Bay, this trip will take you on a journey through the heart of the country.",
  				"destinations": [
  					"Ba Na Hills",
  					"Dragon Bridge",
  					"Son Tra Peninsula",
  					"My Khe Beach",
  					"Marble Mountains"
  				],
  				"startDate": "2021-11-15",
  				"totalDays": 10,
  				"totalBudget": 1000,
  				"updatedAt": "2024-05-19T03:31:09.229Z"
  			}
  		]
  	}
  }
  ```

  - Requirement: User must be authenticated
  - Default `isPublic` is `false`

2. Get public shared schedule list

- HTTP GET `http://server.com/api/schedule/sharedlist`

  - Parameters: (Optional)
    - `page`: Number of page (Default: 1)
    - `limit`: Number of items per page (Default: 5)
    - `search`: Search by title
    - `sortBy`: Sort by (title, totalDays, totalBudget) (Default: start_date)
    - `sortType`: Sort type (asc, desc) (Default: desc)
  - Example: `http://server.com/api/schedule/sharedlist?page=1&limit=5&search=Vietnam&sortBy=totalDays&sortType=asc`

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": {
  		"total": 100,
  		"page": 1,
  		"limit": 5,
  		"items": [
  			{
  				"id": 10000001,
  				"title": "7-Day Itinerary: Exploring the Hidden Gems of Vietnam",
  				"description": "Embark on a 7-day adventure to explore the hidden gems of Vietnam. From the ancient town of Hoi An to the stunning landscapes of Ha Long Bay, this trip will take you on a journey through the heart of the country.",
  				"destinations": [
  					"Ba Na Hills",
  					"Dragon Bridge",
  					"Son Tra Peninsula",
  					"My Khe Beach",
  					"Marble Mountains"
  				],
  				"totalDays": 7,
  				"totalBudget": 700,
  				"creator": "John Doe"
  			},
  			{
  				"id": 10000002,
  				"title": "10-Day Adventure: Exploring the Wonders of Northern Vietnam",
  				"description": "Embark on a 10-day adventure to explore the wonders of Northern Vietnam. From the bustling streets of Hanoi to the stunning landscapes of Ha Long Bay, this trip will take you on a journey through the heart of the country.",
  				"destinations": [
  					"Ba Na Hills",
  					"Dragon Bridge",
  					"Son Tra Peninsula",
  					"My Khe Beach",
  					"Marble Mountains"
  				],
  				"totalDays": 10,
  				"totalBudget": 1000,
  				"creator": "Jane Doe"
  			}
  		]
  	}
  }
  ```

  - Requirement: Publicly shared schedules

3. Get schedule detail by ID with token

- HTTP GET `http://server.com/api/schedule/detail/:id`

  > `:id` is schedule ID

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Success",
  	"data": {
  		"id": 10000001,
  		"status": "planning",
  		"title": "5-Day Itinerary: Unveiling the Coastal Charm of Central Vietnam",
  		"description": "Discover the beauty of Central Vietnam with this 5-day itinerary. From the ancient town of Hoi An to the bustling city of Da Nang, this trip will take you to some of the most beautiful places in the region.",
  		"startDate": "2021-12-01",
  		"totalDays": 5,
  		"numbOfDes": 5,
  		"totalBudget": 500,
  		"updatedAt": "2024-05-19T03:31:09.229Z",
  		"creator": "John Doe",
  		"isPublic": false,
  		"days": [
  			{
  				"date": "2021-12-01",
  				"destinations": [
  					{
  						"id": 90000001, // Schedule destination ID
  						"desId": 10000001,
  						"name": "Golden Bridge",
  						"address": "Ba Na Hills, Da Nang, Vietnam",
  						"arrivalTime": "09:00",
  						"leaveTime": "11:00",
  						"budget": 50,
  						"note": "Don't forget to take a photo at the Golden Bridge."
  					},
  					{
  						"id": 90000002, // Schedule destination ID
  						"desId": 10000001,
  						"name": "Golden Bridge",
  						"address": "Ba Na Hills, Da Nang, Vietnam",
  						"arrivalTime": "09:00",
  						"leaveTime": "11:00",
  						"budget": 50,
  						"note": "Don't forget to take a photo at the Golden Bridge."
  					}
  				]
  			},
  			{
  				"date": "2021-12-02",
  				"destinations": [
  					{
  						"id": 90000003, // Schedule destination ID
  						"desId": 10000002,
  						"name": "Marble Mountains",
  						"address": "Hoa Hai, Ngu Hanh Son, Da Nang, Vietnam",
  						"arrivalTime": "09:00",
  						"leaveTime": "11:00",
  						"budget": 50,
  						"note": "Explore the caves and pagodas in the Marble Mountains."
  					}
  				]
  			} // ...
  		]
  	}
  }
  ```

  - Requirement: User must be authenticated

4. Create new schedule by token

- HTTP POST `http://server.com/api/schedule/create`

  ```json
  {
  	"title": "7-Day Itinerary: Exploring the Hidden Gems of Vietnam",
  	"description": "Embark on a 7-day adventure to explore the hidden gems of Vietnam. From the ancient town of Hoi An to the stunning landscapes of Ha Long Bay, this trip will take you on a journey through the heart of the country.",
  	"isPublic": false
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Create schedule successful",
  	"data": {
  		"id": 10000001
  	}
  }
  ```

  - Requirement: User must be authenticated

5. Clone public schedule by token

- HTTP POST `http://server.com/api/schedule/clone/:id`

  > `:id` is schedule ID

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Clone schedule successful",
  	"data": {
  		"id": 10000002
  	}
  }
  ```

6. Add schedule destination by token

- HTTP POST `http://server.com/api/schedule/adddestination`

  ```json
  {
  	"scheduleId": 10000001,
  	"destinationId": 10000001,
  	"date": "2021-12-01",
  	"arrivalTime": "09:00",
  	"leaveTime": "11:00",
  	"budget": 50,
  	"note": "Don't forget to take a photo at the Golden Bridge."
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Add destination to schedule successful",
  	"data": {
  		"id": 90000001 // Schedule destination ID
  	}
  }
  ```

  - Requirement: User must be authenticated, only creator can add destination

7. Remove schedule destination by token

- HTTP DELETE `http://server.com/api/schedule/removedestination/:id`

  > `:id` is schedule destination ID

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Remove destination from schedule successful"
  }
  ```

8. Update schedule destination by token

- HTTP PUT `http://server.com/api/schedule/updatedestination/:id`

  > `:id` is schedule destination ID

  ```json
  {
  	"date": "2021-12-01",
  	"arrivalTime": "09:00",
  	"leaveTime": "11:00",
  	"budget": 50,
  	"note": "Don't forget to take a photo at the Golden Bridge."
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Update destination in schedule successful"
  }
  ```

  - Requirement: User must be authenticated, only creator can update destination

9. Update schedule information by token

- HTTP PUT `http://server.com/api/schedule/update/:id`

  > `:id` is schedule ID

  ```json
  {
  	"title": "7-Day Itinerary: Exploring the Hidden Gems of Vietnam",
  	"description": "Embark on a 7-day adventure to explore the hidden gems of Vietnam. From the ancient town of Hoi An to the stunning landscapes of Ha Long Bay, this trip will take you on a journey through the heart of the country.",
  	"isPublic": false,
  	"status": "planning"
  }
  ```

- Response:

  ```json
  {
  	"status": 200,
  	"message": "Update schedule successful"
  }
  ```

  - Requirement: User must be authenticated, only creator can update schedule
