from flask import Flask, request, jsonify
import geopandas as gpd

app = Flask(__name__)

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
    score = data['score']


    new_score = int(score)*2

    
    result = {'status': 'Received', 'score': new_score}
    print(result)

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
