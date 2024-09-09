from fastapi import APIRouter
from fastapi.responses import JSONResponse
from models.node_model import NodeModel

router = APIRouter()

@router.get('/nodes')
async def nodes_geojson():
    nodes = NodeModel.get_nodes()
    return JSONResponse(content=nodes.to_json())
