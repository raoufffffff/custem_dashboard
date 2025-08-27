import DashboardSkeleton from '../compunent/dashbourdloading/DashBoardLoading'
import useOrders from '../hooks/useOrders'
import Stats from '../compunent/DashBoard/Stats'
import StatusSummary from '../compunent/DashBoard/StatusSummary';
import PageContainer from '../CustomUi/PageContainer';

const DashBoard = () => {
    const { loading, panddingOrder, ConfirmedOrder, Allorders } = useOrders();


    if (loading) return <DashboardSkeleton />
    return (
        <PageContainer
            about={JSON.parse(localStorage.getItem("user")).name}
            titel={"welcome 👋"}
        >

            <Stats panddingOrder={panddingOrder} ConfirmedOrder={ConfirmedOrder} />
            <StatusSummary Allorders={Allorders} />
        </PageContainer>
    )
}

export default DashBoard