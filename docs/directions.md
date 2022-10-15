# Users

Route `/directions`

> Permissions: `directions`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all directions

Response
```json
{
  "message": "All directions",
  "directions": [
    {
      "id": 1,
      "name": "Node.js",
      "status": "active"
    }
  ]
}
```
-----

**`POST`** /

Create direction
```json
{
    "name": "Node.js",
}
```

Response
```json
{
  "message": "direction created.",
  "direction": {
    "id": 2,
    "name": "Node.js",
    "status": "active"
  }
}
```
-----

**`PUT`** /:id

Update direction
```json
{
    "name": "Node.js",
}
```

Response
```json
{
  "message": "direction 1 updated.",
  "direction": {
    "id": 1,
    "name": "Backend Node.js",
    "status": "active"
  }
}
```

-----

**`DELETE`** /:id

Delete direction
```json
{
  "message": "direction deleted.",
  "direction": {
    "id": 2,
    "name": "Node.js",
    "status": "deleted"
  }
}
```