import json
import os

from elasticsearch import Elasticsearch, helpers

pathJSON = f'{os.path.dirname(os.path.realpath(__file__))}/temtem/data'

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


def temtems():
    docsTemtem = json_to_var(pathJSON + '/temtems.json')
    helpers.bulk(es, gendata(docsTemtem, "temtem"))


def types():
    docsTypes = json_to_var(pathJSON + '/types.json')
    helpers.bulk(es, gendata(docsTypes, "type"))


def index():
    temtems()
    types()


index()
