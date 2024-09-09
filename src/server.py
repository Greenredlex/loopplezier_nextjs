import json
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
import geopandas as gpd
from functions import *

app = FastAPI()

gdf = None
scores = None

@app.get('/nodes')
async def nodes_geojson():
    nodes = gpd.read_feather('data/nodes.feather').to_crs('EPSG:4326')
    nodes = nodes.reset_index().rename(columns={'osmid': 'knooppunt'})

    gdf = gpd.GeoDataFrame(nodes)
    nodes_geojson = gdf.to_json()

    return JSONResponse(content=nodes_geojson)

@app.get('/roads')
async def df_geojson():
    gdf = gpd.read_feather('data/df_full.feather').to_crs('EPSG:4326')
    gdf = gdf.reset_index(drop=True)

    gdf = gpd.GeoDataFrame(gdf)
    full_geojson = gdf.to_json()

    return JSONResponse(content=full_geojson)

@app.post('/score_map')
async def calculate_score(request: Request):
    global gdf, scores  

    data = await request.json()
    scores = data['scores']  

    gdf = gpd.read_feather('data/df_full.feather').to_crs('EPSG:4326')
    gdf = gdf.reset_index(drop=True)
    gdf = calculate_new_column(gdf,
                               int(scores['Score openbare verlichting']),
                               int(scores['Score bomen']),
                               int(scores['Score water']),
                               int(scores['Score monumenten']),
                               int(scores['Score drukke wegen']),
                               int(scores['Score parken']))

    return JSONResponse(content=json.loads(gdf.to_json()))

@app.post('/route')
async def calculate_recommended_route(request: Request):
    global gdf, scores  

    if gdf is None or scores is None:
        raise HTTPException(status_code=400, detail="Global variables not set")

    data = await request.json()

    df_route, distance, score = calculate_route(gdf, 
                                                int(scores['Start knooppunt']), 
                                                int(scores['Eind knooppunt']), 
                                                int(scores['Minimale afstand']), 
                                                int(scores['Maximale afstand']))

    return JSONResponse(content=json.loads(df_route.to_json()))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("server:app", host='0.0.0.0', port=8000, reload=True)

