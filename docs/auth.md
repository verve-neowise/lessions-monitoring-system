# Authorization

Route `/auth`

---

**`POST`** /login
Body
```json
{
    "username": "username",
    "password": "12345678"
}
```
Response
```json
{
  "username": "username",
  "permissions": ["string"],
  "role": "admin",
  "token": "<token>"
}
```

---

**`GET`** /verify

HEADERS:

```json
"Authorization": "<token>"
```

Response
```json
{
  "userId": 1,
  "username": "username",
  "permissions": ["string"],
  "role": "admin"
}
```