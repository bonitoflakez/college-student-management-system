add a user

```txt
curl -X POST -H "Content-Type: application/json" -d '{ "username": "john_doe", "password": "password123", "email": "john.doe@example.com", "role": "student" }' http://localhost:8000/api/admin/addUser

{"status":"user registered","message":{"username":"john_doe","email":"john.doe@example.com","role":"student"}}
```
