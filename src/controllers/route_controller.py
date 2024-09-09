import json
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from models.route_model import RouteModel

router = APIRouter()

@router.post('/route')
async def calculate_recommended_route(request: Request):
    data = await request.json()
    
    scores = data['scores']
    start_point = int(scores['Start knooppunt'])
    end_point = int(scores['Eind knooppunt'])
    min_distance = int(scores['Minimale afstand'])
    max_distance = int(scores['Maximale afstand'])

    df_route, distance, score = RouteModel.calculate_route(scores, start_point, end_point, min_distance, max_distance)

    return JSONResponse(content=json.loads(df_route.to_json()))
