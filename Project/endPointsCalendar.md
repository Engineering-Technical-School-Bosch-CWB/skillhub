# Calendar (/calendar)



## Event
GET Event List: /event?month=class=
```
{
    events : [
        {
            id : number,
            subjectId : number | null,
            startDate : Date,
            endDate : Date,
            name : string,
            movable : boolean,
            type : {
                name : string,
                icon : string,
                disable : boolean,
                saturday : boolean,
                allDay : boolean,
                color : string
            },
            responsible : {
                id : number,
                name : string
            }[]
        },
        {}
    ]
}
```

GET Event Details: /event/(id)
```
{
    id : number,
    startDate : Date,
    endDate : Date,
    name : string,
    description : string,
    movable : boolean,
    type : {
        name : string,
        icon : string,
        disable : boolean,
        saturday : boolean,
        allDay : boolean,
        allClasses : boolean
        color : string
    },
    members : {
        id : number,
        name : string,
        responsible : boolean
    }[],
    classes : {
        id : number,
        abrev : string,
        subjectId : number | null
    }[],
}
```

POST New Event: /event
```
[
    {
        name : string,
        description : string,
        startDate : Date,
        endDate : Date,
        type : number,
        movable : boolean,
        classes : number[]
        members : {
            id : number
            isResponsible : boolean
        }[]
    }
]
```

## Subject
GET Class Subjects: /subjects/byClass/(id)
```
[
    {
        id : number,
        name : string,
        durationHours : number,
        totalHours : number,
        instructorId : number | null
    }
]
```

