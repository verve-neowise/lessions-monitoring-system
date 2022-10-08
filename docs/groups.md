# Groups

Route `/groups`

> Permissions: `groups`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all groups

**`POST`** /

Create group
```json
{
    "name": "Node.js 146",
    "directionId": 3 // Node.js
}
```

**`PUT`** /:id

Update group
```json
{
    "name": "Node.js 146",
    "directionId": 3 // Node.js
}
```

**`DELETE`** /:id

Delete group