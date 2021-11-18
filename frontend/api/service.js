const { Client } = require('elasticsearch');
const client = new Client({ host: 'localhost:9200' });

export async function getMaxFreeTem() {
    const res = await client.search({
        index: 'temtems',
        body: {
            _source: false,
            size: 0,
            aggs: {
                locations: {
                    nested: {
                        path: 'locations',
                    },
                    aggs: {
                        maxFreeTem: {
                            max: {
                                field: 'locations.freeTem',
                            },
                        },
                    },
                },
            },
        },
    });

    return res.aggregations.locations.maxFreeTem.value;
}

export async function getTemtems(
    name = undefined,
    types = undefined,
    genderRatio = undefined,
    TVs = undefined,
    minLevel = undefined,
    maxLevel = undefined,
    frequency = undefined,
    freeTem = undefined
) {
    const body = {
        _source: ['name', 'types', 'portrait', 'genderRatio', 'TVs'],
        size: 100,
        query: {
            bool: {
                must: [
                    {
                        nested: {
                            path: 'locations',
                            query: {
                                bool: {
                                    must: [],
                                },
                            },
                            inner_hits: {
                                _source: [
                                    'locations.route',
                                    'locations.frequency',
                                    'locations.freeTem',
                                    'locations.minLevel',
                                    'locations.maxLevel',
                                    'locations.position',
                                ],
                                size: 100,
                                sort: [
                                    {
                                        'locations.frequency': {
                                            order: 'desc',
                                        },
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        },
    };

    if (name !== undefined) {
        body.query.bool.must.push({
            match: { name: { query: name, fuzziness: 2 } },
        });
    }

    if (types != undefined) {
        types.map((type) =>
            body.query.bool.must.push({
                match: { 'types.name': type },
            })
        );
    }

    if (genderRatio !== undefined) {
        body.query.bool.must.push({ match: { genderRatio: genderRatio } });
    }

    if (TVs !== undefined) {
        TVs.map((TV) =>
            body.query.bool.must.push(
                JSON.parse('{ "range": { "TVs.' + TV + '": { "gt": 0 } } }')
            )
        );
    }

    if (minLevel !== undefined) {
        body.query.bool.must[0].nested.query.bool.must.push({
            range: { 'locations.minLevel': { gte: minLevel } },
        });
    }

    if (maxLevel !== undefined) {
        body.query.bool.must[0].nested.query.bool.must.push({
            range: { 'locations.maxLevel': { lte: maxLevel } },
        });
    }

    if (frequency !== undefined) {
        body.query.bool.must[0].nested.query.bool.must.push({
            range: { 'locations.frequency': { gte: frequency } },
        });
    }

    if (freeTem !== undefined) {
        body.query.bool.must[0].nested.query.bool.must.push({
            range: { 'locations.freeTem': { gte: freeTem } },
        });
    }

    const res = await client.search({
        index: 'temtems',
        body: body,
    });

    return res;
}

export function mergeHits(res) {
    return res.hits.hits.map((hits) => {
        const temtems = hits._source;
        temtems['locations'] = hits.inner_hits.locations.hits.hits.map(
            (inner_hit) => {
                return inner_hit._source;
            }
        );
        return temtems;
    });
}

export function mergeInnerHits(res) {
    return res.hits.hits
        .map((hits) => {
            return hits.inner_hits.locations.hits.hits.map((inner_hit) => {
                return Object.assign({}, hits._source, inner_hit._source);
            });
        })
        .flat();
}
