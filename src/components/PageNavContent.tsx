import { useState } from 'react';
import PageContent from './PageContent';
import PageNav, { NavPage } from './PageNav';

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
            />
            <PageContent navItems={navItems} currentPage={currentPage} />
        </div>
    );
}
