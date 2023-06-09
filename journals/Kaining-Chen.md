## Jun 9, 2023

Today, I worked on:

* Bug fixing

I fixed the weight graph bug, so now weight graph doesn't show if you don't log your weight. I also added error message to show when the email is not available when you sign up for account. And we helped out other teams to deploy.

I learned that last day submission could be a bit nervous, but trust the process that we did some awesome work and everyone in our team did their part exceptionally well. I'm very proud of our team and very proud of what we did.

## Jun 8, 2023

Today, I worked on:

* Back end and front end to apply to be a trainer and displaying all trainers
* Trainer RTK
* TrainerList component
* TrainerForm component
* Add more small features
* Fixing small bugs
* Unit test

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
* Unit test

I worked on displaying the list of meal items and exercise items, calculate the food intake calories and exercise clories and added functionality to the exercise button and the delete buttons on the meal items and exercise items. And I also worked with the team on unit test.

Today, I learned MUI is really great for building component, like small things component. They look nice and easy to implement.

## Jun 2, 2023

Today, I worked on:

* Mock up
* Logs component
* Dashboard component
* Fix back end bugs

I fixed some bug in the back end that we were updating the trainee profile, cuz we use the wrong key (typo) to find the docs in Mongo. I also added functionalities for dashboard so now the dashboard is protected if you don't have an account or profile, you can't access to the dashboard.

I learned this cool expression in JXS that you could put boolean value and JXS together to determine if you wanna show particular JXS. React is so easy, haha.

## Jun 1, 2023

Today, I worked on:

* Log meal component

I drove for the day and we worked on Log meal component. We found some cute react icons and we incorporated those icons with MUI buttons. And we created this LogModal function to keep code dry, making the add meal/exercise/weight functionality so easy, very proud of it.

I leared never forget to be creative in coding, and keep codes dry should be a top priority when we get comfortable.

## May 30, 2023

Today, I worked on:

* Log in error
* Trainee form & RTK

I added log in error message so now if the front end catches an error, it shows up on the page. Sonny drove today and we worked on profile form component and profile RTK. We worked on some format converting from string to number to integer or float in the RTK query so we make sure to send teh correct Json body to the end point.

I learned that even we need to follow some extra rules with RTK, I could still do lots of logic and get creative with RTK.

## May 26, 2023

Today, I work on:

* Login component
* Signup component

Sonny and I drove for the day and we worked on front end log in, sign up and redirect to the dashboard. We used Joy UI for log in modal. We are still trying to figure out how RTK works and how to use different elements from RTK in our components. It's still a bit rusky, but we've been making little progress.

I learned to use isSuccess, isLoading etc to return a boolean to show us if the query/mutation gets us what we want. And we could incorporate them with useNavigate. It's very cool.

## May 25, 2023

Today, I worked on:

* Redux & RTK
* Front-end authentication

I drove for the day to continue work on front end authentication with Redux and RTK. Today, after lots of console.log statements and after so many debugging, we finally made get token, log in and log out and sign up work with RTK and Redux mostly, only leaving one bug for sign up.

I learned that in the component we need to useSelector and dispatch with Redux, but we don't need that with RTK, we could just call the data and rename it and just call the reducers from RTK. It's really cool with RTK working with backend, so you don't have to make so many fetches in the component.

## May 24, 2023

Today, I worked on:

* Redux & RTK
* Front-end authentication

I drove for the day and we worked on front end authentication with Redux and RTK. It's our first time, so we spentmost time reading documents and watch materials on Learn, tried to figure out how to do this.

I learned that Redux is a global state management for react. Not every app should use Redux, only for those need to unify the data for different components.

## May 23, 2023

Today, I worked on:

* Back-end CRUD
* Front-end Nav

Sonny drove for the day and we worked on additional CRUD like updating the trainee profile and updating & deleting accounts with associated documents in other collections. Then we finished our backend basically, and moved to fron-end Nav bar.

I found that since mongo is non relational database, so we needed to mimic that relationship in our router functions to call different functions in different queries.

## May 22, 2023

Today, I worked on:

* CRUD on log exercise and other back end functionalities

Charles drove for the day and we worked on log exercise and trainee profile CRUD functions.

I learned when working with FastAPI, with router and queries seperately for code organization, we need to be awear about what argument passing in and what parameters these functions need.

## May 19, 2023

Today, I worked on:

* Hide API key

I hardcoded the api key and id in the code and pushed to gitlab repo yesterday. I fixed it by creating a file to store those keys and id and put that file into gitignore.

I learned never expose your api keys.

## May 18, 2023

Today, I worked on:

* Back-end Nutritionix third party api call
* Back-end Log Meal

I drove for the day to write functions to make Nutritionix api calls. The idea is we use this NLP api to log one sentence of what we eat for a meal, and the api call would return back with meal items and their nutrition information. And we aslo implemented the routers and queries based on those functions and our log meal model.

I learned the hard part about using third party api is how to extract the data that you need from nested json body, and how to store them in your database, so it's easy to access for your app.

## May 17, 2023

Today, I worked on:

* Back-end account and profile

Sonny drove for today and we worked on create and get account and trainee profile data. We worked on routers to create endpoints and queries to interact with our mongo database for accounts and trainee profiles.

I learned how to merge a branch on Gitlab. I like Gitlab has this feature to tell you if the branch is ready to merge.

## May 16, 2023

Today, I worked on:

* Back-end Authentication

I drove for today for our back-end authentication using JWTdown, the in-house authentication library. We had some current about getting the email instead of the username passing into the authenticator function from JWTdown, and figured out where to return the hashed password instead of password. And we made it work !!!

I learned that knowing how to read documentations and source code are so imporant as a software engineer. Every time we use a new libraary, we learn new rules and we apply them to achieve the functionality that we want.

## May 15, 2023

Today, I worked on:

* Project files
* Docker-compose.yml
* Mongo

Sonny drove for the day and we added Mongo database to the project, we were looking through the skeleton of the profile file, trying to get ready to start coding. We added our docker-compose.yml and renamed the directories.

I learned that how to build mongo database image and create a volume for it to store the data in docker.

## May 12, 2023

Today, I worked on:

* Create issues

Sonny drove for the day to create the rest of the issues. By now, we have all the planning work done. We are ready to jump start the project. I also explored on Figma to design mock up.

I learned that Figma is a very professional web app mock up design place. It's very user friendly, even for an absolute beginner. I was able to make a simple home page.

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
