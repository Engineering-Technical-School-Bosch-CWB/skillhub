# Endpoints

### Login

#### 1. **POST** `/api/v1/login` - Login

**Request Body Example:**

```javascript
{
	"identification": string,
	"password": string
}
```

**Response Example:**
```javascript
{
	"data": {
		"firstLogin": boolean,
		"user": {
            "id": number,
            "name": string,
            "birthday": string | null,
            "positionId": number,
            "sectorId": number,
            "occupationAreaId": number,
            "permissionLevel": number,
            "studentProfile": {
                "overallScore": number,
				"overallSkillScore": number,
				"userId": number,
				"classId": number
            }
        },
		"authToken": {
			"token": string
		}
	},
	"message": "User needs to complete registration." | "User logged in successfully!"
}
```

### User
#### 1. **POST** `/api/v1/users` - Register user
> Requires a Bearer Token.

**Request Body Example:**

```javascript
{
    "sectorId": number,
    "positionId": number,
    "occupationAreaId": number,
    "name": string,
    "identification": string
}
```

**Response Example:**
```javascript
{
    "data": {
        "id": number,
        "name": string,
        "birthday": string | null,
        "positionId": number,
        "sectorId": number,
        "occupationAreaId": number,
        "permissionLevel": number,
        "studentProfile": {
            "overallScore": number,
			"overallSkillScore": number,
			"userId": number,
			"classId": number
        }
    },
    "message": "User created successfully!"
}

```

#### 2. **GET** `/api/v1/users/{id}` - Get User by ID
> Requires a Bearer Token.

**Response Example:**

```javascript
{
    "data": {
        "id": number,
        "name": string,
        "birthday": string | null,
        "positionId": number,
        "sectorId": number,
        "occupationAreaId": number,
        "permissionLevel": number,
        "studentProfile": {
            "overallScore": number,
			"overallSkillScore": number,
			"userId": number,
			"classId": number
        }
    },
    "message": "User found!"
}
```

#### 3. **DELETE** `/api/v1/users/{id} `- Delete User by ID
> Requires a Bearer Token.

**Response Example:**
- Status Code: 200
- No Response Body.

#### 4. **PATCH** `/api/v1/users/{id}` - Update User by ID
> Requires a Bearer Token.

**Request Body Example:**

```javascript
{
    "sectorId": number | null,
    "positionId": number | null,
    "occupationAreaId": number | null,
    "name": string | null,
    "identification": string | null,
    "birthday": string | null,
    "password": string | null
}
```

**Response Example:**

```javascript
{
    "data": {
        "id": number,
        "name": string,
        "birthday": string | null,
        "positionId": number,
        "sectorId": number,
        "occupationAreaId": number,
        "permissionLevel": number,
        "studentProfile": {
            "overallScore": number,
			"overallSkillScore": number,
			"userId": number,
			"classId": number
        }
    },
    "message": "User updated successfully!"
}
```

#### 5. **GET** `/api/v1/users/paginated` - Get Paginated Users
> Requires a Bearer Token.

**Query Parameters:**
- `page` The page number to retrieve.
- `items` The number of users per page.
- `query` A search query to filter the users by name.
- `birthMonth` A filter to get users born in a specific month.

**Response Example:**
```javascript
{
  "data": [
    {
        "id": number,
        "name": string,
        "birthday": string | null,
        "positionId": number,
        "sectorId": number,
        "occupationAreaId": number,
        "permissionLevel": number,
        "studentProfile": {
            "overallScore": number,
			"overallSkillScore": number,
			"userId": number,
			"classId": number
        }
    }
  ],
  "info": {
        "items": number,
        "currentPage": number,
        "totalPages": number
    } | null,
  "message": "Users found!"
}
```

### Position

#### 1. **GET** `/api/v1/position/{id}` - Get Position by ID
> Requires a Bearer Token.

**Response Example:**
```javascript
{
    "data": {
        "id": number,
        "name": string,
        "positionLevel": number
    },
    "message": "Position found!"
}
```

#### 2. **GET** `/api/v1/position` - Get Paginated Positions
> Requires a Bearer Token.

**Query Parameters:**
- `page` The page number to retrieve.
- `items` The number of positions per page.

**Response Example:**
```javascript
{
    "data": [
      {
          "id": number,
          "name": string,
          "positionLevel": number
      }
    ],
    "info": {
        "items": number,
        "currentPage": number,
        "totalPages": number
    } | null,
    "message": "Positions found!"
}
```

#### 3. **POST** `/api/v1/position` - Create a New Position
> Requires a Bearer Token.

**Request Body Example:**
```javascript
{
    "name": string,
    "positionLevel": number
}
```

**Response Example:**
```javascript
{
    "data": {
        "id": number,
        "name": string,
        "positionLevel": number
    },
    "message": "Position created successfully!"
}
```

#### 4. **DELETE** `/api/v1/position/{id} `- Delete Position by ID
> Requires a Bearer Token.

**Response Example:**
- Status Code: 200
- No Response Body.

#### 4. **PATCH** `/api/v1/position/{id}` - Update Position by ID
> Requires a Bearer Token.

**Request Body Example:**

```javascript
{
    "name": string | null,
    "positionLevel": string | null,
}
```

**Response Example:**

```javascript
{
    "data": {
        "id": number,
        "name": string,
        "positionLevel": number,
    },
    "message": "Position updated successfully!"
}
```
