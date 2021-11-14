
from scraper.items import LocationItem, TemtemItem, TVField, TypeItem
from scrapy import Request, Spider


def unscaled_image(value):
    # Expression to fetch the URL of the image with the highest resolution
    return value.rstrip().split('scale')[0][:-1]


def get_url(response, value):
    # XPath expression to fetch the image URL from src
    url = response.xpath(f'{value}/@src').extract_first()

    # If the image is encoded in base64 the URL is extracted from the data-src
    if 'base64' in url:
        # XPath expression to fetch the image URL from data-src
        url = response.xpath(f'{value}/@data-src').extract_first()

    return unscaled_image(url)


def to_gender_ratio(value):
    # If the Temtem has no gender, it is assigned a negative value
    return -1 if value == 'N/A' else int(value.split(' ')[0][:-1])


def to_catch_rate(value):
    # If the catch rate is 0 it is corrected to 200 to avoid a division by zero
    return 200 if value == '0' else int(value)


def to_stat(value):
    # If the stat is not available, it is assigned to zero
    return int(0 if value is None else value.rstrip() or 0)


def to_level(value):
    levels = value.split('-')

    # If the Temtem does not have a minimum and maximum level, the level is returned by duplicate
    return [int(levels[0].rstrip()), int(levels[1].rstrip())] if len(levels) == 2 else [int(value), int(value)]


class WikiSpider(Spider):
    name = 'wiki'
    start_urls = ['https://temtem.fandom.com/wiki/Temtem_(creatures)']

    def parse(self, response):
        # XPath expression to fetch the Temtem list
        links = response.xpath(
            '//table[contains(@class, "temtem-list")]/tbody/tr/td[2]/a/@href').extract()

        # Loop through the Temtem list to get the details of each
        for link in links:
            yield Request(f'https://temtem.fandom.com{link}', self.parse_temtem)

    def parse_temtem(self, response):
        # Unobtainable or unreleased Temtems will not be scraped
        if response.xpath(
                '//table[contains(@class, "ambox")]/tbody/tr/td[1]/a/img/@alt').extract_first() is not None:
            return

        # The item to store Temtem information
        temtem = TemtemItem()

        # XPath expression to fetch the Temtem number
        temtem['number'] = int(response.xpath(
            '//table[contains(@class, "infobox-table")]/tbody/tr[4]/td/text()').extract_first().rstrip()[1:])

        # XPath expression to fetch the Temtem name
        temtem['name'] = response.xpath(
            '//table[contains(@class, "infobox-table")]/tbody/tr[1]/th/text()').extract_first().rstrip()

        # XPath expression to fetch the Temtem types
        temtem['types'] = [type.rstrip() for type in response.xpath(
            '//table[contains(@class, "infobox-table")]/tbody/tr[5]/td/a/@title').extract()]

        # XPath expression to fetch the Temtem portrait
        temtem['portrait'] = get_url(
            response, '//div[contains(@id, "ttw-temtem")]/span/a/img')

        # The Temtem has neither evolution nor pre-evolution
        if 'Technical Details' in response.xpath(
                '//table[contains(@class, "infobox-table")]/tbody/tr[6]/td/text()').extract_first():

            # XPath expression to fetch the Temtem gender ratio
            temtem['genderRatio'] = to_gender_ratio(response.xpath(
                '//table[contains(@class, "infobox-table")]/tbody/tr[7]/td/text()').extract_first().rstrip())

            # XPath expression to fetch the Temtem catch rate
            temtem['catchRate'] = to_catch_rate(response.xpath(
                '//table[contains(@class, "infobox-table")]/tbody/tr[8]/td/text()').extract_first().rstrip())

        # The Temtem has evolution or pre-evolution
        elif 'Technical Details' in response.xpath(
                '//table[contains(@class, "infobox-table")]/tbody/tr[8]/td/text()').extract_first():

            # XPath expression to fetch the Temtem gender ratio
            temtem['genderRatio'] = to_gender_ratio(response.xpath(
                '//table[contains(@class, "infobox-table")]/tbody/tr[9]/td/text()').extract_first().rstrip())

            # XPath expression to fetch the Temtem catch rate
            temtem['catchRate'] = to_catch_rate(response.xpath(
                '//table[contains(@class, "infobox-table")]/tbody/tr[10]/td/text()').extract_first().rstrip())

        # The Temtem has evolution and pre-evolution
        else:

            # XPath expression to fetch the Temtem gender ratio
            temtem['genderRatio'] = to_gender_ratio(response.xpath(
                '//table[contains(@class, "infobox-table")]/tbody/tr[8]/td/text()').extract_first().rstrip())

            # XPath expression to fetch the Temtem catch rate
            temtem['catchRate'] = to_catch_rate(response.xpath(
                '//table[contains(@class, "infobox-table")]/tbody/tr[9]/td/text()').extract_first().rstrip())

        # Expression to fetch the Temtem TVs information
        temtem['TVs'] = self.parse_TVs(response)

        # XPath expression to fetch the Temtem type list
        links = response.xpath(
            '//table[contains(@class, "infobox-table")]/tbody/tr[5]/td/a/@href').extract()

        # Loop through the Temtem type list to get the details of each
        for link in links:
            yield Request(f'https://temtem.fandom.com{link}', self.parse_type)

        # XPath expression to fetch the Temtem location list
        links = response.xpath(
            '//table[contains(@class, "locationTable")]/tbody/tr/td[1]/a/@href').extract()

        # XPath expression to fetch the location island list
        islands = response.xpath(
            '//table[contains(@class, "locationTable")]/tbody/tr/td[2]/a/text()').extract()

        # Loop through the Temtem location list to get the details of each
        for link, island in zip(links, islands):
            yield Request(f'https://temtem.fandom.com{link}', self.parse_location, cb_kwargs=dict(island=island.rstrip()))

        yield temtem

    def parse_TVs(self, response):
        # The field to store Temtem TVs information
        tvs = TVField()

        # XPath expression to fetch the HP of the Temtem TV
        tvs['HP'] = to_stat(response.xpath(
            '//table[contains(@class, "tv-table")]/tbody/tr/td[1]/text()').extract_first())

        # XPath expression to fetch the STA of the Temtem TV
        tvs['STA'] = to_stat(response.xpath(
            '//table[contains(@class, "tv-table")]/tbody/tr/td[2]/text()').extract_first())

        # XPath expression to fetch the SPD of the Temtem TV
        tvs['SPD'] = to_stat(response.xpath(
            '//table[contains(@class, "tv-table")]/tbody/tr/td[3]/text()').extract_first())

        # XPath expression to fetch the ATK of the Temtem TV
        tvs['ATK'] = to_stat(response.xpath(
            '//table[contains(@class, "tv-table")]/tbody/tr/td[4]/text()').extract_first())

        # XPath expression to fetch the DEF of the Temtem TV
        tvs['DEF'] = to_stat(response.xpath(
            '//table[contains(@class, "tv-table")]/tbody/tr/td[5]/text()').extract_first())

        # XPath expression to fetch the SPATK of the Temtem TV
        tvs['SPATK'] = to_stat(response.xpath(
            '//table[contains(@class, "tv-table")]/tbody/tr/td[6]/text()').extract_first())

        # XPath expression to fetch the SPDEF of the Temtem TV
        tvs['SPDEF'] = to_stat(response.xpath(
            '//table[contains(@class, "tv-table")]/tbody/tr/td[7]/text()').extract_first())

        return tvs

    def parse_type(self, response):
        # The item to store Temtem type information
        type = TypeItem()

        # XPath expression to fetch the name of the Temtem type
        type['name'] = response.xpath(
            '//table[contains(@class, "infobox-table")]/tbody/tr[1]/th/text()').extract_first().rstrip()

        # XPath expression to fetch the icon of the Temtem type
        type['icon'] = get_url(
            response, '//table[contains(@class, "infobox-table")]/tbody/tr[2]/td/span/a/img')

        return type

    def parse_location(self, response, island):
        # XPath expression to fetch the location route
        route = response.xpath(
            '//table[contains(@class, "infobox-table")]/tbody/tr[1]/th/text()').extract_first().rstrip()

        # XPath expression to fetch the location areas
        areas = response.xpath(
            '//div[contains(@class, "tabber")]/div/table/tbody/tr[1]/td/b/text()').extract()

        # Loop through the Temtem location areas to get the details of each
        for i, area in enumerate(areas):
            # The Temtems obtained by quests will not be scraped
            if not 'Area' in area:
                return

            area = area.rstrip()

            # XPath expression to fetch the Temtems in the location
            temtems = response.xpath(
                f'//div[contains(@class, "tabber")]/div[{2+i}]/table/tbody/tr[3]/td[2]/table/tbody/tr[1]/td/a/span/text()').extract()

            # The Temtem frequency can be different in some locations
            if route == 'Iwaba' and area == 'Area 3':
                # XPath expression to fetch the Temtem frequencies in the location
                frequencies = response.xpath(
                    f'//div[contains(@class, "tabber")]/div[{2+i}]/table/tbody/tr[3]/td[2]/table/tbody/tr[4]/td/abbr[2]/text()').extract()

            else:
                # XPath expression to fetch the Temtem frequencies in the location
                frequencies = response.xpath(
                    f'//div[contains(@class, "tabber")]/div[{2+i}]/table/tbody/tr[3]/td[2]/table/tbody/tr[4]/td/text()').extract()

            # XPath expression to fetch the Temtem levels in the location
            levels = response.xpath(
                f'//div[contains(@class, "tabber")]/div[{2+i}]/table/tbody/tr[3]/td[2]/table/tbody/tr[5]/td/text()').extract()

            # Loop through the Temtems in the location area to map the details of each
            for temtem, frequency, level in zip(temtems, frequencies, levels):
                # The item to store Temtem location information
                location = LocationItem()

                location['island'] = island
                location['route'] = route
                location['area'] = area
                location['temtem'] = temtem.rstrip()
                location['frequency'] = int(frequency.rstrip()[:-1])
                levels = to_level(level.rstrip())
                location['minLevel'] = levels[0]
                location['maxLevel'] = levels[1]

                yield location
