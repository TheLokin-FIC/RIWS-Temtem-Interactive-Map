import base64
import json
import math
import os

import requests
from elasticsearch.client import Elasticsearch
from elasticsearch.helpers.actions import streaming_bulk
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from scraper.spiders.wiki import WikiSpider


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
                                    'type': 'double',
                                    'index': 'false'
                                },
                                'lng': {
                                    'type': 'double',
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


def get_dataset():
    # Run the crawler process if the data is not scraped yet
    if not os.path.exists(os.path.join('data', 'elasticsearch.json')):
        process = CrawlerProcess(get_project_settings())
        process.crawl(WikiSpider)
        process.start()
        process_dataset()

    # Read the scraped data
    with open(os.path.join('data', 'elasticsearch.json'), 'r') as file:
        return json.loads(file.read())


def process_dataset():
    def get_as_base64(url):
        # Encode the image to base64
        return str(base64.b64encode(requests.get(url).content))[2:-1]

    def freeTem(catchRate, level):
        # Calculate the pansuns by releasing a Temtem based on its catch rate and its level
        return 20 + math.ceil((level / catchRate) * 270)

    # Read the Temtems data
    with open(os.path.join('data', 'temtems.json'), 'r') as file:
        temtems = json.loads(file.read())
        for temtem in temtems:
            temtem['portrait'] = get_as_base64(
                f'{temtem["portrait"]}/scale-to-width-down/30')

    # Read the Temtem types data
    with open(os.path.join('data', 'types.json'), 'r') as file:
        types = json.loads(file.read())
        for type in types:
            type['icon'] = get_as_base64(
                f'{type["icon"]}/scale-to-width-down/25')

    # Read the Temtem locations data
    with open(os.path.join('data', 'locations.json'), 'r') as file:
        locations = json.loads(file.read())

    # Read the Temtem geopositions data
    with open(os.path.join('data', 'geopositions.json'), 'r') as file:
        geopositions = json.loads(file.read())

    # Process the scraped data to generate a list of documents to index in Elasticsearch
    elasticsearch = []
    for temtem in temtems:
        try:
            document = {
                'number': temtem['number'],
                'name': temtem['name'],
                'types': [type.copy() for type in types if type['name'] in temtem['types']],
                'portrait': temtem["portrait"],
                'genderRatio': temtem['genderRatio'],
                'TVs': temtem['TVs'],
                'locations': [{
                    'route': location['route'],
                    'frequency': location['frequency'],
                    'freeTem': freeTem(temtem['catchRate'], location['minLevel']),
                    'minLevel': location['minLevel'],
                    'maxLevel': location['maxLevel'],
                    'position': geopositions[location['island']][location['route']][location['area']][temtem['name']]
                } for location in locations if temtem['name'] == location['temtem']]
            }

            if len(document['locations']) > 0:
                elasticsearch.append(document)

        except KeyError:
            continue

    # Save the list of documents to index in Elasticsearch
    with open(os.path.join('data', 'elasticsearch.json'), 'w') as file:
        file.write(json.dumps(elasticsearch, indent=4, sort_keys=True))


def generate_actions(data):
    # Generate the documents for Elasticsearch
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


if __name__ == '__main__':
    client = Elasticsearch(os.environ.get(
        'ELASTICSEARCH_SERVER', 'localhost:9200'))
    print('Creating an index...')
    create_index(client)

    print('Loading dataset...')
    data = get_dataset()

    print('Indexing documents...')
    successes = sum(ok for ok, _ in streaming_bulk(
        client=client, index='temtems', actions=generate_actions(data)))

    print(f'Indexed {successes}/{len(data)} documents')
