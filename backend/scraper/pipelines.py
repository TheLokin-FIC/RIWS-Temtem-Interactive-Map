import json
import math
import os
from pathlib import Path

from scraper.items import LocationItem, TemtemItem, TypeItem


def freeTem(catchRate, level):
    # Calculate the pansuns by releasing a Temtem based on its catch rate and its level
    return 20 + math.ceil((level / catchRate) * 270)


class JsonPipeline:
    def open_spider(self, spider):
        # Lists with the scraped items
        self.temtems = []
        self.types = []
        self.locations = []

    def process_item(self, item, spider):
        if isinstance(item, TemtemItem):
            self.temtems.append(dict(item))

        elif isinstance(item, TypeItem):
            self.types.append(dict(item))

        elif isinstance(item, LocationItem):
            self.locations.append(dict(item))

    def close_spider(self, spider):
        # Process the scraped data
        for temtem in self.temtems.copy():
            # Add the Temtem types
            temtem['types'] = [item.copy()
                               for item in self.types if item['name'] in temtem['types']]

            # Add the locations where the wild Temtem can be found
            temtem['locations'] = [item.copy()
                                   for item in self.locations if item['temtem'] == temtem['name']]

            for location in temtem['locations']:
                # Calculate the pansuns obtained by releasing the Temtem if it is captured at this location
                location['freeTem'] = freeTem(
                    temtem['catchRate'], location['minLevel'])

                # Remove the Temtem name from location
                del location['temtem']

            # Remove the Temtem catch rate
            del temtem['catchRate']

        # Path folder for the scraped data
        path = Path(os.path.dirname(os.path.realpath(__file__))
                    ).parent.absolute().joinpath('data')

        # Create the folder for the scraped data if it does not exist
        if not os.path.exists(path):
            os.makedirs(path)

        # Save the scraped data
        with open(os.path.join(path, 'temtems.json'), 'w') as file:
            file.write(json.dumps(self.temtems, indent=2, sort_keys=True))