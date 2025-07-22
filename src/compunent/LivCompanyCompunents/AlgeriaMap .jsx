import states from '../../constanst/states'
import UseLivOrder from '../../hooks/UseLivOrder';
import WilayaTable from './WilayaTable ';

const AlgeriaMap = () => {
    const { Livloading, orders } = UseLivOrder()
    console.log(orders[0]);

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
        <div>
            <WilayaTable data={getUniqueWilaya()} />
        </div>
    );
}
export default AlgeriaMap;