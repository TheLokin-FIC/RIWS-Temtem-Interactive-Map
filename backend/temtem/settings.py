# Scrappy settings for Temtem project
BOT_NAME = 'temtem'

SPIDER_MODULES = ['temtem.spiders']
NEWSPIDER_MODULE = 'temtem.spiders'

# Configure item pipelines
ITEM_PIPELINES = {
    'temtem.pipelines.JsonPipeline': 1,
}
