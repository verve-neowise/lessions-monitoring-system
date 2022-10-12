# Groups

Route `/groups`

> Permissions: `groups`

> Header: `Authorization` : `<token>` 

-----

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
---

**`DELETE`** /:id

Delete group

---

**`GET`** /:id/teacher 

Return group teacher

---

**`PUT`** /:id/teacher 

Change group teacher

```json
{
    "teacherId": 0
}
```

---

**`GET`** /:id/students 

Get group students

---

**`POST`** /:id/students 

Add student to group

```json
{
    "studentId": 0
}
```
---

**`DELETE`** /:id/students

Remove group student

---

