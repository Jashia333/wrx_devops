from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import api

app = FastAPI(title="WRX API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allows localhost:3000 (Next.js) and others; tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.router)


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
