import Image from 'next/image';
import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import Icon from './Icon';

const TemtemMarkers = ({ temtems, setMarkerRefs }) => {
    const bindMarker = (ref) => {
        //    setMarkerRefs((prev) => [...prev, ref]);
    };

    return (
        <>
            {temtems.map((temtem) =>
                temtem.inner_hits.locations.hits.hits.map((location) => (
                    <Marker
                        key={
                            location._source.position.lat +
                            temtem._source.name +
                            location._source.position.lng
                        }
                        position={location._source.position}
                        icon={Icon(temtem._source.portrait)}
                        ref={bindMarker}
                    >
                        <TemtemPopup
                            name={temtem._source.name}
                            types={temtem._source.types}
                            genderRatio={temtem._source.genderRatio}
                            frequency={location._source.frequency}
                            minLevel={location._source.minLevel}
                            maxLevel={location._source.maxLevel}
                            freeTem={location._source.freeTem}
                            TVs={temtem._source.TVs}
                        />
                    </Marker>
                ))
            )}
        </>
    );
};

export default TemtemMarkers;

class TemtemPopup extends Component {
    render() {
        const {
            name,
            types,
            genderRatio,
            frequency,
            minLevel,
            maxLevel,
            freeTem,
            TVs,
        } = this.props;

        return (
            <Popup closeButton={false} style={{ width: '250px !important' }}>
                <table className="popup-table">
                    <tbody>
                        <tr>
                            <th className="popup-header" colSpan={2}>
                                {name}
                            </th>
                        </tr>
                        <tr>
                            <th className="popup-row-name">
                                {types.length === 1 ? (
                                    <b>Type</b>
                                ) : (
                                    <b>Types</b>
                                )}
                            </th>
                            <td className="popup-row-value">
                                {types.map((type) => (
                                    <Image
                                        key={name + type.name}
                                        alt={type.name}
                                        title={type.name}
                                        width={25}
                                        height={25}
                                        src={`data:image/png;base64,${type.icon}`}
                                        loading="lazy"
                                    />
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <th className="popup-row-name">
                                <b>Gender Ratio</b>
                            </th>
                            <td className="popup-row-value">
                                {genderRatio === -1 ? (
                                    'N/A'
                                ) : (
                                    <>
                                        <div className="gender-ratio">
                                            <div
                                                className="male"
                                                style={{
                                                    width: genderRatio + '%',
                                                }}
                                            ></div>
                                            <div
                                                className="female"
                                                style={{
                                                    width:
                                                        100 - genderRatio + '%',
                                                }}
                                            ></div>
                                        </div>
                                        <br />
                                        {genderRatio +
                                            '% male, ' +
                                            (100 - genderRatio) +
                                            '% female'}
                                    </>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th className="popup-row-name">
                                <b>Frequency</b>
                            </th>
                            <td className="popup-row-value">
                                {frequency + '%'}
                            </td>
                        </tr>
                        <tr>
                            <th className="popup-row-name">
                                <b>Level</b>
                            </th>
                            <td className="popup-row-value">
                                {minLevel === maxLevel
                                    ? minLevel
                                    : minLevel + ' - ' + maxLevel}
                            </td>
                        </tr>
                        <tr>
                            <th className="popup-row-name">
                                <b>FreeTem</b>
                            </th>
                            <td className="popup-row-value">
                                <span>{freeTem}</span>
                                <Image
                                    alt="Pansuns"
                                    title="Pansuns"
                                    width={16}
                                    height={16}
                                    src="/images/pansuns.png"
                                    loading="lazy"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="popup-row-name">
                                <b>TV Yield</b>
                            </th>
                            <td className="popup-row-value">
                                {TVs['HP'] > 0 ? 'HP +' + TVs['HP'] + ' ' : ''}
                                {TVs['STA'] > 0
                                    ? 'STA +' + TVs['STA'] + ' '
                                    : ''}
                                {TVs['SPD'] > 0
                                    ? 'SPD +' + TVs['SPD'] + ' '
                                    : ''}
                                {TVs['ATK'] > 0
                                    ? 'ATK +' + TVs['ATK'] + ' '
                                    : ''}
                                {TVs['SPATK'] > 0
                                    ? 'SPATK +' + TVs['SPATK'] + ' '
                                    : ''}
                                {TVs['DEF'] > 0
                                    ? 'DEF +' + TVs['DEF'] + ' '
                                    : ''}
                                {TVs['SPDEF'] > 0
                                    ? 'SPDEF +' + TVs['SPDEF'] + ' '
                                    : ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Popup>
        );
    }
}
