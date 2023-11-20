import { RequestTree } from './RequestTreeView';

export default function SideBar() {
    return (
        <div className='p-2 w-25 text-left overflow-auto text-nowrap border-end border-secondary'>
            <RequestTree text="abc's" query={{ name: 'abc', id: 123 }} />
        </div>
    );
}
