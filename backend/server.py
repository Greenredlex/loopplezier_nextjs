from flask import Flask, request, jsonify
import geopandas as gpd
from functions import *
import matplotlib.cm as cm
import matplotlib.colors as mcolors

app = Flask(__name__)

gdf = None
scores = None

def style_function(feature):
    cmap = cm.RdYlGn  
    value = feature['properties']['Score'] 
    normalized_value = (0.5 * value) + 0.5
    color = mcolors.rgb2hex(cmap(normalized_value))  
    return {'color': color}

@app.route('/nodes')
def nodes_geojson():
    nodes = gpd.read_feather('data/nodes.feather').to_crs('EPSG:4326')
    nodes = nodes.reset_index().rename(columns={'osmid': 'knooppunt'})

    gdf = gpd.GeoDataFrame(nodes)
    nodes_geojson = gdf.to_json()

    return jsonify(nodes_geojson)

@app.route('/roads')
def df_geojson():
    gdf = gpd.read_feather('data/df_full.feather').to_crs('EPSG:4326')
    gdf = gdf.reset_index(drop=True)

    gdf = gpd.GeoDataFrame(gdf)
    full_geojson = gdf.to_json()

    return jsonify(full_geojson)

@app.route('/score_map', methods=['POST'])
def calculate_score():
    global gdf, scores  

    data = request.get_json()
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

    return gdf.to_json()

@app.route('/route', methods=['POST'])
def calculate_recommended_route():
    global gdf, scores  

    if gdf is None or scores is None:
        return jsonify({'error': 'Global variables not set'}), 400

    df_route, distance, score = calculate_route(gdf, 
                                                int(scores['Start knooppunt']), 
                                                int(scores['Eind knooppunt']), 
                                                int(scores['Minimale afstand']), 
                                                int(scores['Maximale afstand']))

    return df_route.to_json()

if __name__ == '__main__':
    app.run(debug=True)
