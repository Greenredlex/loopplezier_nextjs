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
    # Dit is het format van de data die binnenkomt. 
    # Je kan print(data) callen om het te zien in je terminal.
    # {scores: 
    #  {'Score openbare verlichting': number, 
    #   'Score bomen': number, 
    #   'Score water': number, 
    #   'Score monumenten': number, 
    #   'Score drukke wegen': number, 
    #   'Score parken': number
    # }}

    print(data)

    gdf = gpd.read_feather('data/df_full.feather').to_crs('EPSG:4326')
    gdf = gdf.reset_index(drop = True)

    gdf = gpd.GeoDataFrame(gdf)
    full_geojson = gdf.to_json()


    # scores = data['scores']
    # scores['Score openbare verlichting'] += 2

    # print(scores)

    return jsonify(full_geojson)


if __name__ == '__main__':
    app.run(debug=True)
