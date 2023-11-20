import { NavPage } from './PageNav';

export default function PageContent({ navItems, currentPage }: { navItems: NavPage[]; currentPage: number }) {
    return (
        <div className='w-100 border-bottom border-secondary h-100 p-4'>
            {navItems.map((e) => (
                <div style={{ display: e.id === currentPage ? 'block' : 'none' }} key={e.id}>
                    {e.page}
                </div>
            ))}
        </div>
    );
}
