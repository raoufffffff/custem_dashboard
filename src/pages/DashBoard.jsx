import DashboardSkeleton from '../compunent/dashbourdloading/DashBoardLoading'
import useOrders from '../hooks/useOrders'
import Stats from '../compunent/DashBoard/Stats'
import StatusSummary from '../compunent/DashBoard/StatusSummary';

const DashBoard = () => {
    const { loading, panddingOrder, ConfirmedOrder, Allorders } = useOrders();


    if (loading) return <DashboardSkeleton />
    return (
        <div
            className='flex flex-col gap-10 px-0 md:px-5 pt-4'
        >
            <h1
                className='!leading-[115%] w-11/12 mx-auto text-2xl md:text-3xl font-bold text-neutral-900 ltr:first-letter:uppercase flex items-center flex-wrap gap-2'
            >welcome,
                <span
                    className='text-red-500'
                >
                    {JSON.parse(localStorage.getItem("user")).name}
                </span>
                👋</h1>
            <Stats panddingOrder={panddingOrder} ConfirmedOrder={ConfirmedOrder} />
            <StatusSummary Allorders={Allorders} />
        </div>
    )
}

export default DashBoard