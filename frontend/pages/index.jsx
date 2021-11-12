import dynamic from 'next/dynamic';
import Drawer from '../components/Drawer';

export default function Home() {
    const Map = dynamic(() => import('../components/Map'), {
        ssr: false,
    });

    return (<><Map /><Drawer/></>);
}
