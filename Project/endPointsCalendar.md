# Endpoints

### ClassEvent
#### 1. **GET** `SkillHub/api/v1/calendar/event` - Get Event List (#1)

> Requires a Bearer Token.

**Query Parameters:**
- `year` The year of the events. **(Required)**
- `month` The month of the events. **(Required)**
- `classId` The Id of the class the events are related to.

```javascript
{
    "subjects" : [
        {
            "id" : number,
            "name" : string,
            "durationHours" : number,
            "totalHours" : number,
            "instructorId" : number | null
        }
    ]
    "events" : 
    [
        {
            "id" : number,
            "subjectId" : number | null,
            "startDate" : Date,
            "endDate" : Date,
            "name" : string,
            "movable" : boolean,
            "type" : {
                "name" : string,
                "icon" : string,
                "disable" : boolean,
                "saturday" : boolean,
                "allDay" : boolean,
                "color" : string
            },
            "members" : [
                {
                    "id" : number,
                    "name" : string,
                    "isResponsible" : boolean
                }
            ],
            "classes" : [
                {
                    "id" : number,
                    "name" : string,
                    "abbreviation" : string | null
                    "subjectId" : number | null
                }
            ],
        },
    ]
}
```

### Event

#### 1. **POST** `SkillHub/api/v1/calendar/event` - New Event (#2)

> Requires a Bearer Token.
> Requires Admin Permission.

**Request Body Example:**

```javascript
[
    {
        "name" : string,
        "description" : string,
        "startDate" : Date,
        "endDate" : Date,
        "type" : number,
        "movable" : boolean,
        "subjectId" : number | null
        "classes" : number[]
        "members" : [
            {
                "id" : number
                "isResponsible" : boolean
            }
        ]
    }
]
```

#### 2. **PATCH** `SkillHub/api/v1/calendar/event` - New Event (#3)

> Requires a Bearer Token.
> Requires Admin Permission.

**Request Body Example:**

```javascript
[
    {
        "id" : number,
        "name" : string | null,
        "description" : string | null,
        "startDate" : Date | null,
        "endDate" : Date | null,
        "type" : number | null,
        "movable" : boolean | null,
        "classes" : number[]
        "members" : [
            {
                "id" : number
                "isResponsible" : boolean
            } 
        ]
    }
]
```

#### 3. **DELETE** `SkillHub/api/v1/calendar/event/{id}` - Delete Event (#4)

> Requires a Bearer token.  
> Requires Admin permission


### EventMember

#### 1. **GET** `SkillHub/api/v1/calendar/eventMember/week` - Get a month's events and teachers by occupation area (#5)

> Requires a Bearer Token.  
> Requires Admin Permission.

**Query Parameters:**
- `year` The year of the events. **(Required)**
- `month` The month of the events. **(Required)**
- `occupationAreaId` The Id of the occupation area of the teachers, returns all if null

```javascript
{
    teachers: [
        {
            "id" : number,
            "name" : string
            "events": [
                {
                    "id" : number,
                    "startDate" : Date,
                    "endDate" : Date,
                    "name" : string,
                    "description" : string,
                    "movable" : boolean,
                    "type" : {
                        "id" : number,
                        "name" : string,
                        "icon" : string | null,
                        "disable" : boolean,
                        "saturday" : boolean,
                        "allDay" : boolean,
                        "allClasses" : boolean,
                        "color" : string | null
                    },
                    "members" : [
                        {
                            "id" : number,
                            "name" : string,
                            "responsible" : boolean
                        }
                    ],
                    "classes" : [
                        {
                            "id" : number,
                            "name" : string,
                            "abbreviation" : string | null
                            "subjectId" : number | null
                        }
                    ],
                }
            ]
        },
    ]
}
```

### Event Type

#### 1. **GET** `SkillHub/api/v1/calendar/eventType` - Get Event Type List (#7)

> Requires a Bearer Token.  
> Requires Admin Permission.

**Response Example:**

```javascript
[
    {
        "id" : number
        "name" : string,
        "icon" : string,
        "disable" : boolean,
        "saturday" : boolean.
        "allDay" : boolean,
        "allClasses" : boolean,
        "color" : string
    }
]
```

#### 2. **POST** `SkillHub/api/v1/calendar/eventType` - New Event Type (#6)
 
**Request Body Example:**

> Requires a Bearer Token.  
> Requires Admin Permission.

```javascript
{
    "name" : string,
    "icon" : string,
    "disable" : boolean,
    "saturday" : boolean,
    "allDay" : boolean,
    "allClasses" : boolean,
    "color" : string
}
```

#### 3. **PATCH** `SkillHub/api/v1/calendar/eventType/{id}` - Update Event Type (#8)
 
**Request Body Example:**

> Requires a Bearer Token.
> Requires Admin Permission.

```javascript
{
    "name" : string,
    "icon" : string,
    "disable" : boolean,
    "saturday" : boolean,
    "allDay" : boolean,
    "allClasses" : boolean,
    "color" : string
}
```

#### 4. **DELETE** `SkillHub/api/v1/calendar/eventType/{id}` - Delete Event Type (#9)
 
> Requires a Bearer Token.
> Requires Admin Permission.