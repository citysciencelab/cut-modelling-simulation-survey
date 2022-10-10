# Survey App

The survey app contains three different parts which each serve a different purpsose.

## Landing Page

https://user-images.githubusercontent.com/61881523/194835225-ff6798a4-dcdf-4e0a-b4a0-0d165c6b6fc6.mov

On the landing page, survey recipients are greeted and informed about the survey purpose. They can navigate to the survey page, and, if the survey is already submitted, to the digital twin page. 


## Survey Page

https://user-images.githubusercontent.com/61881523/194835352-7e434012-0860-40a0-b730-c170c6325bae.mov

On the survey page, recipients fill out a survey based on survey.js. The results are saved in the backend.



## Digital Twin Page

https://user-images.githubusercontent.com/61881523/194837940-f48d93d4-adac-4ea4-afde-1d29cf2bb0e1.mp4

On the digital twin page, survey recipients can interact with the digital twin of the Lego model they received. The can see data about the different urban infrastructure that is part of the twin, start exemplary simulations, such as wind, air quality, shadows or flooding. They can also write contributions and discuss the question which models and simulations they would like to use in the future.


## Local deployment
In order to start the survey app locally, first make sure that the [backend](../02-survey-backend/Readme.md) is running and it's correct path is specified in the `config.js` file. With `npm install`, all the dependencies are installed and with `npm start`, a local instance of the webapp is created.
