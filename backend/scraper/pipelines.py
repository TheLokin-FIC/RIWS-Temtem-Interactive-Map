import json
import os
from pathlib import Path

from scraper.items import LocationItem, TemtemItem, TypeItem


class JsonPipeline:
    def open_spider(self, spider):
        # List with the scraped Temtems
        self.temtems = []

        # List with the scraped types
        self.types = []

        # List with the scraped locations
        self.locations = []

    def process_item(self, item, spider):
        # If the item is a Temtem, add it to the Temtem list
        if isinstance(item, TemtemItem):
            self.temtems.append(dict(item))

        # If the item is a Temtem type, add it to the type list
        elif isinstance(item, TypeItem):
            self.types.append(dict(item))

        # If the item is a Temtem location, add it to the location list
        elif isinstance(item, LocationItem):
            self.locations.append(dict(item))

    def close_spider(self, spider):
        # Path folder for the scraped data
        path = Path(os.path.dirname(os.path.realpath(__file__))
                    ).parent.absolute().joinpath('data')

        # Save the scraped Temtems
        with open(os.path.join(path, 'temtems.json'), 'w') as file:
            file.write(json.dumps(self.temtems, indent=4, sort_keys=True))

        # Save the scraped Temtem types
        with open(os.path.join(path, 'types.json'), 'w') as file:
            file.write(json.dumps(self.types, indent=4, sort_keys=True))

        # Save the scraped Temtem locations
        with open(os.path.join(path, 'locations.json'), 'w') as file:
            file.write(json.dumps(self.locations, indent=4, sort_keys=True))
