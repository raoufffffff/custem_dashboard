import { Loader2 } from "lucide-react"
import UseLivOrder from "../hooks/UseLivOrder"
import useItem from "../hooks/useItem"
import OrdersTable from "../compunent/OrderPageCompunents/OrdersTable"
import TruckOrdersTable from "../compunent/TruckOrder/TruckOrdersTable"


const TruckOrder = () => {
    const { Livloading, orders } = UseLivOrder()
    const { Items, loading } = useItem()
    console.log(orders[0]);

    return (
        <div>

            <TruckOrdersTable
                Items={Items}
                orders={orders}
                loading={loading}
                Livloading={Livloading}
                emptyMessage="No orders found matching your criteria"
            />
        </div>
    )
}

export default TruckOrder