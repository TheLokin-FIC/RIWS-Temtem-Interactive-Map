const { Client } = require('elasticsearch');

const baseURL = 'http://localhost:9200';
const size = 200;

const client = new Client({ host: baseURL });

const getTypes = async (typesSearch) => {
    let must = [];

    typesSearch.map((type) => {
        must.push(JSON.parse('{"match": {"types.name": "' + type + '"}}'));
    });

    let body = {
        _source: ['types.name'],
        size: size,
        query: {
            bool: {
                must,
            },
        },
    };

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

export default getTypes;
