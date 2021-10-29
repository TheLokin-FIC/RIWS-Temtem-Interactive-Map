import json
import math
import os

from temtem.items import LocationItem, TemtemItem, TypeItem


def freeTem(catchRate, level):
    return 20 + math.ceil((level / catchRate) * 270)


class JsonPipeline:
    def open_spider(self, spider):
        # Path folder for the scraped data
        self.path = f'{os.path.dirname(os.path.realpath(__file__))}/data'
        if not os.path.exists(self.path):
            os.makedirs(self.path)

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
        # Save the Temtem types scraped data
        with open(f'{self.path}/types.json', 'w') as file:
            file.write(json.dumps(self.types, indent=4, sort_keys=True))

        # Process the scrapped Temtem data
        for temtem in self.temtems.copy():
            # Add the locations where the wild Temtem can be found
            temtem['locations'] = [item.copy()
                                   for item in self.locations if item['temtem'] == temtem['name']]

            for location in temtem['locations']:
                # Calculate the pansuns obtained by releasing the Temtem if it is captured at this location
                location['freeTem'] = freeTem(
                    temtem['catchRate'], location['minLevel'])

                # Remove the Temtem name from location
                del location['temtem']

            # Remove the Temtem catchRate
            del temtem['catchRate']

        # Save the Temtems scraped data
        with open(f'{self.path}/temtems.json', 'w') as file:
            file.write(json.dumps(self.temtems, indent=4, sort_keys=True))
