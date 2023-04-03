# oracle-cloud-codecs-example
This project will be used to play around with Oracle Cloud Infrastructure and video/audio codecs. 

## Frontend
The frontend is created using javascript/react and bootstrapped through `creact-react-app`. 
Run server by running `npm start` in the directory with the `package.json`

## Backend
The backend is written in python/FastAPI. To start dev server just run 
`python main.py`. I also set up a venv to install dependancies, 
`python -m venv .venv`.

## Things to improve
- use websockets instead of REST for better latency
- error handling
- add a makefile
- maybe shouldve used more than 1 branch
- 