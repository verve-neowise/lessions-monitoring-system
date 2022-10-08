# Teachers

Route `/teachers`

> Permissions: `teachers`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all teachers

**`POST`** /

Create teacher
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

Update teacher
```json
{
    "name": "Jalol",
    "surname": "Imomaddinov",
    "birthday": "08-09-1997",
    "phone": "99899565121"
}
```

**`DELETE`** /:id

Delete teacher