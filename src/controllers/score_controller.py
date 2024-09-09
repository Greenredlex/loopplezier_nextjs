import json
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from models.score_model import ScoreModel

router = APIRouter()

@router.post('/score_map')
async def calculate_score(request: Request):
    data = await request.json()
    scores = data['scores']
    
    gdf = ScoreModel.calculate_score(scores)
    
    return JSONResponse(content=json.loads(gdf.to_json()))
