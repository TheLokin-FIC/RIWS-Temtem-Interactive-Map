import { Box } from '@mui/system';
import { useState } from 'react';
import { getTemtems } from '../api/service';
import AccordionComponent from './AccordionComponent';
import FreeTem from './filters/FreeTem';
import Frequency from './filters/Frequency';
import GenderRatio from './filters/GenderRatio';
import Levels from './filters/Level';
import Name from './filters/Name';
import Tvs from './filters/TV';
import Type from './filters/Type';
import Result from './Result';

export default function Content({ map, markerRefs, temtems, setTemtems }) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');

    const [types, setTypes] = useState([]);
    const [expandedTypes, setExpandedTypes] = useState(false);

    const [genderRatio, setGenderRatio] = useState(50);
    const [expandedGenderRatio, setExpandedGenderRatio] = useState(false);

    const [TVs, setTVs] = useState([]);
    const [expandedTVs, setExpandedTVs] = useState(false);

    const [levels, setLevels] = useState([0, 100]);
    const [expandedLevels, setExpandedLevels] = useState(false);

    const [frequency, setFrequency] = useState(50);
    const [expandedFrequency, setExpandedFrequency] = useState(false);

    const [freeTem, setFreeTem] = useState(0);
    const [expandedFreeTem, setExpandedFreeTem] = useState(false);

    return (
        <Box sx={{ minHeight: '101vh' }}>
            <Box>
                <Name
                    name={name}
                    setName={setName}
                    onClick={() => {
                        setLoading(true);
                        getTemtems(
                            name !== '' ? name : undefined,
                            expandedTypes ? types : undefined,
                            expandedGenderRatio ? genderRatio : undefined,
                            expandedTVs ? TVs : undefined,
                            expandedLevels ? levels[0] : undefined,
                            expandedLevels ? levels[1] : undefined,
                            expandedFrequency ? frequency : undefined,
                            expandedFreeTem ? freeTem : undefined
                        ).then((temtems) => {
                            setTemtems(temtems);
                            setLoading(false);
                        });
                    }}
                    loading={loading}
                />
                <AccordionComponent
                    text={'Type'}
                    details={<Type types={types} setTypes={setTypes} />}
                    expanded={expandedTypes}
                    setExpanded={setExpandedTypes}
                />
                <AccordionComponent
                    text={'Gender Ratio'}
                    details={
                        <GenderRatio
                            genderRatio={genderRatio}
                            setGenderRatio={setGenderRatio}
                        />
                    }
                    expanded={expandedGenderRatio}
                    setExpanded={setExpandedGenderRatio}
                />
                <AccordionComponent
                    text={'TV Yield'}
                    details={<Tvs TVs={TVs} setTVs={setTVs} />}
                    expanded={expandedTVs}
                    setExpanded={setExpandedTVs}
                />
                <AccordionComponent
                    text={'Level'}
                    details={<Levels levels={levels} setLevels={setLevels} />}
                    expanded={expandedLevels}
                    setExpanded={setExpandedLevels}
                />
                <AccordionComponent
                    text={'Frequency'}
                    details={
                        <Frequency
                            frequency={frequency}
                            setFrequency={setFrequency}
                        />
                    }
                    expanded={expandedFrequency}
                    setExpanded={setExpandedFrequency}
                />
                <AccordionComponent
                    text={'FreeTem'}
                    details={
                        <FreeTem freeTem={freeTem} setFreeTem={setFreeTem} />
                    }
                    expanded={expandedFreeTem}
                    setExpanded={setExpandedFreeTem}
                />
            </Box>
            <Result map={map} markerRefs={markerRefs} temtems={temtems} />
        </Box>
    );
}
