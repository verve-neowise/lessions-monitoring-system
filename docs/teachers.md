# Teachers

Route `/teachers`

> Permissions: `teachers`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all teachers

---

**`GET`** /:id

Get teacher details

Response:
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
    }
  ]
}
```
---

**`POST`** /

Create teacher
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
---

**`PUT`** /:id

Update teacher
```json
{
    "name": "Jalol",
    "surname": "Imomaddinov",
    "birthday": "08-09-1997",
    "phone": "99899565121"
}
```
---

**`DELETE`** /:id

Delete teacher

---

**`GET`** /:id/groups

Get teacher groups

---


**`GET`** /:id/directions

Get teacher directions

---

**`POST`** /:id/directions

Add teacher direction
```json
{
    "directionId": 0
}
```
---

**`DELETE`** /:id/directions/:id

Delete teacher direction

