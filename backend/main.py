import json
import os
from pathlib import Path

from elasticsearch.client import Elasticsearch
from elasticsearch.helpers.actions import streaming_bulk
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from scraper.spiders.wiki import WikiSpider

settings = get_project_settings()


def get_dataset():
    # Path folder with the scraped data
    path = Path(os.path.dirname(os.path.realpath(__file__))
                ).joinpath('data', 'temtems.json')

    # Run the crawler process
    process = CrawlerProcess(settings)
    process.crawl(WikiSpider)
    process.start()

    # Read the scraped data
    with open(path, 'r') as file:
        return json.loads(file.read())


def create_index(client):
    # Create an index in Elasticsearch if it is not already there
    client.indices.create(index='temtems', ignore=400)
    client.indices.put_mapping(
        index='temtems',
        body={
            'properties': {
                'name': {
                    'type': 'text'
                },
                'types': {
                    'properties': {
                        'name': {
                            'type': 'keyword'
                        },
                        'icon': {
                            'type': 'keyword',
                            'index': 'false'
                        }
                    }
                },
                'portrait': {
                    'type': 'keyword',
                    'index': 'false'
                },
                'genderRatio': {
                    'type': 'byte'
                },
                'TVs': {
                    'properties': {
                        'HP': {
                            'type': 'byte'
                        },
                        'STA': {
                            'type': 'byte'
                        },
                        'SPD': {
                            'type': 'byte'
                        },
                        'ATK': {
                            'type': 'byte'
                        },
                        'DEF': {
                            'type': 'byte'
                        },
                        'SPATK': {
                            'type': 'byte'
                        },
                        'SPDEF': {
                            'type': 'byte'
                        }
                    }
                },
                'locations': {
                    'type': 'nested',
                    'properties': {
                        'route': {
                            'type': 'text',
                            'index': 'false'
                        },
                        'frequency': {
                            'type': 'byte'
                        },
                        'freeTem': {
                            'type': 'short'
                        },
                        'minLevel': {
                            'type': 'byte'
                        },
                        'maxLevel': {
                            'type': 'byte',
                        },
                        'position': {
                            'properties': {
                                'lat': {
                                    'type': 'long',
                                    'index': 'false'
                                },
                                'lng': {
                                    'type': 'long',
                                    'index': 'false'
                                }
                            }
                        }
                    }
                }
            }
        },
        ignore=400
    )


def generate_actions(data):
    # Processes the documents for Elasticsearch
    for temtem in data:
        yield {
            '_id': temtem['number'],
            'name': temtem['name'],
            'types': temtem['types'],
            'portrait': temtem['portrait'],
            'genderRatio': temtem['genderRatio'],
            'TVs': temtem['TVs'],
            'locations': temtem['locations']
        }


def main():
    print('Loading dataset...')
    data = get_dataset()

    client = Elasticsearch(settings.get('ELASTICSEARCH_SERVER'))
    print('Creating an index...')
    create_index(client)

    print('Indexing documents...')
    successes = sum(ok for ok, _ in streaming_bulk(
        client=client, index='temtems', actions=generate_actions(data)))

    print(f'Indexed {successes}/{len(data)} documents')


if __name__ == '__main__':
    main()
