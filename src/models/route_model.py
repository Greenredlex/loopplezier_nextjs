import geopandas as gpd
from functions import calculate_route

class RouteModel:
    @staticmethod
    def calculate_route(scores, start_point, end_point, min_distance, max_distance):
        gdf = gpd.read_feather('src/data/df_full.feather').to_crs('EPSG:4326')
        gdf = gdf.reset_index(drop=True)

        df_route, distance, score = calculate_route(gdf, start_point, end_point, min_distance, max_distance)
        
        return df_route, distance, score
