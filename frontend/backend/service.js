const { Client } = require('elasticsearch');

const baseURL = 'http://localhost:9200';
const size = 200;

const client = new Client({ host: baseURL });

const inizializeQuery = () => {
    return {
        size: size,
        _source: ['name', 'types', 'portrait', 'genderRatio', 'TVs'],
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
                                size: 100,
                                _source: [
                                    "locations.position",
                                    'locations.area',
                                    'locations.route',
                                    'locations.frequency',
                                    'locations.freeTem',
                                    'locations.minLevel',
                                    'locations.maxLevel',
                                ],
                            },
                        },
                    },
                ],
            },
        },
    };
};

const queryTvs = (body, tvs) => {
    tvs.map((tv) => {
        body.query.bool.must.push(
            JSON.parse('{ "range": { "TVs.' + tv + '": { "gt": ' + 0 + '}}}')
        );
    });
};

const queryTypes = (body, types) => {
    types.map((type) => {
        body.query.bool.must.push(
            JSON.parse('{"match": {"types.name": "' + type + '"}}')
        );
    });
};

const queryName = (body, name) => {
    body.query.bool.must.push({
        match: { name: { query: name, fuzziness: 2 } },
    });
};

const queryGender = (body, gender) => {
    body.query.bool.must.push({ match: { genderRatio: gender } });
};

const queryLevels = (body, levels) => {
    body.query.bool.must[0].nested.query.bool.must.push(
        JSON.parse(
            '{ "range": { "locations.minLevel": { "gte": ' + levels[0] + '}}}'
        )
    );
    body.query.bool.must[0].nested.query.bool.must.push(
        JSON.parse(
            '{ "range": { "locations.maxLevel": { "lte": ' + levels[1] + '}}}'
        )
    );
};

const queryFrequency = (body, frequency) => {
    body.query.bool.must[0].nested.query.bool.must.push(
        JSON.parse(
            '{ "range": { "locations.frequency": { "gte": ' + frequency + '}}}'
        )
    );
};

const queryFreeTem = (body, freeTem) => {
    body.query.bool.must[0].nested.query.bool.must.push(
        JSON.parse(
            '{ "range": { "locations.freeTem": { "gte": ' + freeTem + '}}}'
        )
    );
};

export const getTemtems = async ({
    name,
    gender,
    filterByGender,
    levels,
    types,
    tvs,
    frequency,
    filterByFrequency,
    freeTem,
}) => {
    let body = inizializeQuery();
    if (name.trim() !== '') queryName(body, name);
    if (filterByGender) queryGender(body, gender);
    if (filterByFrequency) queryFrequency(body, frequency);
    queryTypes(body, types);
    queryLevels(body, levels);
    queryTvs(body, tvs);
    queryFreeTem(body, freeTem);

    try {
        const resp = await client.search({
            index: 'temtems',
            body: body,
        });
        return resp.hits.hits;
    } catch (err) {
        console.trace(err.message);
    }
};

export const getMaxFreeTem = async () => {
    let body = {
        _source: false,
        size: 1,
        query: {
            nested: {
                path: 'locations',
                query: {
                    match_all: {},
                },
                inner_hits: {
                    sort: [
                        {
                            'locations.freeTem': {
                                order: 'desc',
                            },
                        },
                    ],

                    _source: ['locations.freeTem'],
                },
            },
        },
    };

    try {
        const resp = await client.search({
            index: 'temtems',
            body: body,
        });
        return resp.hits.hits[0].inner_hits.locations.hits.hits[0]._source
            .freeTem;
    } catch (err) {
        console.trace(err.message);
    }
};
