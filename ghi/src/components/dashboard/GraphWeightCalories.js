import React from 'react';
import Plot from 'react-plotly.js';
import { useGetMealsQuery } from '../../redux-elements/logMealApi';
import { useGetExercisesQuery } from '../../redux-elements/logExerciseApi';
import { useGetWeightsQuery } from '../../redux-elements/logWeightApi';

function GraphWeightCalories() {
    const { data: meals, isLoading: mealsLoading } = useGetMealsQuery();
    const { data: exercises, isLoading: exercisesLoading } = useGetExercisesQuery();
    const { data: weights, isLoading: weightsLoading } = useGetWeightsQuery();

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
                        yMealAxis[6-y] = parseFloat(yMealAxis[6-y].toFixed(2))
                    }
                }
            }
        }
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
                        yExerciseAxis[6-y] = parseFloat(yExerciseAxis[6-y].toFixed(2))
                    }
                }
            }
        }
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
    const caloriesData = [mealTrace, exerciseTrace];
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

    const weightsData = [weightTrace];
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
        <div style={{ display: 'flex' }}>
        <div>
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
            {weightsLoading ? (
                <>Loading...</>
            ): weights ? (
                <div>
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