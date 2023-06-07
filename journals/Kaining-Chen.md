## Jun 7, 2023

Today, I worked on:
* Two interactive react plotly donut graphs for daily macro, and sugar intake
* Deployment

I wrote a GraphMacro Sugar component to access food intake of the day, and counted all the protein, fat and carb from every meal_item, then used react plotly and plotly js to display a donut graph for daily macro tracking. In the same component, I aslo access and count the sugar calories and total calories(excluded sugar) from each meal_item of the day, to display a donut graph for sugar intake percentage. I also worked on deployment with Yosef, Sonny and Charles.

Today, I learned some styling with donut chats on react plotly. I found that styling and naming items with react plotly are quite easy to implement. This chart is easier to make compared to the charts yesterday, since I only need to access the meals of the day, not the last 7 days.

## Jun 6, 2023

Today, I worked on:

* Two interactive react-plotly line plots for food intake and exercise calories on Dashboard - one of our MVP
* CI/CD

I wrote a GraphWeightCalories component to access the weights logs and meals logs, used react-plotly and plotly js to plot the weights and daily calories for food intake and exercises based on the last 7 days, including the current day. I also worked with Yosef, Sonny and Charles for CI/CD, we faced a wall on Gitlab pipelines, but we have the yml files basically ready.

Today, I found that react-plotly is very easy to use, the examples and codes in the documentation are easy to understand. The trick part is to count total calories based on dates with our nested object, I did it in some nested loops. The other trick part is to access the latest update of weight logs based on the date, I had to sort it by datetime in ascent order, then grab the "largest" value based on date.
