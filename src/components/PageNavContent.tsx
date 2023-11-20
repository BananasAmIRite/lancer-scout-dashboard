import { useState } from 'react';
import PageContent from './PageContent';
import PageNav, { NavPage } from './PageNav';
import TestPage from '../pages/testpage/TestPage';

export default function PageNavContent() {
    const [navItems, setNavItems] = useState<NavPage[]>([]);

    const [currentPage, setCurrentPage] = useState(-1);

    return (
        <div className='d-flex flex-column w-75 h-100'>
            <PageNav
                navItems={navItems}
                setNavItems={setNavItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                choices={[
                    {
                        pageName: 'Graph',
                        page: () => <>Graph!!</>,
                    },
                    {
                        pageName: 'Test',
                        page: () => <TestPage />,
                    },
                    {
                        pageName: 'Schema',
                        page: () => <>Schema!!!</>,
                    },
                ]}
            />
            <PageContent navItems={navItems} currentPage={currentPage} />
        </div>
    );
}
