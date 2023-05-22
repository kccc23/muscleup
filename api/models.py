from pydantic import BaseModel


class Account(BaseModel):
    id: str
    username: str
    password: str
    email: str
    first_name: str
    last_name: str
    avatar: str | None
    role: str

class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    first_name: str
    last_name: str

class AccountOut(BaseModel):
    id: str
    username: str
    password: str
    email: str
    first_name: str
    last_name: str
    avatar: str | None
    role: str

class AccountUpdateForm(BaseModel):
    username: str | None
    first_name: str | None
    last_name: str | None
    avatar: str | None

# Models for Trainee Exclusively
class TraineeProfile(BaseModel):
    account_id : str
    account_email: str
    id: str
    goal : str
    height: int
    weight: int
    goal_weight: int
    date_of_birth: str
    gender: str
    country: str
    state: str

class TraineeProfileIn(BaseModel):
    goal : str
    height: int
    weight: int
    goal_weight: int
    date_of_birth: str
    gender: str
    country: str
    state: str

class TraineeProfileOut(BaseModel):
    account_email: str
    goal : str
    height: int
    weight: int
    goal_weight: int
    date_of_birth: str
    gender: str
    country: str
    state: str


class LogMeal(BaseModel):
    id: str
    account_id : str
    account_email: str
    meal_name: str
    meal_items: list
    datetime: str
    log_meal: str

class LogMealIn(BaseModel):
    log_meal: str
    meal_name: str

class LogMealOut(BaseModel):
    meal_name: str
    meal_items: list
    datetime: str

class LogExercise(BaseModel):
    id: str
    account_id: str
    account_email: str
    log_exercise: str
    exercise_name: str
    exercise_items: list
    datetime: str


class LogExerciseIn(BaseModel):
    log_exercise: str
    exercise_name: str
    gender: str
    weight_kg: int
    height_cm: int
    age: int

class LogExerciseOut(BaseModel):
    exercise_items: list
    exercise_name: str
    datetime: str
