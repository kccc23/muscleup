## Week 1 Day 1(May 8, 2023):
I met with my team today and we discussed what project we could be. Talked interests and we all found a common around on fitness/exercise activity. We then decided to make a health app and looked at options to create one. That's when we found the Nutrtionix API and our minds were set. The all-in-one food and exercise tracker, with the option to have a training service with it.

## Week 1 Day 2(May 9, 2023):
We met to wireframe our project, I drove that day and started drawing up templates to use. We started making our desktop layout with a 2 page redirected sign up form, login modal, and what we wanted our dashboard to ultimately look like. We then looked at the dashboard and drew up what the functionality of it was going to look like and be. After that we drew up stretch goals that we could implement after we finished our MVP.

## Week 1 Day 3(May 10, 2023):
We met up with our wireframing done to discuss what our endpoints would end up looking like. Yosef drove that day so I just took a back seat and helped with brainstorming. Our progress on that day can be seen on the api_endpoints.md file but to explain it, we started with what our MVP endpoint were. That started with creating a user and the subsequent trainee endpoints, followed by the dashboard endpoints needed in our app being the food, exercise, weight, and the profile components of our dashboard. We also added the endpoint for updating your weight and adding meals, exercises, and the updated weight into the database. Lastly we added the login and logout endpoints to finish off our MVP endpoints. After that we worked on stretch goal endpoints to finish off our day.

## Week 1 Day 4(May 11, 2023):
We met up ahead of schedule today and started to work on unit tests, Kaining drove that day to write up our first 3 issues and we opted to call it a day and continue the final issues tomorrow.

## Week 1 Day 5(May 12, 2023):
We met to finish off the last issues we didnt finish yesterday. Sonny drove this time to write the last 2 issues for our core functionality.

## Week 2 Day 1(May 15, 2023):
We met up today to actually start coding our project. Sonny drove that day to add the mongo database to the project. We deleted the launch details function in our main.py file but added checks to test out mongo.

## Week 2 Day 2(May 16, 2023):
We started this day with tackling authentication. Kaining drove us through creating our account models, making the get and create methods for the accounts and routing them to be seen in the backend. We spent most of our day trying to understand how jwtdown's authentication methods worked but dug our way out of our mental holes by the end of the day.

## Week 2 Day 3(May 17, 2023):
We met up today to write the create and get methods for trainee models as well as setting up account collection. Sonny drove to start us getting there as we created the trainee models and passed them through our fun

## Week 2 Day 4(May 18, 2023):
We met up today to start the Nutritionix API calls for the backend. Kaining drove for us as we created the meal portion of the api calls from making the various models to writing the code to fetch from the api to get the data parameters we wanted for our app. We made sure we wrote a query for the database to log our collection and add documents to it when we created new meals and be able to fetch all the data that accrues in said collection. We also made the get and create methods of those logged meals.

## Week 3 Day 1(May 22, 2023):
We met up today to work on the CRUD functionality. I drove today going through making the exercise logging models as well as an account update model for our forms. We added an avatar parameter to the account props in our create method for accounts as well as an update and delete method writing out the functions for those. We also expanded our queries for the mongo database to handle the new collection for exercises making the get and create methods for them as well as making a delete method for meals. Lastly, we made the methods and functions for update and deleting accounts for our backend.

## Week 3 Day 2(May 23, 2023):
We met up today to finish the CRUD funtionality for all our account models as well as adding delete methods for meals and exercises while cleaning up the code from the previous day. Sonny drove this part as we added a trainee update form and refactored some code I did yesterday into better formatting. We added a cascade-like process in to our delete function for accounts so that all data with the acount deletes with it upon termination as well as a simple delte exercise method. lastly we created the create trainee method with a chekc for previous profile data and also created update and delete methods for trainees. We also started the process of frontend design with the base navbar.

## Week 3 Day 3(May 24, 2023):
We started the day full of hope with our progress but that was before we met the beast that is React Redux and RTK. Kaining was the driver that day as we tried to understand how it worked as the day went along. We made some edits to out account out model so it doesnt show the password, we wrote the logic for getting the token data, added the modules for react and redux, and started building the slices for accounts.

## Week 3 Day 4(May 25, 2023):
We started the day wanted to continue where we left off with redux and RTK by making more slices. Kaining drove again to build the login modal functionality and also to import the mui library JoyUI. With that, we refactored the login modal to save states in the frontend and added a logout button for testing the endpoints. We also started to build the signup page with our new found confidence in RTK to make a fully flushed out form. We configured our store file with reducers for our account and authentication slices. Also, we made a few changes to our authentication slice to make our create slice of accounts and kept encoutering an error which ended up just being a typo in our spelling of LogInMutation. #punctuationfail

## Week 4 Day 1(May 30, 2023):
We met in the room to talk about progress and the goal for the day. Kaining refactored the login modal a little more as well as adding frontend alert boxes for error correction. Sonny drove the rest of the day to tackle the rtk slices and to finish the profile creation. First thing we did was update our models that included weight and goal weight and changed their inputs to float to account for decimal points. We then refactored our create method for trainees and updated our endpoints to restfulize them. We then created a signup form component for the profile an account makes after account creation or if the logged in account has not made one yet. Also, we refactored our account creation form from the day before and created an account slice to add to our store.

## Week 4 Day 2(May 31, 2023):
We started the day talking about what needed done, we decided to refactor our authentication and profile apis get methods. Sonny drove alongside the team and we ran into the a bug the blocked our progress. Some reason, our post request was not reaching the backend endpoint in the right format, even though the state was where we wanted it to be. Additionally, the method we used to send the post request would not send the token information alongside the body of the request. We decided to take a step back and look at the documentation for redux toolkit and jwtdown to see if we were missing anything. By the end of the day, we were able to format the post request in RTK to send the token alongside the body of the request. We were also able to get the request to reach the backend endpoint. It was a late night, but we got it done.

## Week 4 Day 3(June 1, 2023):
Now that we have moved passed the redux fiasco, we were able to get the user profile creation form to work. We were able to get the global state to fetch all the global data we need on login and are now able to use it across our entire react application. The team decided that we will start branching out to start working on each individual component and then merge it into the main branch. Sonny said he will continue working on the navbar component and styling the entire application to make it responsive.

## Week 4 Day 4(June 2, 2023):
Today, Sonny and I mainly worked on styling the Navbar and implementing a hamburger menu for mobile users. Use the media queries that were established earlier, we were able to create a swiping side navigation menu for the webpage. We now have a state that manages the condition of the swiping navbar. We plan to implement more styling to handle the visuals for the rest of the page tomorrow.

## Week 5 Day 1(June 5, 2023):
Today, we started working on reformatting the entire project to work alongside CI/CD. We were able to move all of our links and keys to a .env file and reformatted the entire application to use our environment variables instead of hard coding the variables. Sonny then passed the torch to me to start working on unit testing alongside the team.

## Week 5 Day 2(June 6, 2023):
Sonny returned back to CSS today to start finishing the logic for the login modal and adjusting it to function with the user login story. The team split up into 4 to start covering all areas of our project. Kaining is actively working on the dashboard food log section, I am now working on the hero page and formatting the CSS for it, Yosef is fully committing to deploying the application, and Sonny is continuing to make the dashboard responsive after finishing the login modal.

## Week 5 Day 3(June 7, 2023):
Sonny redesigned the navbar to fit in with Kaining's mockup of the landing and dashboard page today. Big thanks to her for mapping the art direction in Figma. Spent most of the day adjusting the containers to fit the mockup in CSS. He also added a new feature to the navbar that allows the user to click on the logo to bring up a navigation menu. He continued to work on the dashboard page and will continue to work on it tomorrow to be ready for the presentation to Candace.

## Week 5 Day 4(June 8, 2023):
Sonny continued to work on the dashboard page today. He was able to get the dashboard page to be responsive and ready for the presentation. He made minor tweaks to the dashboard for visual clarity. The project has now completed its MVP stage and we will be moving onto stretch goals soon. Yosef managed to get the project deployed and we managed to learn a lot about the deployment process from him. After the presentation, we decided to help other teams try to get their page deployed.

## Week 5 Day 5(June 9, 2023):
Project submission day. We are taking it easy and are just helping other teams deploy their page. Readme has been written and we are ready to submit the MVP. Minor bug fixes have been made to handle some small errors and details in the project since we sent out the project link to our friends to test. We are ready to submit the project.
