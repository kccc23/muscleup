## Jun 8, 2023
Today, I worked on:
* Back end and front end to apply to be a trainer and displaying all trainers
* Trainer RTK
* TrainerList component
* TrainerForm component
* Add more small features
* Fixing small bugs

I wrote full-stack for showing all trainers and apply to be a trainer. I also added some small features for weight graph and daily calorie goal, fixed the profile form error message bug. I also worked with the theam for deployment in the morning at Andrew' workshop,it's great to see our app finally get deployed. I tried it on Chrome and my phone, super excited.

Today, I learned going over all the steps from back end to front end could be very flowy. I was able to create a showing all trainers as well as aplly to be a new trainer within a few hours, very proud of it. And I also learned to use MUI component for the form and card, which was fun to make some styles there.

## Jun 7, 2023

Today, I worked on:
* Two interactive react-plotly donut graphs for daily macro, and sugar intake
* Deployment
* Trainers

I wrote a GraphMacro Sugar component to access food intake of the day, and counted all the protein, fat and carb from every meal_item, then used react plotly and plotly js to display a donut graph for daily macro tracking. In the same component, I aslo access and count the sugar calories and total calories(excluded sugar) from each meal_item of the day, to display a donut graph for sugar intake percentage. I also worked on deployment with Yosef for a little. Then I moved onto trainers backend.

Today, I learned some styling with donut chats on react plotly. I found that styling and naming items with react plotly are quite easy to implement. This chart is easier to make compared to the charts yesterday, since I only need to access the meals of the day, not the last 7 days.

## Jun 6, 2023

Today, I worked on:

* Two interactive react-plotly line plots for food intake and exercise calories on Dashboard
* CI/CD

I wrote a GraphWeightCalories component to access the weights logs and meals logs, used react-plotly and plotly js to plot the weights and daily calories for food intake and exercises based on the last 7 days, including the current day. I also worked with Yosef, Sonny and Charles for CI/CD, we faced a wall on Gitlab pipelines, but we have the yml files basically ready.

Today, I found that react-plotly is very easy to use, the examples and codes in the documentation are easy to understand. The trick part is to count total calories based on dates with our nested object, I did it in some nested loops. The other trick part is to access the latest update of weight logs based on the date, I had to sort it by datetime in ascent order, then grab the "largest" value based on date.

## Jun 5, 2023

Today, I worked on:

* Logs component

I worked on displaying the list of meal items and exercise items, calculate the food intake calories and exercise clories and added functionality to the exercise button and the delete buttons on the meal items and exercise items.

Today, I learned MUI is really great for building component, like small things component. They look nice and easy to implement. And I created this LogModal function to keep code dry, making showing the add meal/exercise/weight functionality so easy, very proud of it.

## Jun 2, 2023

Today, I worked on:

* Mock up
* Logs component

## May 15, 2023

Today, I worked on:

* Project files
* Docker-compose.yml
* Mongo

Sonny drove for the day and we added Mongo database to the project, we were looking through the skeleton of the profile file, trying to get ready to start coding.

## May 12, 2023

* Create issues

Sonny drove for the day to create the rest of the issues. By now, we have all the planning work done. We are ready to jump start the project. I also explored on Figma to design mock up.

I learned that Figma is a very professional web app mock up design place. It's very user friendly, even for an absolute beginner.

## May 11, 2023

Today, I worked on:

* Create issues

I drove for the day and we created some basic issues on Gitlab. We created issues for log in, sign up and log out, and our MVP - the dashboard. We tried to be as detail as we could, to include functionality details, wireframes and technical problam solving planning.

I found pre planning help us gather ideas and thoughts and even research before we implement to create our app.

## May 10, 2023

Today, I worked on:

* Api endpoints

We worked on creating api endpoints. Yosef drove for the day and we defined the backend endpoint path, the request and response Json body with fields for our accounts, trainee profiles, meal/exercise logs, and trainers as stretch goals.

I learned that building an app could be complicated. Just to figure out a way to figure out the logic and organize the different parts and how they interact with each other of the app is not an easy task.

## May 9, 2023

Today, I worked on:

* Wireframe

We worked on wire framing our fitness app, with sign up, log in, log out, create profile, and our MVP - calories and weight tracking. We designed what the pages should look like, the layout and pop up log item modals.

Today, I looked at fitness websites like Noom, Aura, Lost it and My Fitness Pal, etc, and I found ome of them offers great user experience, such as very clean charts and easy food logs. We try to learn from them.

## May 8, 2023

Today, I worked on:

* Idea brain storm

I worked with Sonny, Yosef and Charles, AKA the whole team, on brain storming our project idea. We quickly decided to build a fitness tracking app to track food intake calories and exercise calories, and have trainers work virtually with any client that wants to achieve their fitness goals.

Today, I learned Charles plays and coaches tennis, Sonny used to train as a boxing athlete and Yosef loves fitness and sports. I aslo learned some third party api related to health and fitness, like Nutritionix, it uses natural language processing to understand user input and output meal items with nutrition and calories information.
