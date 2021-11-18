import Image from 'next/image';
import { Popup } from 'react-leaflet';

export default function TemtemPopup({ temtem }) {
    return (
        <Popup closeButton={false} style={{ width: '250px !important' }}>
            <table className="popup-table">
                <tbody>
                    <tr>
                        <th className="popup-header" colSpan={2}>
                            {temtem.name}
                        </th>
                    </tr>
                    <tr>
                        <th className="popup-row-name">
                            {temtem.types.length === 1 ? (
                                <b>Type</b>
                            ) : (
                                <b>Types</b>
                            )}
                        </th>
                        <td className="popup-row-value">
                            <span
                                style={{
                                    position: 'relative',
                                    bottom: '-3px',
                                }}
                            >
                                {temtem.types.map((type, i) => (
                                    <Image
                                        key={i}
                                        alt={type.name}
                                        width={25}
                                        height={25}
                                        title={type.name}
                                        src={
                                            'data:image/png;base64,' + type.icon
                                        }
                                        loading="lazy"
                                    />
                                ))}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th className="popup-row-name">
                            <b>Gender Ratio</b>
                        </th>
                        <td className="popup-row-value">
                            {temtem.genderRatio === -1 ? (
                                'N/A'
                            ) : (
                                <>
                                    <div className="gender-ratio">
                                        <div
                                            className="male"
                                            style={{
                                                width: temtem.genderRatio + '%',
                                            }}
                                        ></div>
                                        <div
                                            className="female"
                                            style={{
                                                width:
                                                    100 -
                                                    temtem.genderRatio +
                                                    '%',
                                            }}
                                        ></div>
                                    </div>
                                    <br />
                                    {temtem.genderRatio +
                                        '% male, ' +
                                        (100 - temtem.genderRatio) +
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
                            {temtem.frequency + '%'}
                        </td>
                    </tr>
                    <tr>
                        <th className="popup-row-name">
                            <b>Level</b>
                        </th>
                        <td className="popup-row-value">
                            {temtem.minLevel == temtem.maxLevel
                                ? temtem.minLevel
                                : temtem.minLevel + ' - ' + temtem.maxLevel}
                        </td>
                    </tr>
                    <tr>
                        <th className="popup-row-name">
                            <b>FreeTem</b>
                        </th>
                        <td className="popup-row-value">
                            <span>{temtem.freeTem + ' '}</span>
                            <span
                                style={{
                                    position: 'relative',
                                    bottom: '-3px',
                                }}
                            >
                                <Image
                                    alt="Pansuns"
                                    width={16}
                                    height={16}
                                    title="Pansuns"
                                    src="/images/pansuns.png"
                                    loading="lazy"
                                />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th className="popup-row-name">
                            <b>TV Yield</b>
                        </th>
                        <td className="popup-row-value">
                            {temtem.TVs.HP > 0
                                ? 'HP +' + temtem.TVs.HP + ' '
                                : ''}
                            {temtem.TVs.STA > 0
                                ? 'STA +' + temtem.TVs.STA + ' '
                                : ''}
                            {temtem.TVs.SPD > 0
                                ? 'SPD +' + temtem.TVs.SPD + ' '
                                : ''}
                            {temtem.TVs.ATK > 0
                                ? 'ATK +' + temtem.TVs.ATK + ' '
                                : ''}
                            {temtem.TVs.SPATK > 0
                                ? 'SPATK +' + temtem.TVs.SPATK + ' '
                                : ''}
                            {temtem.TVs.DEF > 0
                                ? 'DEF +' + temtem.TVs.DEF + ' '
                                : ''}
                            {temtem.TVs.SPDEF > 0
                                ? 'SPDEF +' + temtem.TVs.SPDEF + ' '
                                : ''}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Popup>
    );
}
