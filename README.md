# CUT Modelling and Simulation Survey Tool
This repository contains the source code for the modelling and simulation study inside the Connected Urban Twins project. It is made up of three parts:
1. [Survey App](/01-survey-app/Readme.md): A frontend containing a survey and a digital twin of the Lego model
1. [Survey Backend](/02-survey-backend/Readme.md): A backend based on Postgres and an express server for various APIs
1. [QR-Code Generator](/03-qr-code-generator/Readme.md): A python script to generate QR codes to send individual links to survey recipients

https://user-images.githubusercontent.com/61881523/194824080-7bc2de52-9801-46f7-9717-93ffe8ef71f7.mov

## Background
Urban digital twins use urban data, digitally map our cities and enable what-if scenarios. In this context, this study by the City Science Lab addresses the question of which models and simulations are already finding their way into urban decision-making processes and which will be desired by different urban stakeholders in the future.
Using an exemplary digital twin of a real Lego model, employees of the city administration can experiment with different models and simulations, formulate wishes and ideas, and enter into an exchange with each other. In addition to pure knowledge production, the goal is to communicate the possibilities of the new technology for integrated and sustainable urban development.

Each of the recipients receives an sensitization package that contains an information brochure, a real lego model and an individual QR Code to access the survey and the lego model's digital twin. 


![02](https://user-images.githubusercontent.com/61881523/194825093-01671a40-4e1f-4802-8afb-67e1e66eeecf.jpg)



## Survey App


A React-based webapp that contains

- A Welcome Page
- A Survey Page besed upon [survey.js](https://surveyjs.io/)
- A "Digital Twin" Page that showcases the main idea of a digital twin with the help of a Lego model




## Survey Backend
A Postgres database that stores the survey answers, recipient comments and reactions and provides authorization to those who received an individual link.
More information on the backend can be found [here](/02-survey-backend/Readme.md)

## QR-Code Generator
A [python script](/03-qr-code-generator/qr_code_generator.ipynb) to generate QR codes to send individual links to survey recipients
