# Admins

Route `/admins`

> Permissions: `admins`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all admins

-----

**`POST`** /

Create admin
```json
{
   "name": "Admin 1",
   "username": "admin1", 
   "password": "1234",
   "permissions": ["students"]
}
```

Response
```json
{
  "message": "Admin created.",
  "admin": {
    "id": 1,
    "userId": 2,
    "name": "Admin 1",
    "username": "admin1",
    "permissions": [
      "students"
    ],
    "role": "admin"
  }
}
```
-----

**`PUT`** /:id

Update admin
```json
{
   "name": "Admin 2",
   "username": "admin1", 
   "password": "12345",
   "permissions": ["students", "dashboard"]
}
```
Response
```json
{
  "message": "Admin updated.",
  "admin": {
    "id": 1,
    "userId": 2,
    "name": "Admin 2",
    "username": "admin1",
    "permissions": [
      "students",
      "dashboard"
    ],
    "role": "admin"
  }
}
```

-----

**`DELETE`** /:id

Delete admin

Response
```json
{
  "message": "Admin deleted.",
  "admin": {
    "id": 1,
    "userId": 2,
    "name": "Admin 2",
    "status": "deleted"
  }
}
```