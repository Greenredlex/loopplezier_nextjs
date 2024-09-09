from fastapi import FastAPI
from controllers import node_controller, road_controller, score_controller, route_controller

app = FastAPI()

app.include_router(node_controller.router)
app.include_router(road_controller.router)
app.include_router(score_controller.router)
app.include_router(route_controller.router)
