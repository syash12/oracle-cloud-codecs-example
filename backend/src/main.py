from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/transcribe")
async def transcribe(request: Request):
    # get the uploaded file
    form = await request.form()
    audio = form["audio"].file

    # save the file to disk
    filename = form["audio"].filename
    file_path = os.path.join(filename)  # replace with the path where you want to save the file
    #with open(file_path, "wb") as f:
        #f.write(audio.read())
    print("ahhhh im writing to disk")

    return {"message": "audio file saved successfully"}


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)