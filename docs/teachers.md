# Teachers

Route `/teachers`

> Permissions: `teachers`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all teachers

Response
```json
{
  "message": "All teachers",
  "teachers": [
    {
      "id": 1,
      "userId": 3,
      "username": "neowise",
      "name": "Jalol",
      "surname": "Imomaddinov",
      "birthday": "1997-08-08T19:00:00.000Z",
      "phone": "99899565121",
      "groups": [],
      "directions": [
        {
          "id": 1,
          "name": "Backend Node.js"
        }
      ]
    },
    {
      "id": 2,
      "userId": 4,
      "username": "madrimov",
      "name": "Xudashukur",
      "surname": "Madrimov",
      "birthday": "1997-08-08T19:00:00.000Z",
      "phone": "99899565121",
      "groups": [],
      "directions": [
        {
          "id": 1,
          "name": "Backend Node.js"
        }
      ]
    }
  ]
}
```

---

**`GET`** /:id

Get teacher details

Response:
```json
{
  "message": "Not implemented"
}
```
---

**`POST`** /

Create teacher
```json
{
    "username": "alimov",
    "password": "1234",
    "name": "Kamron",
    "surname": "Alimov",
    "birthday": "08-09-1997",
    "phone": "99899565121",
    "directions": [1, 2]
}
```
Response

```json
{
  "message": "teacher created.",
  "teacher": {
    "id": 3,
    "name": "Kamron",
    "surname": "Alimov",
    "username": "alimov",
    "permissions": [
      "directions",
      "groups",
      "profile",
      "students",
      "teachers"
    ],
    "role": "teacher"
  }
}
```

---

**`PUT`** /:id

Update teacher
```json
{
    "username": "neowise",
    "password": "1234",
    "name": "Jalol",
    "surname": "Imomaddinov",
    "birthday": "08-09-1997",
    "phone": "99899565121",
    "directions": [1, 2]
}
```

Response

```json
{
  "message": "Teacher updated.",
  "teacher": {
    "id": 1,
    "userId": 3,
    "username": "madrimov2",
    "name": "Xudashukur",
    "surname": "Madrimov",
    "birthday": "1997-08-08T19:00:00.000Z",
    "phone": "1997-08-08T19:00:00.000Z",
    "role": "teacher"
  }
}
```
---

**`DELETE`** /:id

Delete teacher

Response
```json
{
  "message": "Teacher deleted.",
  "teacher": {
    "id": 1,
    "userId": 3,
    "name": "Jalol",
    "surname": "Imomaddinov",
    "birthday": "1997-08-08T19:00:00.000Z",
    "phone": "99899565121",
    "status": "deleted"
  }
}
```
---

**`GET`** /:id/groups

Get teacher groups

---


**`GET`** /:id/directions

Get teacher directions

Response

```json
{
  "message": "Teacher 2 directions",
  "directions": [
    {
      "id": 1,
      "name": "Backend Node.js",
      "status": "active"
    },
    {
      "id": 2,
      "name": "Node.js",
      "status": "deleted"
    }
  ]
}
```

---

**`POST`** /:id/directions

Add teacher direction
```json
{
    "directionId": 3
}
```

Response

```json
{
  "message": "Add direction 3 from teacher 2"
}
```
---

**`DELETE`** /:id/directions/:id

Delete teacher direction

Response
```json
{
  "message": "Teacher 2 direction 1 deleted."
}
```