# Students

Route `/students`

> Permissions: `students`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all students

-----

**`POST`** /

Create student
```json
{
    "username": "neowise",
    "password": "1234",
    "name": "Jalol",
    "surname": "Imomaddinov",
    "birthday": "08-09-1997",
    "phone": "99899565121"
}
```

-----

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

-----

**`DELETE`** /:id

Delete student

-----

**`GET`** /:id

Student details

-----


**`GET`** /:id/groups

Student groups

-----