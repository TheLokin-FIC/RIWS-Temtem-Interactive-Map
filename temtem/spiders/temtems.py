from scrapy import Spider
from temtem.items import TemtemItem


class TemtemSpider(Spider):
    name = 'temtem'
    start_urls = ['https://temtem.fandom.com/wiki/Temtem_(creatures)']

    def parse(self, response):
        links = response.css(
            'table.temtem-list > tbody > tr > td > span > a::attr(href)').extract()
        for link in links:
            yield response.follow(link, self.parse_temtem)

    def parse_temtem(self, response):
        temtem = TemtemItem()
        temtem['number'] = response.xpath(
            '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[4]/td/text()').extract_first().rstrip()
        temtem['name'] = response.xpath(
            '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[1]/th/text()').extract_first().rstrip()
        temtem['types'] = response.xpath(
            '//*[@id="mw-content-text"]/div/div[1]/table/tbody/tr[5]/td/a/@title').extract()
        temtem['portrait'] = response.xpath(
            '//*[@id="ttw-temtem"]/span/a/img/@src').extract()

        return temtem
