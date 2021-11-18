# Scrapy settings for the project
BOT_NAME = 'scraper'
SPIDER_MODULES = ['scraper.spiders']
NEWSPIDER_MODULE = 'scraper.spiders'
LOG_LEVEL = 'WARNING'

# Configuration for the item pipelines
ITEM_PIPELINES = {
    'scraper.pipelines.JsonPipeline': 1
}
