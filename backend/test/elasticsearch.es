DELETE /temtems

GET /temtems/_mapping

GET /temtems/_search
{
    "_source": [
        "name"
    ],
    "size": 200,
    "query": {
        "bool": {
            "must": [
                { "match": { "name": { "query": "chuve", "fuzziness": 2 } } }
            ]
        }
    }
}

GET /temtems/_search
{
    "_source": [
        "types.name"
    ],
    "size": 200,
    "query": {
        "bool": {
            "must": [
                { "match": { "types.name": "Wind type" } },
                { "match": { "types.name": "Digital type" } }
            ]
        }
    }
}

GET /temtems/_search
{
    "_source": [
        "genderRatio"
    ],
    "size": 200,
    "query": {
        "bool": {
            "must": [
                { "range": { "genderRatio": { "gte": 85 } } }
            ]
        }
    }
}

GET /temtems/_search
{
    "_source": [
        "TVs.HP",
        "TVs.DEF"
    ],
    "size": 200,
    "query": {
        "bool": {
            "must": [
                { "range": { "TVs.HP": { "gt": 0 } } },
                { "range": { "TVs.DEF": { "gt": 0 } } }
            ]
        }
    }
}

GET /temtems/_search
{
    "_source": false,
    "size": 200,
    "query": {
        "nested": {
            "path": "locations",
            "query": {
                "bool": {
                    "must": [
                        { "range": { "locations.frequency": { "gte": 100 } } }
                    ]
                }
            },
            "inner_hits": {
                "_source": [
                    "locations.frequency"
                ]
            }
        }
    }
}

GET /temtems/_search
{
    "_source": false,
    "size": 200,
    "query": {
        "nested": {
            "path": "locations",
            "query": {
                "bool": {
                    "must": [
                        { "range": { "locations.freeTem": { "gte": 400 } } }
                    ]
                }
            },
            "inner_hits": {
                "_source": [
                    "locations.freeTem"
                ]
            }
        }
    }
}

GET /temtems/_search
{
    "_source": false,
    "size": 1,
    "query": {
        "nested": {
            "path": "locations",
            "query": {
                "match_all" : { }
            },
            "inner_hits": {
                "sort": [{
                    "locations.freeTem": {
                        "order": "desc"
                    }
                }],
                
                "_source": [
                    "locations.freeTem"
                ]
            }
        }
    }
}

GET /temtems/_search
{
    "_source": false,
    "size": 200,
    "query": {
        "nested": {
            "path": "locations",
            "query": {
                "bool": {
                    "must": [
                        { "range": { "locations.minLevel": { "gte": 72 } } }
                    ]
                }
            },
            "inner_hits": {
                "_source": [
                    "locations.minLevel"
                ]
            }
        }
    }
}

GET /temtems/_search
{
    "_source": [
        "name",
        "types",
        "portrait",
        "genderRatio",
        "TVs"
    ],
    "size": 200,
    "query": {
        "bool": {
            "must": [
                { "match": { "genderRatio": 0 } },
                {
                    "nested": {
                        "path": "locations",
                        "query": {
                            "bool": {
                                "must": [
                                ]
                            }
                        },
                        "inner_hits": {
                            "_source": [
                                "locations.frequency",
                                "locations.freeTem",
                                "locations.minLevel",
                                "locations.maxLevel"
                            ]
                        }
                    }
                }
            ]
        }
    }
}
