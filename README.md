# oracle-cloud-codecs-example
This project will be used to play around with Oracle Cloud Infrastructure and video/audio codecs. 

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
I have the oracle cloud infrastrcture coded in terraform. It should create an image repo, virtual networks/subnets, and a kubernetes cluster. 