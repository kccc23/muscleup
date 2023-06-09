<!-- transferred from separate file -->

## Week 1 - Day 1:
As a team, we brainstormed ideas for our project by looking for common threads. It looks like all of us have used some instance of a fitness tracking application in the past and wanted to explore fitness related applications. We decided to focus on a fitness application that would allow users to track their progress and also have the user be able to find a trainer for virtual consulting sessions. We found the nutritionix API which uses natural language to calculate calories of a meal. Looks like we have a plan going forward.

## Week 1 - Day 2:
As a team, we began wireframing our application on exacalidraw. Charles drove for the day and drew our layouts. We were able to visualize all of our modals, landing page, and user dashboard. After some wireframing, we decided that the trainer portion of the application will be reserved for stretch goals. 

## Week 1 - Day 3:
We continue wireframing and also began mapping our API endpoints. Yosef drove the markup that day. We all decided that we would use MongoDB for freeform schema. I looked how to establish relationships on MongoDB for us to use. 

## Week 1 - Day 4:
Kaining took the wheel and began working on raising issues on our gitlab repo. We also began working on our user stories and began working on our project board.

## Week 1 - Day 5:
I drove alongside the team to write out the rest of the issues and user stories.

## Week 2 - Day 1: 
We began working on our backend. We decided to use MongoDB for our database alongside FastAPI. During this day, we explored the power no NoSQL databases dove into embedded data and references. We decided to use references for our database. The base repository was pulled and cleaned up to fit our needs. I started skimming through FastAPI documentation to get started on the backend.

## Week 2 - Day 2:
Kainning drove alongside the team to start diving into Jwtdown functionality. We looked through the source code of jwtdown to fully understand how it was handling authentication and token generation. By the end of the day, the team was able to get a working JWT token generation and authentication through the auth.py file.

## Week 2 - Day 3:
I drove alongside the team to start mapping out the models that are going to be used for our endpoints. We also began working on our endpoints and started to get a working API. Models for account information and user profiles were able to be completed and by the end of the day, we were able to get a working API for account creation and user profile creation. Branch will be merged in the morning during standup. Each profile has been made 

## Week 2 - Day 4:
Kaining drove alongside the team to start working on interaction between our backend and nutritionix API. We were able to write the logic interacting with nutritionix. From the get request to the API, we were able to formulate some food log models and link it via reference to the user profile. We were able to get a working API for food log creation and food log retrieval by the end of the day's commit.

## Week 3 - Day 1:
Charles drove alongside the team today to map out the rest of the CRUD operations for the account model, profile model, and log models. All APIs now had enpoints that allowed for full CRUD operations. From now, we start targetting the front end and start working on the UI.

## Week 3 - Day 2:
The team and I cleaned up the remaining CRUD operations are started working on the Navbar component alongside mapping out our routes for React. I made a big emphasis on making our application responsive by adding media query breakpoints without our CSS file. We decided to use material UI components to support the design of our frontend.

## Week 3 - Day 3:
Kainning drove alongside the team today to start implementing the global states with redux. The day mostly consisted of reading through Redux documentation and watching video guides on how to use the redux toolkit alongside redux to manage our states. Not much progress could be made on the frontend today as we are still trying to grasp redux.

## Week 3 - Day 4:
Kainning continued to drive alongside the team to start implementing redux in the account creation section of the user story. On top of redux, we started to explore how to manage FrontEnd user authentication with Jwtdown's interaction in the backend. By the end of the day, we were able to get a somewhat working redux state for the account creation section while still figuring out how to manage the JWT token in the frontend.

## Week 3 - Day 5: 
Kainning and I drove alongside the team to debug some error within the user signup story. We were able to succeed in signing up the user and handled the logic in redirecting the user to a dashboard page after a success 200 on the POST request and on a successful token retrieval. We took it easy for the rest of the day for the holiday weekend.

## Week 4 - Day 1:
I drove alongside the team to start working on the user profile creation story. We reused alot of the form logic in creation a user accoutn for this portion, except we would not have to implement authentication for this form. We set up the slice to hold the formstate alongside the logic to handle the form submission. By the end of the day we were able to initialize the state and will move onto forming the data tomorrow.

## Week 4 - Day 2:
I drove alongside the team and we ran into the a bug the blocked our progress. Some reason, our post request was not reaching the backend endpoint in the right format, even though the state was where we wanted it to be. Additionally, the method we used to send the post request would not send the token information alongside the body of the request. We decided to take a step back and look at the documentation for redux toolkit and jwtdown to see if we were missing anything. By the end of the day, we were able to format the post request in RTK to send the token alongside the body of the request. We were also able to get the request to reach the backend endpoint. It was a late night, but we got it done.

## Week 4 - Day 3:
Now that we have moved passed the redux fiasco, we were able to get the user profile creation form to work. We were able to get the global state to fetch all the global data we need on login and are now able to use it across our entire react application. The team decided that we will start branching out to start working on each individual component and then merge it into the main branch. I will continue working on the navbar component and styling the entire application to make it responsive.

## Week 4 - Day 4:
Today, Charles and I mainly worked on styling the Navbar and implementing a hamburger menu for mobile users. Use the media queries that were established earlier, we were able to create a swiping side navigation menu for the webpage. We now have a state that manages the condition of the swiping navbar. I plan to implement more styling to handle the visuals for the rest of the page tomorrow.

## Week 4 - Day 5:
Today, I added a dark filter over the page whenever a modal is activated or when the side navigation menu is activated. It is managed using a state in react. I also the process of turning the login page into a modal that the user can pull up in any part of the application. The state is managed inside the navbar. Along with this, I adjusted the side navigation menu and the navbar itself to change depending the browser has an active token or not. Will continue with styling next week.

## Week 5 - Day 1:
Today, I diverted away from CSS and alongside the team, we started working on reformatting the entire project to work alongside CI/CD. We were able to move all of our links and keys to a .env file and reformatted the entire application to use our environment variables instead of hard coding the variables. I then passed the torch to Charles to start working on unit testing alongside the team.

## Week 5 - Day 2: 
I returned back to CSS today to start finishing the logic for the login modal and adjust it to function with the user login story. The team split up into 4 to start covering all areas of our project. Kainning is actively working on the dashboard food log section, Charles is now working on the hero page, Yosef is fulling committing on deploying the application, and I am continuing to make the dashboard responsive after finishing the login modal. 

## Week 5 - Day 3:
I redesigned the navbar to fit in with Kainning's mockup of the landing and dashboard page today. Big thanks to her for mapping the art direction in Figma. Spent most of the day adjusting the containers to fit the mockup in CSS. I also added a new feature to the navbar that allows the user to click on the logo to bring up a navigation menu. I continue to work on the dashboard page and will continue to work on it tomorrow to be ready for the presentation to Candace.

## Week 5 - Day 4:
I continued to work on the dashboard page today. I was able to get the dashboard page to be responsive and ready for the presentation. I made minor tweaks to the dashboard for visual clarity. The project has now completed its MVP stage and we will be moving onto stretch goals soon. Yosef managed to get the project deployed and I managed to learn alot about the deployment process from him. After the presentation, we decided to help other teams try to get their page deployed.

## Week 5 - Day 5:
Project submission day. We are taking it easy and are just helping other teams deploy their page. Readme has been written and we are ready to submit the MVP. Minor bug fixes have been made to handle some small errors and details in the project since we sent out the project link to our friends to test. We are ready to submit the project. !!!