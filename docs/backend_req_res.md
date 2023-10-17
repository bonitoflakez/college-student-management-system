Login

```sh
curl --location 'http://localhost:8000/api/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "user_id": "<id>AD/FC/ST",
    "password": "<pass>"
}'
```

Register

```sh
curl --location 'http://localhost:8000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "<uname>",
    "password": "<pass>",
    "email": "<mail>",
    "role": "<role>Admin/Faculty/Student"
}'
```

Add Student Details (Admin || Faculty only)

```sh
curl --location 'http://localhost:8000/api/student/add-details' \
--header 'Authorization: Bearer <admin/faculty-token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "student_id": "<student-id>",
    "name": "<student-name>",
    "phone_number": "<student-phone-number>",
    "guardian_name": "<guardian-name>",
    "guardian_email": "<guardian-email>",
    "guardian_phone_number": "<guardian-phone-number>",
    "group_id": <group-name-id>,
    "course_name": "<course-name>",
    "branch_name": "<branch-name>",
    "joining_session": <joining-year>
}'
```

Add Faculty Details (Admin only)

```sh

```
