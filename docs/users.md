# Users

Route `/users`

> Permissions: `users`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all users

**`POST`** /

Create user
```json
{
    "username": "neowise",
    "password": "12345678"
}
```

**`PUT`** /:id

Update user credentials
```json
{
    "username": "neowise",
    "password": "12345678"
}
```


**`PUT`** /:id/permissions

Update user credentials
```json
{
    "permissions": [
        "groups",
        "directions"
    ]
}
```


**`DELETE`** /:id

Delete user

