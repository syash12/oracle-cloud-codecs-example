from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/transcribe")
async def transcribe():
    return {"message": "ahhhh im transcribiiiiing"}


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)