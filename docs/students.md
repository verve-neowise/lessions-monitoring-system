# Students

Route `/students`

> Permissions: `students`

> Header: `Authorization` : `<token>`

---

**`GET`** /

Get all students

Response:

```json
{
    "message": "All students",
    "students": [
        {
            "id": 1,
            "userId": 7,
            "username": "olimjon",
            "name": "Olimjon",
            "surname": "Makhmudov",
            "birthday": "1997-08-08T19:00:00.000Z",
            "phone": "99899565121",
            "groups": []
        },
        {
            "id": 2,
            "userId": 8,
            "username": "farrux2",
            "name": "Farrux",
            "surname": "Anime Creator",
            "birthday": "1997-08-08T19:00:00.000Z",
            "phone": "99899565121",
            "groups": []
        }
    ]
}
```

---

**`POST`** /

Create student

```json
{
    "username": "farrux",
    "password": "1234",
    "name": "Farrux",
    "surname": "Anime",
    "birthday": "08-09-1997",
    "phone": "99899565121"
}
```

Response

```json
{
    "message": "student created.",
    "student": {
        "id": 2,
        "userId": 8,
        "username": "farrux",
        "name": "Farrux",
        "surname": "Anime",
        "birhtday": "1997-08-08T19:00:00.000Z",
        "phone": "99899565121",
        "permissions": ["profile", "students"],
        "role": "student"
    }
}
```

---

**`PUT`** /:id

Update student

```json
{
    "username": "farrux2",
    "password": "",
    "name": "Farrux",
    "surname": "Anime Creator",
    "birthday": "08-09-1997",
    "phone": "99899565121"
}
```

Response

```json
{
    "message": "Student updated.",
    "student": {
        "id": 2,
        "userId": 8,
        "username": "farrux2",
        "name": "Farrux",
        "surname": "Anime Creator",
        "birthday": "1997-08-08T19:00:00.000Z",
        "phone": "99899565121",
        "role": "student"
    }
}
```

---

**`DELETE`** /:id

Delete student

Response:

```json
{
    "message": "Student deleted.",
    "student": {
        "id": 2,
        "userId": 8,
        "name": "Farrux",
        "surname": "Anime Creator",
        "birthday": "1997-08-08T19:00:00.000Z",
        "phone": "99899565121",
        "status": "deleted"
    }
}
```

---

**`GET`** /:id

Student details

```json
{
    "message": "Not implemented"
}
```

---

**`GET`** /:id/groups

Student groups

```json

```

---
