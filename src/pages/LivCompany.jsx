import { Loader2 } from "lucide-react";
import useUser from "../hooks/useUser";
import DelevryComapnesContainer from "../compunent/LivCompanyCompunents/DelevryComapnesContainer";
const LivCompany = () => {
    const { fetchUser, loading, companyLiv } = useUser()
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
            </div>
        );
    }
    return (
        <div
            className="w-full"
        >
            {companyLiv.name ? `good ${companyLiv.name}` : <DelevryComapnesContainer fetchUser={fetchUser} />}
        </div>
    );
};

export default LivCompany;
