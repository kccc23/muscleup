import React from "react";
import Plot from "react-plotly.js";
import { useGetMealsQuery } from "../../redux-elements/logMealApi";

function GraphMacroSugar() {
    const { data: meals, isLoading: mealsLoading } = useGetMealsQuery();

    var data = [
    {
        values: [16, 15, 12],
        labels: [
        "Protein",
        "Fat",
        "Carbohydrates",
        ],
        domain: { column: 0 },
        name: "GHG Emissions",
        hoverinfo: "label+percent+name",
        hole: 0.4,
        type: "pie",
    },
    {
        values: [27, 11, 25, 8, 1, 3, 25],
        labels: [
        "US",
        "China",
        "European Union",
        "Russian Federation",
        "Brazil",
        "India",
        "Rest of World",
        ],
        text: "CO2",
        textposition: "inside",
        domain: { column: 1 },
        name: "CO2 Emissions",
        hoverinfo: "label+percent+name",
        hole: 0.4,
        type: "pie",
    },
    ];

    var layout = {
    title: "Daily Macro and Sugar Intake",
    annotations: [
        {
        font: {
            size: 20,
        },
        showarrow: false,
        text: "GHG",
        x: 0.17,
        y: 0.5,
        },
        {
        font: {
            size: 20,
        },
        showarrow: false,
        text: "CO2",
        x: 0.82,
        y: 0.5,
        },
    ],
    height: 400,
    width: 600,
    showlegend: false,
    grid: { rows: 1, columns: 2 },
    };
    return (
        <div>
            <Plot
                data={data}
                layout={layout}
            />
        </div>
    )
}

export default GraphMacroSugar