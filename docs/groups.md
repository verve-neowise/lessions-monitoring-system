# Groups

Route `/groups`

> Permissions: `groups`

> Header: `Authorization` : `<token>`

---

**`GET`** /

Get all groups

---

**`GET`** /:id

Get group details

---

**`POST`** /

Create group

```json
{
    "name": "Node.js 146",
    "months": 6,
    "directionId": 3 // Node.js
}
```

Response:

```json
{
    "message": "group created.",
    "group": {
        "id": 3,
        "name": "Node.js 148",
        "months": 6,
        "direction": {
            "id": 1,
            "name": "Backend Node.js",
            "status": "active"
        }
    }
}
```

---

**`PUT`** /:id

Update group

```json
{
    "name": "Node.js 146",
    "months": 6,
    "directionId": 3 // Node.js
}
```

Response:

```json
{
    "message": "Group updated.",
    "group": {
        "id": 3,
        "name": "Nodejs 148",
        "directionId": 1,
        "months": 6,
        "teacherId": null,
        "status": "active"
    }
}
```

---

**`DELETE`** /:id

Delete group

Response:

```json
{
    "message": "Group deleted.",
    "group": {
        "id": 3,
        "name": "Nodejs 148",
        "directionId": 1,
        "months": 6,
        "teacherId": null,
        "status": "deleted"
    }
}
```

---

**`GET`** /:id/teacher

Return group teacher

```json
{
    "message": "Group 'Node.js 147' teacher",
    "teacher": {
        "id": 2,
        "userId": 4,
        "name": "Xudashukur",
        "surname": "Madrimov",
        "birthday": "1997-08-08T19:00:00.000Z",
        "phone": "99899565121",
        "status": "active"
    }
}
```

---

**`PUT`** /:id/teacher

Change group teacher

```json
{
    "teacherId": 2
}
```

Response

```json
{
    "message": "Group teacher changed",
    "name": "Node.js 147",
    "teacher": {
        "id": 2,
        "name": "Xudashukur",
        "surname": "Madrimov"
    }
}
```

---

**`GET`** /:id/students

Get group students

Response

```json
{
    "message": "Group Node.js 146 students",
    "students": [
        {
            "id": 1,
            "userId": 7,
            "name": "Olimjon",
            "surname": "Makhmudov",
            "birthday": "1997-08-08T19:00:00.000Z",
            "phone": "99899565121",
            "status": "active"
        }
    ]
}
```

---

**`POST`** /:id/students

Add student to group

```json
{
    "studentId": 1
}
```

Response:

```json
{
    "message": "Student added to group"
}
```

---

**`DELETE`** /:id/students

Remove group student

```json
{
    "message": "Student remove from group"
}
```

---
