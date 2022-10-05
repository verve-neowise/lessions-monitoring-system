# Authorization

Route `/auth`

**`POST`** /register

```json
{
    "username": "username",
    "password": "12345678"
}
```

---

**`POST`** /login

```json
{
    "username": "username",
    "password": "12345678"
}
```

---

**`GET`** /verify

HEADERS:

```json
"Authorization": "<token>"
```
