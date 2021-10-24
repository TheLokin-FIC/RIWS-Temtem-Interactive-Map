# Scrappy settings for Temtem project
BOT_NAME = 'temtem'

SPIDER_MODULES = ['temtem.spiders']
NEWSPIDER_MODULE = 'temtem.spiders'

# Configure item pipelines
ITEM_PIPELINES = {
    'temtem.pipelines.JsonPipeline': 1,
}

# ELASTICSEARCH_SERVERS = ["http://localhost:9200"]
# ELASTICSEARCH_INDEX = "scrapy"
# ELASTICSEARCH_TYPE = "items"
# ELASTICSEARCH_UNIQ_KEY = "id"
