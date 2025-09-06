import { Loader2 } from 'lucide-react';
import states from '../../constanst/states'
import PageContainer from '../../CustomUi/PageContainer';
import UseLivOrder from '../../hooks/UseLivOrder';
import WilayaTable from './WilayaTable ';

const AlgeriaMap = () => {
    const { Livloading, orders } = UseLivOrder()
    if (Livloading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }
    const getUniqueWilaya = () => {
        const wilayaStats = {};

        for (const orderItem of orders) {
            const id = orderItem.IDWilaya;
            if (!wilayaStats[id]) {
                wilayaStats[id] = {
                    couant: 1,
                    status: [orderItem.Situation]
                };
            } else {
                wilayaStats[id].couant += 1;
                wilayaStats[id].status.push(orderItem.Situation);
            }
        }

        const result = states.map(state => {
            const stats = wilayaStats[state.id];
            return {
                id: state.id,
                name: state.name,
                ar_name: state.ar_name,
                couant: stats ? stats.couant : 0,
                status: stats ? stats.status : [],
                stop_back: state.stop_back,
                prix_initial: state.prix_initial
            };
        });

        return result;
    };


    return (
        <PageContainer
            titel={"Wilaya Shipping "}
            about={"Statistics"}
            className={"overflow-x-hidden"}
        >

            <WilayaTable data={getUniqueWilaya()} />
        </PageContainer>
    );
}
export default AlgeriaMap;