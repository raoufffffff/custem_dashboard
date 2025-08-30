import BoxCard from '../../CustomUi/BoxCard'
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const UpdateTheme = () => {
    const { website, loading } = useUser();
    const location = useLocation();

    const links = [
        {
            name: 'colors',
            link: '',
            titel: 'Colors',
            description: 'Choose your store colors'
        },
        {
            name: 'products',
            link: 'products',
            titel: 'Product appearance',
            description: 'Choose how the product will look in your store.'
        },
        {
            name: 'categories',
            link: 'categories',
            titel: 'Classification appearance',
            description: 'Choose how the category will look in your store.'
        },
        {
            name: 'header',
            link: 'header',
            titel: 'Navigation bar appearance',
            description: 'Configure and design the navigation bar.'
        },
        {
            name: 'thanks-page',
            link: 'thanks-page',
            titel: 'Thank you page appearance',
            description: 'Create and design a thank you page'
        }
    ];

    if (loading) return <div>Loading...</div>;

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
            about={"theme"}
            small={true}
        >
            <p className='text-sm text-gray-600'>
                Control the look and feel of your store.
            </p>
            <div className='border-t border-[#ddd] py-5 mt-4'>
                <div className='flex flex-wrap mb-3 gap-3 '>
                    {links.map((link, index) => (
                        <NavLink
                            end={link.link === ''} // exact match for index
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-blue-600 text-white px-3 py-1 rounded-full shadow-sm text-xs'
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

                    <Outlet context={website.websiteStyle} />
                </div>
            </div>
        </BoxCard>
    );
}

export default UpdateTheme;
