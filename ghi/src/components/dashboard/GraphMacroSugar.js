import React from "react";
import Plot from "react-plotly.js";
import { useGetMealsQuery } from "../../redux-elements/logMealApi";

function GraphMacroSugar() {
	const { data: meals, isLoading: mealsLoading } = useGetMealsQuery();

	if (meals) {
		var mealToday = meals.filter((meal) => {
			const today = new Date().toDateString();
			const mealDay = new Date(meal.datetime).toDateString();
			return mealDay === today;
		});
	}
	const proFatCarb = [0, 0, 0];
	const sugarAndOther = [0, 0];
	if (mealToday) {
		for (let meal of mealToday) {
			for (let meal_item of meal.meal_items) {
				proFatCarb[0] += meal_item.protein * 4;
				proFatCarb[1] += meal_item.total_fat * 9;
				proFatCarb[2] += meal_item.total_carb * 4;
				sugarAndOther[0] += meal_item.sugars * 4;
				sugarAndOther[1] += meal_item.calories - meal_item.sugars * 4;
			}
		}
	}
	for (let i = 0; i < proFatCarb.length; i++) {
		proFatCarb[i] = parseFloat(proFatCarb[i].toFixed(2));
	}
	sugarAndOther[0] = parseFloat(sugarAndOther[0].toFixed(2));
	sugarAndOther[1] = parseFloat(sugarAndOther[1].toFixed(2));

	const data = [
		{
			values: proFatCarb,
			labels: ["Protein", "Fat", "Carbohydrates"],
			domain: { column: 0 },
			name: "Daily Macro",
			hoverinfo: "label+percent+value+name",
			hole: 0.4,
			type: "pie",
		},
		{
			values: sugarAndOther,
			labels: ["Sugar", "Other Calories"],
			domain: { column: 1 },
			name: "Sugar Intake",
			hoverinfo: "label+percent+value+name",
			hole: 0.4,
			type: "pie",
		},
	];

	const layout = {
		title: "Daily Macro and Sugar Intake",
		autosize: true,
		annotations: [
			{
				font: {
					size: 18,
				},
				showarrow: false,
				text: "Macro",
				x: 0.17,
				y: 0.5,
			},
			{
				font: {
					size: 18,
				},
				showarrow: false,
				text: "Sugar",
				x: 0.82,
				y: 0.5,
			},
		],
		grid: { rows: 1, columns: 2 },
	};

	return (
		<div className="graph-component">
			<div className="graph">
				{mealsLoading ? (
					<>Loading...</>
				) : meals ? (
					<Plot data={data} layout={layout} useResizeHandler={true} />
				) : null}
			</div>
		</div>
	);
}

export default GraphMacroSugar;
