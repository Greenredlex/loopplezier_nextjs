import geopandas as gpd

class RoadModel:
    @staticmethod
    def get_roads():
        roads = gpd.read_feather('src/data/df_full.feather').to_crs('EPSG:4326')
        roads = roads.reset_index(drop=True)
        return roads
