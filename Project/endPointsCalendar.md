# Endpoints

### ClassEvent

#### 1. **GET** `api/v1/calendar/event` - Get Event List (#1)

> Requires a Bearer Token.

**Query Parameters:**
- `year` The year of the events. **(Required)**
- `month` The month of the events. **(Required)**
- `classId` The Id of the class the events are related to.

```javascript
{
    "events" : [
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
            "responsible" : [
                {
                    "id" : number,
                    "name" : string
                }
            ]
        },
        {}
    ]
}
```

### Event

#### 1. **GET** `api/v1/calendar/event/{id}` - Event Details (#9)

> Requires a Bearer Token.

**Response Example:**

```javascript
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
        "allClasses" : boolean
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
```

#### 2. **POST** `api/v1/calendar/event` - New Event (#8)

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

#### 3. **PATCH** `api/v1/calendar/event` - New Event (#10)

> Requires a Bearer Token.
> Requires Admin Permission.

**Request Body Example:**

```javascript
[
    {
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

## Event Type

#### 1. **GET** `api/v1/calendar/eventType` - Get Event Type List (#7)

**Response Example:**

```javascript
[
    {
        "id" : number
        "name" : string,
        "icon" : string,
        "disable" : boolean,
        "saturday" : boolean,
        "allDay" : boolean,
        "color" : string
    }
]
```


#### 2. **POST** `api/v1/calendar/eventType` - New Event Type (#6)
 

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
    "color" : string
}
```


## Subject

#### 1. **GET** `api/v1/calendar/subjects/byClass/{id}` - Get Class Subjects (#2)

**Request Body Example:**

> Requires a Bearer Token.

```javascript
[
    {
        "id" : number,
        "name" : string,
        "durationHours" : number,
        "totalHours" : number,
        "instructorId" : number | null
    }
]
```

## Rotas Reutilizadas

### #3 | Buscar turmas: GET `api/v1/classes`
### #4 | Buscar alunos: GET `api/v1/users/paginated?classId=`
### #5 | Buscar professores: GET `api/v1/users/teachers`
### #12 | Finalizar matéria: PATCH `api/v1/subjects/{id}`
