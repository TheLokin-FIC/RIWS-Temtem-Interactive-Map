<br />
<div align="center">
  <h1 align="center">Temtem RIWS</h1>
</div>

# Table of contents

-   [Prerequisites](#prerequisites)

## Prerequisites

-   [Scrapy](https://scrapy.org/)

    ```bash
    pip install scrapy
    ```

-   [Elasticsearch](https://www.elastic.co/)
    ```bash
    docker pull docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    ```
    ```bash
    docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" --name ElasticSearch docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    ```
    ```bash
    pip install elasticsearch
    ```
