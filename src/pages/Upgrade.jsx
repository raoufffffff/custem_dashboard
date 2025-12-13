import React, { useState } from 'react';
import PageContainer from '../CustomUi/PageContainer';
import { useTranslation } from 'react-i18next';
import PlanCard from '../compunent/Upgrade/PlanCard';
import UpsellModal from '../compunent/Upgrade/UpsellModal';


const Upgrade = () => {
    const { t } = useTranslation("Account");
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <PageContainer
            titel={t('upgrade')}
            about={t("Choosetheplan")}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* 1. Monthly Plan */}
                    <PlanCard
                        name={t('plan_monthly_name')}
                        price="2,500"
                        currency="DZD"
                        value="2 m"
                        term={t('2_Months')}
                        features={[
                            t('unlimited_leads'),
                            t('basic_support'),
                            t('remove_branding')
                        ]}
                        buttonText={t('see_details')}
                        onClick={() => setSelectedPlan('monthly')}
                    />

                    {/* 2. Quarterly Plan (Popular) */}
                    <PlanCard
                        name={t('plan_quarterly_name')}
                        price="4,900"
                        currency="DZD"
                        value="4 m"
                        term={t('4_Months')}
                        badge={t('save_700_dzd')}
                        isPopular={true} // تمييز هذه الخطة
                        features={[
                            t('priority_support'),
                            t('analytics'),
                            t('everything_in_monthly')
                        ]}
                        buttonText={t('see_details')}
                        onClick={() => setSelectedPlan('quarterly')}
                    />

                    {/* 3. Semi-Annual Plan */}
                    <PlanCard
                        name={t('plan_semi_annual_name')}
                        price="9,000"
                        currency="DZD"
                        value="7 m"
                        term={t('7_Months')}
                        badge={t('best_value') || "Best Value"}
                        features={[
                            t('vip_support'),
                            t('api_access'),
                            t('everything_in_quarterly')
                        ]}
                        buttonText={t('see_details')}
                        onClick={() => setSelectedPlan('semi_annual')}
                    />
                </div>
            </div>

            {/* Modal Logic */}
            {selectedPlan && (
                <UpsellModal
                    plan={selectedPlan}
                    onClose={() => setSelectedPlan(null)}
                    t={t}
                />
            )}
        </PageContainer>
    );
};

export default Upgrade;