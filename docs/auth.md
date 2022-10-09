# Authorization

Route `/auth`

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
