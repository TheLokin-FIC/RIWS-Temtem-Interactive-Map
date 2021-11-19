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
                {
                    "match": {
                        "name": {
                            "query": "chuve",
                            "fuzziness": 2
                        }
                    }
                }
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
                {
                    "match": {
                        "types.name": "Wind type"
                    }
                },
                {
                    "match": {
                        "types.name": "Digital type"
                    }
                }
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
                {
                    "range": {
                        "genderRatio": {
                            "gte": 85
                        }
                    }
                }
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
                {
                    "range": {
                        "TVs.HP": {
                            "gt": 0
                        }
                    }
                },
                {
                    "range": {
                        "TVs.DEF": {
                            "gt": 0
                        }
                    }
                }
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
                        {
                            "range": {
                                "locations.frequency": {
                                    "gte": 100
                                }
                            }
                        }
                    ]
                }
            },
            "inner_hits": {
                "size": 100,
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
                        {
                            "range": {
                                "locations.freeTem": {
                                    "gte": 400
                                }
                            }
                        }
                    ]
                }
            },
            "inner_hits": {
                "_source": [
                    "locations.freeTem"
                ],
                "size": 100
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
                        {
                            "range": {
                                "locations.minLevel": {
                                    "gte": 50
                                }
                            }
                        }
                    ]
                }
            },
            "inner_hits": {
                "_source": [
                    "locations.minLevel"
                ],
                "size": 100
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
                        {
                            "range": {
                                "locations.maxLevel": {
                                    "lte": 25
                                }
                            }
                        }
                    ]
                }
            },
            "inner_hits": {
                "_source": [
                    "locations.maxLevel"
                ],
                "size": 100
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
                {
                    "match": {
                        "name": {
                            "query": "chuve",
                            "fuzziness": 2
                        }
                    }
                },
                {
                    "match": {
                        "types.name": "Digital type"
                    }
                },
                {
                    "match": {
                        "types.name": "Wind type"
                    }
                },
                {
                    "range": {
                        "genderRatio": {
                            "gte": 0
                        }
                    }
                },
                {
                    "range": {
                        "TVs.HP": {
                            "gt": 0
                        }
                    }
                },
                {
                    "range": {
                        "TVs.DEF": {
                            "gt": 0
                        }
                    }
                },
                {
                    "nested": {
                        "path": "locations",
                        "query": {
                            "bool": {
                                "must": [
                                    {
                                        "range": {
                                            "locations.frequency": {
                                                "gte": 0
                                            }
                                        }
                                    },
                                    {
                                        "range": {
                                            "locations.freeTem": {
                                                "gte": 0
                                            }
                                        }
                                    },
                                    {
                                        "range": {
                                            "locations.minLevel": {
                                                "gte": 40
                                            }
                                        }
                                    },
                                    {
                                        "range": {
                                            "locations.maxLevel": {
                                                "lte": 50
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        "inner_hits": {
                            "_source": [
                                "locations.frequency",
                                "locations.freeTem",
                                "locations.minLevel",
                                "locations.maxLevel",
                                "locations.position"
                            ],
                            "size": 100
                        }
                    }
                }
            ]
        }
    }
}

GET /temtems/_search
{
    "_source": false,
    "size": 0,
    "aggs": {
        "locations": {
            "nested": {
                "path": "locations"
            },
            "aggs": {
                "maxFreeTem": {
                    "max": {
                        "field": "locations.freeTem"
                    }
                }
            }
        }
    }
}