import React from 'react';
import Plot from 'react-plotly.js';
import { useGetMealsQuery } from '../../redux-elements/logMealApi';
import { useGetExercisesQuery } from '../../redux-elements/logExerciseApi';
import { useGetWeightsQuery } from '../../redux-elements/logWeightApi';
import { useGetProfileQuery } from '../../redux-elements/profileApi';

function GraphWeightCalories() {
    const { data: meals, isLoading: mealsLoading } = useGetMealsQuery();
    const { data: exercises, isLoading: exercisesLoading } = useGetExercisesQuery();
    const { data: weights, isLoading: weightsLoading } = useGetWeightsQuery();
    const { data: profile, isLoading: profileLoading } = useGetProfileQuery();

    const xAxis = [6,5,4,3,2,1,0];
    const xDateAxis = xAxis.map(x => {
        const day = new Date()
        day.setDate(day.getDate() - x);
        return day.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            weekday: "short",
        }).replace(",", "");
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const yMealAxis = [0,0,0,0,0,0,0];
    if (meals) {
        var mealsForWeek = meals.filter(meal => {
            const mealDay = new Date(meal.datetime);
            return mealDay > lastWeek;
        });
    }
    if (mealsForWeek) {
        for (let y=6; y>=0; y--) {
            const day = new Date();
            day.setDate(day.getDate() - y);
            for (let meal of mealsForWeek) {
                const mealDay = new Date(meal.datetime).toDateString();
                if (mealDay === day.toDateString()) {
                    for (let meal_item of meal.meal_items) {
                        yMealAxis[6-y] += meal_item.calories;
                    }
                }
            }
        }
    }
    for (let i=0; i<yMealAxis.length; i++) {
        yMealAxis[i] = parseFloat(yMealAxis[i].toFixed(2));
    }

    const yExerciseAxis = [0,0,0,0,0,0,0];
    if (exercises) {
        var exercisesForWeek = exercises.filter(exercise => {
            const exerciseDay = new Date(exercise.datetime);
            return exerciseDay > lastWeek;
        });
    }
    if (exercisesForWeek) {
        for (let y=6; y>=0; y--) {
            const day = new Date();
            day.setDate(day.getDate() - y);
            for (let exercise of exercisesForWeek) {
                const exerciseDay = new Date(exercise.datetime).toDateString();
                if (exerciseDay === day.toDateString()) {
                    for (let exercise_item of exercise.exercise_items) {
                        yExerciseAxis[6-y] += exercise_item.calories;
                    }
                }
            }
        }
    }
    for (let i = 0; i < yExerciseAxis.length; i++) {
        yExerciseAxis[i] = parseFloat(yExerciseAxis[i].toFixed(2));
    }

    const yWeightAxis = [0,0,0,0,0,0,0];
    if (weights) {
        var weightsForWeek = weights.filter(weight => {
            const weightDay = new Date(weight.datetime);
            return weightDay > lastWeek;
        });
    }
    if (weightsForWeek) {
        weightsForWeek.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
        for (let y=6; y>=0; y--) {
            const day = new Date();
            day.setDate(day.getDate() - y);
            for (let weight of weightsForWeek) {
                const weightDay = new Date(weight.datetime).toDateString();
                if (weightDay === day.toDateString()) {
                    yWeightAxis[6-y] = weight.log_weight;
                }
            }
        }
    }

    const yGoalWeightAxis = [0, 0, 0, 0, 0, 0, 0];
    const yDailyCaloriesGoal = [0, 0, 0, 0, 0, 0, 0];
    let dailyCaloriesGoal = 0;
    if (profile) {
        const today = new Date();
        const birthDate = new Date(profile.date_of_birth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (profile.gender === "Male") {
            dailyCaloriesGoal = ((88.4 + 13.4 * profile.weight * 0.453592) + (4.8 * profile.height * 2.54) - (5.68 * age)) * 1.2
        } else {
            dailyCaloriesGoal = ((447.6 + 9.25 * profile.weight * 0.453592) + (3.10 * profile.height * 2.54) - (4.33 * age)) * 1.2
        }
        for (let i=0; i<yGoalWeightAxis.length; i++) {
            yGoalWeightAxis[i] = profile.goal_weight;
            yDailyCaloriesGoal[i] = dailyCaloriesGoal;
        }
    }

    const yDailyCalories = [];
    for (let i=0; i<7; i++) {
        yDailyCalories.push(yMealAxis[i] - yExerciseAxis[i]);
    }

    const mealTrace = {
        x: xDateAxis,
        y: yMealAxis,
        type: "scatter",
        mode: "lines+markers",
        name: "Meal",
        line: {
            color: 'rgb(68, 118, 4)',
            width: 3
        }
    };
    const exerciseTrace = {
        x: xDateAxis,
        y: yExerciseAxis,
        type: "scatter",
        mode: "lines+markers",
        name: "Exercise",
        line: {
            color: 'rgb(215, 122, 97)',
            width: 3
        }
    };
    const dailyCaloriesTrace = {
        x: xDateAxis,
        y: yDailyCalories,
        type: "scatter",
        mode: "lines",
        name: "Daily Calories Total",
        line: {
            dash: 'dashdot',
            width: 3,
        },
    };
    const dailyCaloriesGoalTrace = {
        x: xDateAxis,
        y: yDailyCaloriesGoal,
        type: "scatter",
        mode: "lines",
        name: "Daily Calories Goal",
        line: {
            dash: 'dashdot',
            width: 3,
        },
    };
    const weightTrace = {
        x: xDateAxis,
        y: yWeightAxis,
        type: "scatter",
        mode: "lines+markers",
        name: 'Weight',
        line: {
            color: 'rgb(0, 119, 182)',
            width: 3
        }
    };
    const goalWeightTrace = {
        x: xDateAxis,
        y: yGoalWeightAxis,
        type: "scatter",
        mode: "lines",
        name: 'Goal Weight',
        line: {
            dash: 'dashdot',
            width: 3
        }
    };

    const caloriesData = [mealTrace, exerciseTrace, dailyCaloriesTrace, dailyCaloriesGoalTrace];
    const caloriesLayout = {
        title: "Calories of Food Intake and Exercise",
        xaxis: {
            title: 'One Week',
            showgrid: false,
        },
        yaxis: {
            title: 'Calories',
            showline: false,
        }
    };

    const weightsData = [weightTrace, goalWeightTrace];
    const weightsLayout = {
        title: "Weight in lbs",
        xaxis: {
            title: 'One Week',
            showgrid: false,
        },
        yaxis: {
            title: 'Weight',
            showline: false,
        }
    }

    return (
        <div className="graph-component">
        <div className="graph">
            {(mealsLoading || exercisesLoading) ? (
                <>Loading...</>
            ): (meals && exercises) ? (
                <div>
                    <Plot
                        data={caloriesData}
                        layout={caloriesLayout}
                    />
                </div>
            ) : null}
        </div>
        <div>
            {(weightsLoading || profileLoading) ? (
                <>Loading...</>
            ): weights ? (
                <div className="graph">
                    <Plot
                        data={weightsData}
                        layout={weightsLayout}
                    />
                </div>
            ) : null}
        </div>
        </div>
    )
}

export default GraphWeightCalories;