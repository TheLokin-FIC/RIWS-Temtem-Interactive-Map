from scrapy import Field, Item


class TVField(Field):
    HP = Field()
    STA = Field()
    SPD = Field()
    ATK = Field()
    DEF = Field()
    SPATK = Field()
    SPDEF = Field()


class TemtemItem(Item):
    number = Field()
    name = Field()
    types = Field()
    portrait = Field()
    genderRatio = Field()
    catchRate = Field()
    TVs = TVField()


class TypeItem(Item):
    name = Field()
    icon = Field()


class LocationItem(Item):
    island = Field()
    route = Field()
    area = Field()
    temtem = Field()
    frequency = Field()
    minLevel = Field()
    maxLevel = Field()
