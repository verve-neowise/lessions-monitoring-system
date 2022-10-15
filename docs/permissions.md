# Permissions

Route `/permissions`

> Permissions: `admins`

> Header: `Authorization` : `<token>` 

-----

**`GET`** /

Get all permissions

Response
```json
{
  "message": "All permissions",
  "permissions": [
    "students",
    "teachers",
    "groups",
    "users",
    "admins",
    "profile",
    "directions",
    "dashboard"
  ]
}
```