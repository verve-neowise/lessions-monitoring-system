# Users

Route `/directions`

> Permissions: `directions`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all directions

**`POST`** /

Create direction
```json
{
    "name": "Node.js",
}
```

**`PUT`** /:id

Update direction
```json
{
    "name": "Node.js",
}
```

**`DELETE`** /:id

Delete direction

