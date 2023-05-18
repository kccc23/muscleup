import json
import requests
import os

NUTRITIONIX_ID = "4b7309b9"
NUTRITIONIX_KEY = "760203a8bf5c41931a013b14d1d661ad"


def get_foods(log_meal):
    headers = {
        "x-app-id": NUTRITIONIX_ID,
        "x-app-key": NUTRITIONIX_KEY,
        "x-remote-user-id": "0",
        "Content-Type": "application/json"
    }
    url = "https://trackapi.nutritionix.com/v2/natural/nutrients"
    data = {
        "query": log_meal,
        "timezone": "US/Eastern",
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    content = json.loads(response.content)

    meal = []
    for item in content["foods"]:
        food = {}
        food["food_name"] = item.get("food_name")
        food["serving_qty"] = item.get("serving_qty")
        food["serving_unit"] = item.get("serving_unit")
        food["serving_weight_grams"] = item.get("serving_weight_grams")
        food["calories"] = item.get("nf_calories")
        food["total_fat"] = item.get("nf_total_fat")
        food["total_carb"] = item.get("nf_total_carbohydrate")
        food["sugars"] = item.get("nf_sugars")
        food["protein"] = item.get("nf_protein")
        meal.append(food)

    return meal


def get_exercises(log_exercise, gender, weight_kg, height_cm, age):
    headers = {
        "x-app-id": NUTRITIONIX_ID,
        "x-app-key": NUTRITIONIX_KEY,
        "x-remote-user-id": "0",
        "Content-Type": "application/json"
    }
    url = "https://trackapi.nutritionix.com/v2/natural/exercise"
    data = {
        "query": log_exercise,
        "gender": gender,
        "weight_kg": weight_kg,
        "height_cm": height_cm,
        "age": age
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    content = json.loads(response.content)

    exercises = []
    for item in content["exercises"]:
        exercise = {}
        exercise["name"] = item.get("name")
        exercise["duration_min"] = item.get("duration_min")
        exercise["calories"] = item.get("nf_calories")
        exercises.append(exercise)

    return exercises
