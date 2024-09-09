from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.road_model import RoadModel

router = APIRouter()

@router.get('/roads')
async def roads_geojson():
    roads = RoadModel.get_roads()
    return JSONResponse(content=roads.to_json())
