import { Dispatch, ReactElement, SetStateAction, forwardRef, useState } from 'react';
import { VscAdd, VscClose } from 'react-icons/vsc';
import { Dropdown } from 'react-bootstrap';
import TestPage from '../pages/testpage/TestPage';

export interface NavPage {
    id: number;
    pageName: string;
    page: ReactElement;
}

interface NavPageChoice {
    pageName: string;
    page: (i: number) => ReactElement;
}

export const PAGE_CHOICES: NavPageChoice[] = [
    {
        pageName: 'Graph',
        page: () => <>Graph!!</>,
    },
    {
        pageName: 'Test',
        page: () => <TestPage />,
    },
];

export default function PageNav({
    navItems,
    setNavItems,
    currentPage,
    setCurrentPage,
}: {
    navItems: NavPage[];
    setNavItems: Dispatch<SetStateAction<NavPage[]>>;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
    const [lastId, setLastId] = useState(0);

    const addNavPage = (pageName: string, page: ReactElement) => {
        setNavItems([
            ...navItems,
            {
                id: lastId + 1,
                pageName,
                page,
            },
        ]);
        const id = lastId + 1;
        setLastId(lastId + 1);
        return id;
    };
    const removeNavPage = (id: number) => {
        if (currentPage === id) toPage(id - 1) || toPage(id + 1) || toPage(-1);
        setNavItems(navItems.filter((e, i) => e.id !== id));
    };

    const toPage = (id: number) => {
        const page = navItems.find((e) => e.id === id)?.page;
        let successful = true;
        if (!page) successful = false;

        setCurrentPage(id);
        return successful;
    };

    return (
        <div className='w-100 border-bottom border-secondary' style={{ height: '7%' }}>
            <div className='h-100 d-flex flex-row'>
                <div className='h-100 d-flex flex-row' style={{}}>
                    {navItems.map((e, i) => (
                        <NavPageItem
                            key={i}
                            text={e.pageName}
                            removeNavPage={() => removeNavPage(e.id)}
                            toPage={() => toPage(e.id)}
                        />
                    ))}
                </div>
                <AddPageButton addPage={addNavPage} goToPage={toPage} />
            </div>
        </div>
    );
}

export function NavPageItem({
    text,
    removeNavPage,
    toPage,
}: {
    text: string;
    removeNavPage: () => void;
    toPage: () => void;
}) {
    const [hover, setHover] = useState(false);
    let deleted = false;
    return (
        <div
            className='border-end border-secondary h-100 p-2'
            style={{ maxWidth: '200px', width: 'fit-content', cursor: 'pointer' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <h6
                style={{ display: 'flex', flexWrap: 'wrap' }}
                onClick={() => {
                    if (!deleted) toPage();
                }}
            >
                <h6 className='text-truncate' style={{ maxWidth: '150px', width: 'fit-content', userSelect: 'none' }}>
                    {text}
                </h6>
                <span style={{ visibility: hover ? 'visible' : 'hidden' }}>
                    <VscClose
                        onClick={() => {
                            deleted = true;
                            removeNavPage();
                        }}
                    />
                </span>
            </h6>
        </div>
    );
}

const addMenu = forwardRef<any, any>(({ children, onClick }, ref) => {
    return (
        <div
            className='border-end border-secondary h-100 p-2'
            style={{ width: '50px', cursor: 'pointer' }}
            ref={ref}
            onClick={(e) => onClick(e)}
        >
            <h6>
                <VscAdd />
            </h6>
        </div>
    );
});

let i = 0;

export function AddPageButton({
    addPage,
    goToPage,
}: {
    addPage: (pageName: string, page: ReactElement) => number;
    goToPage: (id: number) => void;
}) {
    return (
        <Dropdown>
            <Dropdown.Toggle as={addMenu}>Custom toggle</Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
                {PAGE_CHOICES.map((e) => (
                    <Dropdown.Item
                        onClick={() => {
                            i++;
                            const page = e.page(i);
                            const id = addPage(e.pageName, page);
                            goToPage(id);
                        }}
                    >
                        {e.pageName}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
