import { Dropdown } from 'react-bootstrap';

interface ContextMenuData {
    title: string;
    action: () => void;
}

export function ContextMenu({ x, y, data }: { x: number; y: number; data: ContextMenuData[] }) {
    return (
        <Dropdown.Menu style={{ top: x, left: y, position: 'absolute' }} show={true} variant={'dark'}>
            {data.map((e, i) => (
                <Dropdown.Item key={i} onClick={e.action}>
                    {e.title}
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    );
}
