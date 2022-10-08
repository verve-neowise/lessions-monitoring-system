# Students

Route `/students`

> Permissions: `students`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all students

**`POST`** /

Create student
```json
{
    "userId": 12,
    "name": "Jalol",
    "surname": "Imomaddinov",
    "birthday": "08-09-1997",
    "phone": "99899565121"
}
```

**`PUT`** /:id

Update student
```json
{
    "name": "Jalol",
    "surname": "Imomaddinov",
    "birthday": "08-09-1997",
    "phone": "99899565121"
}
```

**`DELETE`** /:id

Delete student