import BoxCard from '../../CustomUi/BoxCard'
import { NavLink, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UpdateTheme = () => {
    const location = useLocation();
    const user = useOutletContext() // get websiteStyle from context
    const { t } = useTranslation("store");


    const links = [
        {
            name: t("colors"),
            link: '',
            titel: t("colors"),
            description: t("ChooseStoreColors")
        },
        {
            name: t("products"),
            link: 'products',
            titel: t('Productappearance'),
            description: t("ChooseProductLook")
        },
        {
            name: t("categories"),
            link: 'categories',
            titel: t('Classificationappearance'),
            description: t("ChooseCategoryLook")
        },
        {
            name: t("header"),
            link: 'header',
            titel: t('Navigationbarappearance'),
            description: t("ConfigureNavbar")
        },
        {
            name: t('thanks-page'),
            link: 'thanks-page',
            titel: t('Thankyoupageappearance'),
            description: t("CreateThankYouPage")
        }
    ];


    // find active link (default is colors when path ends with "theme/")
    const current = links.find(link => {
        if (link.link === '') {
            // index route → exactly /update/theme
            return location.pathname === '/update/theme';
        }
        return location.pathname.endsWith(`/theme/${link.link}`);
    }) || links[0]; // fallback to first link if none found

    return (
        <BoxCard
            about={t("theme")}
            small={true}
        >
            <p className='text-sm text-gray-600'>
                {t("themtext")}
            </p>
            <div className='border-t border-[#ddd] py-5 mt-4'>
                <div className='flex flex-wrap mb-3 gap-3 '>
                    {links.map((link, index) => (
                        <NavLink
                            end={link.link === ''} // exact match for index
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-teal-600 text-white px-3 py-1 rounded-full shadow-sm text-xs'
                                    : 'bg-gray-200 text-gray-800 px-3 py-1 rounded-full shadow-sm text-xs hover:bg-gray-300'
                            }
                            key={index}
                            to={link.link}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <div className='w-full mt-4'>
                    <h1 className="text-lg mb-1 font-semibold">{current.titel}</h1>
                    <p className='text-sm mb-5 text-gray-600'>{current.description}</p>

                    <Outlet context={user} />
                </div>
            </div>
        </BoxCard>
    );
}

export default UpdateTheme;
