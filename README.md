<p align="center">
  <img alt="Interactive Temtem Map" src="https://static.wikia.nocookie.net/temtem_gamepedia_en/images/6/63/Temtem_logo.png/revision/latest" />
  <h1 align="center"><b>Interactive Temtem Map</b></h1>
</p>

# Backend

Run Scrapy to extract the data from the [wiki](https://temtem.fandom.com/wiki/Temtem_Wiki) and index it into Elasticsearch.

```bash
python main.py
```

## Prerequisited

The following command will install the packages according to the configuration file [requirements.txt](backend/requirements.txt).

```bash
pip install -r requirements.txt
```

## Elasticsearch

A list of all published Docker images and tags is available at www.docker.elastic.co.

```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.1
```

To start a single-node Elasticsearch cluster for development or testing, specify single-node discovery to bypass the bootstrap checks.

```bash
docker run --name Elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.1
```

## Kibana

To start an Elasticsearch container for development or testing.

```
docker network create elastic
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.1
docker run --name Elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.1
```

To start Kibana and connect it to your Elasticsearch container, run the following commands in a terminal session.

```
docker pull docker.elastic.co/kibana/kibana:7.15.1
docker run --name Kibana --net elastic -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://localhost:9200" docker.elastic.co/kibana/kibana:7.15.1
```

# Frontend

`node@14.17.6` used to develop the interface.

| Script  | Description                                                   |
| ------- | ------------------------------------------------------------- |
| `dev`   | Starts the local development server on http://localhost:3000. |
| `build` | Build the server.                                             |
| `start` | Start the built server.                                       |

# External programs

[Tile cutter](https://github.com/tearat/tile-cutter-win-desktop) used to generate the interactive map.
