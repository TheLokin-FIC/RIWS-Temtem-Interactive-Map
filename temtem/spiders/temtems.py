from scrapy import Spider
from temtem.items import Locations, TemtemItem


class TemtemSpider(Spider):
    name = "temtem"
    start_urls = ["https://temtem.fandom.com/wiki/Mimit"]

    # def parse(self, response):
    #    links = response.css(
    #        "table.temtem-list > tbody > tr > td > span > a::attr(href)"
    #    ).extract()
    #    for link in links:
    #        yield response.follow(link, self.parse_temtem)

    def parse(self, response):
        temtem = TemtemItem()
        locations = Locations()

        locations["routes"] = []
        locations["islands"] = []
        locations["rarities"] = []
        locations["levels"] = []

        temtem["number"] = (
            response.xpath(
                '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[4]/td/text()'
            )
            .extract_first()
            .rstrip()
        )
        temtem["name"] = (
            response.xpath(
                '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[1]/th/text()'
            )
            .extract_first()
            .rstrip()
        )
        temtem["types"] = response.xpath(
            '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[5]/td/a/@title'
        ).extract()
        temtem["portrait"] = response.xpath(
            '//*[@id="ttw-temtem"]/span/a/img/@src'
        ).extract()

        for attr in response.xpath("//table[7]/tbody/tr/td[1]/a/@title").extract():
            locations["routes"].append(attr)

        for attr in response.xpath("//table[7]/tbody/tr/td[2]/a/@title").extract():
            locations["islands"].append(attr)

        for attr in response.xpath("//table[7]/tbody/tr/td[3]/text()").extract():
            locations["rarities"].append(attr.rstrip())

        for attr in response.xpath("//table[7]/tbody/tr/td[4]/text()").extract():
            locations["levels"].append(attr.rstrip())

        temtem["locations"] = locations

        return temtem
