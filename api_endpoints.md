## User functionality


### Create a new trainee details

* Endpoint path: /trainees
* Endpoint method: POST

* Headers:

* Request body:
    ```json
    {
        "goal": text,
        "height": int,
        "weight": int,
        "goal_weight": int,
        "date_of_birth": date,
        "gender": str,
        "country": str 
    }

    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
      "profile": profile,
      "message": string
    }
    ```


### Create a new user

* Endpoint path: /users
* Endpoint method: POST

* Headers:

* Request body:
    ```json
    {
        "first_name": str,
        "last_name": str,
        "username": str,
        "email": str,
        "password": str,
        "profile": profile,
        "is_trainer" : boolean
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
      "new_user": new_user,
      "message": string
    }
    ```


### Get Trainee dashboard (food)

* Endpoint path: /dashboard/foods
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Trainee dashboard for food
* Response shape:
    ```json
    {
      "food_logs": [
        {
          "calories": string,
          "food_name": string,
          "serving_unit" : int,
          "nf_protien" : int,
          "nf_total_carbohydrates":int,
          "nf_fat":int,
          "date": date-time
        }
      ],
    }
    ```

### Get Trainee dashboard (exercises)

* Endpoint path: /dashboard/exercises
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Trainee dashboard for exercises
* Response shape:
    ```json
    {
      "exercise_logs": [
        {
          "exercise_name": string,
          "duration_min": int,
          "nf_calories":int,
          "date": date-time
        }
      ],
    }
    ```
### Get Trainee dashboard (weight)

* Endpoint path: /dashboard/weights
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Trainee dashboard for weight
* Response shape:
    ```json
    {
      "weight_logs": [
        {
          "weight": int,
          "date": date-time
        }
      ],
    }
    ```
### Get Trainee dashboard

* Endpoint path: /dashboard/profile
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Trainee dashboard for profile
* Response shape:
    ```json
    {
      "trainee": [
        {
	        "first_name": str,
	        "last_name": str,
	        "username": str,
	        "email": str,
            "profile": profile
        }
      ],
    }
    ``` 

### Add new weight

* Endpoint path: /dashboard/weights
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "weight": int
    }
    ```


### Edit current weight

* Endpoint path: /trainee/weight
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "weight": int
    }
    ```

### Add new food

* Endpoint path: /dashboard/foods
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "query": string,
      "timezone": string
    }
    ```
* Response shape:
    ```json
    {
      "foods": [
        {
          "calories": string,
          "food_name": string,
          "serving_unit" : int,
          "nf_protien" : int,
          "nf_total_carbohydrates":int,
          "nf_fat":int,
          "date": date-time
        }
      ]
    }

### Add new exercise

* Endpoint path: /dashboard/exercises
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "query": string,
      "weight_kg" : int,
      "height_cm" : int,
      "age" : int,
      "gender": string
    }
    ```
* Response shape:
    ```json
    {
      "exercises": [
        {
          "exercise_name": string,
          "duration_min": int,
          "nf_calories":int,
          "date": date-time
        }
      ]
    }

### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```



# Stretch

### Create a new trainer

* Endpoint path: /trainers
* Endpoint method: POST


* Request body:
    ```json
    {
        "first_name": str,
	    "last_name": str,
	    "username": str,
	    "email": str,
	    "password": str,
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```

### Create a new posting

* Endpoint path: /trainers/postings
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
        "picture" : img,
        "name": string,
        "pricing" : int,
        "tags" : string,
        "description" : string
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```

### Get Trainer details

* Endpoint path: /trainers/details/<str:"username">/
* Endpoint method: GET


* Response: A trainer's details
* Response shape:
    ```json
    {
      "trainer": 
        {
            "picture" : img,
            "qualifications": string,
            "pricing" : int,
            "tags" : string,
            "description" : string,
            "trainees" : [{trainee}],
            "reviews" : [review]
        }
    }
    ```

### Create a new review

* Endpoint path: /trainers/details/<str:"username">/review/
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request body:
    ```json
    {
      "review": string,
      "rating" : int,
      "trainer" : {trainer},
      "trainee" : {trainee}
    }
    ```

* Response: An indication of success or failure
* Response shape:
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```

### Get a list of all Trainers

* Endpoint path: /trainers/postings
* Endpoint method: GET


* Response: A list of all Trainers
* Response shape:
    ```json
    {
      "trainers": [
        {
            "picture" : img,
            "qualifications": string,
            "pricing" : int,
            "tags" : string,
            "description" : string
        }
      ]
    }
    ```