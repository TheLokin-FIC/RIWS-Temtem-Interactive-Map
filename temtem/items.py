from scrapy import Field, Item


class Locations(Item):
    routes = Field()
    islands = Field()
    rarities = Field()
    levels = Field()


class TemtemItem(Item):
    number = Field()
    name = Field()
    types = Field()
    portrait = Field()
    locations = Field()
