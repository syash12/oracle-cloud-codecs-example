# oracle-cloud-codecs-example
This project will be used to play around with Oracle Cloud Infrastructure and video/audio codecs. The project will have a frontend that records audio using your microphone and then lets you play it back. It will also send the data to a backend through REST APIs which will then transcribe the audio to text and return the text to be displayed.

## Frontend
The frontend is created using javascript/react and bootstrapped through `creact-react-app`. 
Run server by running `npm start` in the directory with the `package.json`.

## Backend
The backend is written in python/FastAPI. To start dev server just run 
`python main.py`. I also set up a venv to install dependancies, 
`python -m venv .venv`.

## Builds / Deployment
Currently the build process for both the frontend and backend is me running `docker build` and then pushing the images manually into my OCI Container Registry. Using Kubernetes to deploy the apps into the cloud. 

## Terraform
I have the oracle cloud infrastrcture configured in terraform. It should create an image repo, virtual networks/subnets, and a kubernetes cluster. 

## TODO
- fix microphone recording 