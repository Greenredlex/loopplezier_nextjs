from flask import Flask, request, jsonify
import geopandas as gpd
from functions import *
import matplotlib.cm as cm
import matplotlib.colors as mcolors

app = Flask(__name__)

def style_function(feature):
	cmap = cm.RdYlGn  
	value = feature['properties']['Score'] 
	normalized_value = (0.5*value)+0.5
	color = mcolors.rgb2hex(cmap(normalized_value))  
	return {'color': color}


@app.route('/nodes')
def nodes_geojson():
    nodes = gpd.read_feather('data/nodes.feather').to_crs('EPSG:4326')
    nodes = nodes.reset_index().rename(columns = {'osmid' : 'knooppunt'})

    gdf = gpd.GeoDataFrame(nodes)
    nodes_geojson = gdf.to_json()

    return jsonify(nodes_geojson)

@app.route('/roads')
def df_geojson():
    gdf = gpd.read_feather('data/df_full.feather').to_crs('EPSG:4326')
    gdf = gdf.reset_index(drop = True)

    gdf = gpd.GeoDataFrame(gdf)
    full_geojson = gdf.to_json()

    return jsonify(full_geojson)

@app.route('/score', methods=['POST'])
def calculate_score():
    data = request.get_json()
    scores = data['scores']

    gdf = gpd.read_feather('data/df_full.feather').to_crs('EPSG:4326')
    gdf = gdf.reset_index(drop = True)    

    final_gdf = calculate_new_column(gdf,
                                     int(scores['Score openbare verlichting']),
                                     int(scores['Score bomen']),
                                     int(scores['Score water']),
                                     int(scores['Score monumenten']),
                                     int(scores['Score drukke wegen']),
                                     int(scores['Score parken']))

    df_route, distance, score = calculate_route(final_gdf, 
                                                int(scores['Start knooppunt']), 
                                                int(scores['Eind knooppunt']), 
                                                int(scores['Minimale afstand']), 
                                                int(scores['Maximale afstand']))

    # Return df_route for route and return final_gdf for entire map
    return df_route.to_json()


if __name__ == '__main__':
    app.run(debug=True)
