import json
import os

from elasticsearch import Elasticsearch, helpers

pathJSON = f'{os.path.dirname(os.path.realpath(__file__))}/temtem/data'

pathMappings = f'{os.path.dirname(os.path.realpath(__file__))}/mappings'

es = Elasticsearch("localhost:9200")


def json_to_var(directory):
    try:
        with open(directory, 'r', encoding='utf-8') as f:
            return json.loads(f.read())
    except:
        raise Exception("No se han encontrado los datos")


def gendata(docs, index):
    for doc in docs:
        yield {
            "_index": index+"s",
            index: doc,
        }

def create_index():

    mappingTypes = json_to_var(pathMappings + "/mappingTypes.json")

    mappingTemtems = json_to_var(pathMappings + "/mappingTemtems.json")

    es.indices.create(
        index="temtems",
        body=mappingTemtems,
        ignore=400
    )

    es.indices.create(
        index="types",
        body=mappingTypes,
        ignore=400
    )
    

def temtems():
    docsTemtem = json_to_var(pathJSON + '/temtems.json')
    helpers.bulk(es, gendata(docsTemtem, "temtem"), ignore_status=400)


def types():
    docsTypes = json_to_var(pathJSON + '/types.json')
    helpers.bulk(es, gendata(docsTypes, "type"), ignore_status=400)


def index():
    temtems()
    types()


create_index()
index()
