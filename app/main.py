from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from io import BytesIO
from fastapi import File, UploadFile
from PIL import Image


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"))

@app.get("/", response_class=HTMLResponse)
async def root():
    with open("index.html", 'r') as f:
        return f.read()

@app.post("/api/predict")
async def predict(image: UploadFile = File(...)):
    image_data = await image.read()
    pil_image = Image.open(BytesIO(image_data))
    pil_image.save('number.png')

    prohibilities = [0.2, 0.3, 0.5, 0, 0, 0, 0, 0, 0, 0]
    return {'prohibilities': prohibilities}