import geopandas as gpd
from functions import calculate_new_column

class ScoreModel:
    @staticmethod
    def calculate_score(scores):
        gdf = gpd.read_feather('data/df_full.feather').to_crs('EPSG:4326')
        gdf = gdf.reset_index(drop=True)
        
        gdf = calculate_new_column(
            gdf,
            int(scores['Score openbare verlichting']),
            int(scores['Score bomen']),
            int(scores['Score water']),
            int(scores['Score monumenten']),
            int(scores['Score drukke wegen']),
            int(scores['Score parken'])
        )
        
        return gdf