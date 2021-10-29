from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

process = CrawlerProcess(get_project_settings())


def scrap():
    process.crawl('temtems')
    # the script will block here until the crawling is finished
    process.start()


scrap()
