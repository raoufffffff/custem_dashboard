import OrdersTable from "../compunent/OrderPageCompunents/OrdersTable"
import useOrders from "../hooks/useOrders"


const CurrensOrder = () => {
    const { panddingOrder, loading, edite } = useOrders()


    return (
        <div>

            <OrdersTable
                ucan={true}
                orders={panddingOrder}
                loading={loading}
                emptyMessage="No orders found matching your criteria"
                edite={edite}
            />

        </div>
    )
}

export default CurrensOrder