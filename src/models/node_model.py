import geopandas as gpd

class NodeModel:
    @staticmethod
    def get_nodes():
        nodes = gpd.read_feather('data/nodes.feather').to_crs('EPSG:4326')
        nodes = nodes.reset_index().rename(columns={'osmid': 'knooppunt'})
        return nodes  
