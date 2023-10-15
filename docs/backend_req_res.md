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

register as admin

```txt
➜  ~ curl -X POST -H "Content-Type: application/json" -d '{ "username": "newadmin", "password": "newadmin123", "email": "new.admin@example.com", "role": "admin" }' http://localhost:8000/api/admin/addUser | json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   235  100   131  100   104    572    454 --:--:-- --:--:-- --:--:--  1026
{
  "status": "user registered",
  "message": {
    "user_id": "9194584AD",
    "username": "newadmin",
    "email": "new.admin@example.com",
    "role": "admin"
  }
}
```

only one admin user can be registered

```txt
➜  ~ curl -X POST -H "Content-Type: application/json" -d '{ "username": "newadmin1", "password": "newadmin123", "email": "new.admin1@example.com", "role": "admin" }' http://localhost:8000/api/admin/addUser | json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   145  100    39  100   106    307    836 --:--:-- --:--:-- --:--:--  1150
{
  "message": "admin user already exists"
}
```

login as admin

```
➜  ~ curl -X POST -H "Content-Type: application/json" -d '{ "user_id": "9194584AD", "password": "newadmin123" }' http://localhost:8000/api/auth/login | json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   318  100   265  100    53   1976    395 --:--:-- --:--:-- --:--:--  2390
{
  "status": "authorized",
  "email": "new.admin@example.com",
  "user_id": "9194584AD",
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxOTQ1ODRBRCIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNjk3Mzg1MjE3LCJleHAiOjE3ODM3ODUyMTd9.FS9sbEN00v06s96cc0xKuFI48JjeyvsNL-1g_Tw40IA"
}
```
