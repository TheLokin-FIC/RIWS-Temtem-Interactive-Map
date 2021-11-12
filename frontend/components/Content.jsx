import { Box } from '@mui/system';
import React, { useState } from 'react';
import { getTemtems } from '../backend/service';
import Filters from './Filters';
import Result from './Result';

const Content = () => {
    const nameDefault = '';
    const levelsDefault = [0, 100];
    const typesDefault = [];
    const tvsDefault = [];
    const genderDefault = 50;
    const frequencyDefault = 50;
    const freeTemDefault = 0;

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(nameDefault);
    const [temtems, setTemtems] = useState([]);
    const [levels, setLevels] = React.useState(levelsDefault);
    const [types, setTypes] = useState(typesDefault);
    const [tvs, setTvs] = useState(tvsDefault);
    const [gender, setGender] = useState(genderDefault);
    const [frequency, setFrequency] = useState(frequencyDefault);
    const [freeTem, setFreeTem] = useState(freeTemDefault);

    const getTemtemsAction = () => {
        setLoading(true);
        setTimeout(function () {
            checkFilters();
        }, 1000);
        getTemtems({
            name,
            gender,
            filterByGender,
            levels,
            types,
            tvs,
            frequency,
            filterByFrequency,
            freeTem,
        }).then((response) => {
            setTemtems(response);
            setLoading(false);
        });
    };

    const checkFilters = () => {
        if (!filterByGender) {
            setGender(genderDefault);
        }
        if (!filterByFreeTem) {
            setFreeTem(freeTemDefault);
        }
        if (!filterByLevels) {
            setLevels(levelsDefault);
        }
        if (!filterByTvs) {
            setTvs(tvsDefault);
        }
        if (!filterByTypes) {
            setTypes(typesDefault);
        }
        if (!filterByFrequency) {
            setFrequency(frequencyDefault);
        }
    };

    const [filterByTvs, setFilterByTvs] = React.useState(false);
    const [filterByTypes, setFilterByTypes] = React.useState(false);
    const [filterByLevels, setFilterByLevels] = React.useState(false);
    const [filterByGender, setFilterByGender] = React.useState(false);
    const [filterByFrequency, setFilterByFrequency] = React.useState(false);
    const [filterByFreeTem, setFilterByFreeTem] = React.useState(false);

    return (
        <Box sx={{ minHeight: '101vh' }}>
            <Filters
                filterByFreeTem={filterByFreeTem}
                setFilterByFreeTem={setFilterByFreeTem}
                freeTem={freeTem}
                setFreeTem={setFreeTem}
                filterByFrequency={filterByFrequency}
                setFilterByFrequency={setFilterByFrequency}
                frequency={frequency}
                setFrequency={setFrequency}
                getTemtems={getTemtemsAction}
                setGender={setGender}
                gender={gender}
                name={name}
                setName={setName}
                types={types}
                setTypes={setTypes}
                tvs={tvs}
                setTvs={setTvs}
                setLevels={setLevels}
                levels={levels}
                filterByTvs={filterByTvs}
                setFilterByTvs={setFilterByTvs}
                filterByTypes={filterByTypes}
                setFilterByTypes={setFilterByTypes}
                filterByLevels={filterByLevels}
                setFilterByLevels={setFilterByLevels}
                filterByGender={filterByGender}
                setFilterByGender={setFilterByGender}
                loading={loading}
            />
            <Result temtems={temtems} />
        </Box>
    );
};

export default Content;
