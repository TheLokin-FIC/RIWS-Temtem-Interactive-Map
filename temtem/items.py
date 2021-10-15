from scrapy import Field, Item


class TemtemItem(Item):
    number = Field()
    name = Field()
    types = Field()
    portrait = Field()
