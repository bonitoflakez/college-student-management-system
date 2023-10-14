add a user

```txt
➜  ~ curl -X POST -H "Content-Type: application/json" -d '{ "username": "zinnxie", "password": "zin123", "email": "zinc.see@example.com", "role": "student" }' http://localhost:8000/api/admin/addUser

{
  "status":"user registered",
  "message":
  {
    "username":"zinnxie",
    "email":"zinc.see@example.com",
    "role":"student"
  }
}
```

login

```txt
➜  ~ curl -X POST -H "Content-Type: application/json" -d '{ "user_id": "951537ST", "password": "zin123" }' http://localhost:8000/api/auth/login | json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   309  100   262  100    47   1672    300 --:--:-- --:--:-- --:--:--  1980
{
  "status": "authorized",
  "email": "zinc.see@example.com",
  "user_id": "951537ST",
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1MTUzN1NUIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2OTcyNjM0MzAsImV4cCI6MTc4MzY2MzQzMH0.1JIml1Hu6tBykFaZbT66ReC1RTRWIAQ9nsIc26X-Smk"
}
```
