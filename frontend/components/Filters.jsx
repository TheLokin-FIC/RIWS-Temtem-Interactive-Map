import { Box } from '@mui/system';
import React from 'react';
import AccordionComponent from './AccordionComponent';
import FreeTem from './FreeTem';
import Frequency from './Frequency';
import Gender from './Gender';
import Levels from './Levels';
import Name from './Name';
import Tvs from './Tvs';
import Types from './Types';

const Filters = ({
    name,
    setName,
    gender,
    setGender,
    filterByGender,
    setFilterByGender,
    tvs,
    setTvs,
    filterByTvs,
    setFilterByTvs,
    levels,
    setLevels,
    filterByLevels,
    setFilterByLevels,
    types,
    setTypes,
    filterByTypes,
    setFilterByTypes,
    getTemtems,
    loading,
    filterByFrequency,
    setFilterByFrequency,
    frequency,
    setFrequency,
    filterByFreeTem,
    setFilterByFreeTem,
    freeTem,
    setFreeTem,
}) => {
    return (
        <Box>
            <Name
                loading={loading}
                getTemtems={getTemtems}
                name={name}
                setName={setName}
            />
            <AccordionComponent
                filterBy={filterByTypes}
                setFilterBy={setFilterByTypes}
                text={'Tipos'}
                Component={<Types types={types} setTypes={setTypes} />}
            />
            <AccordionComponent
                filterBy={filterByTvs}
                setFilterBy={setFilterByTvs}
                text={'Atributos'}
                Component={<Tvs tvs={tvs} setTvs={setTvs} />}
            />
            <AccordionComponent
                filterBy={filterByGender}
                setFilterBy={setFilterByGender}
                text={'Género'}
                Component={<Gender gender={gender} setGender={setGender} />}
            />
            <AccordionComponent
                filterBy={filterByFrequency}
                setFilterBy={setFilterByFrequency}
                text={'Frecuencia'}
                Component={
                    <Frequency
                        frequency={frequency}
                        setFrequency={setFrequency}
                    />
                }
            />
            <AccordionComponent
                filterBy={filterByFreeTem}
                setFilterBy={setFilterByFreeTem}
                text={'FreeTem'}
                Component={
                    <FreeTem freeTem={freeTem} setFreeTem={setFreeTem} />
                }
            />
            <AccordionComponent
                filterBy={filterByLevels}
                setFilterBy={setFilterByLevels}
                text={'Niveles'}
                Component={<Levels levels={levels} setLevels={setLevels} />}
            />
        </Box>
    );
};

export default Filters;
