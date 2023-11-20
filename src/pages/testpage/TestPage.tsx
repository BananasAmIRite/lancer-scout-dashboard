import { useState } from 'react';
import DropTarget from '../../components/DropTarget';

export default function TestPage() {
    const [data, setData] = useState<{ parentType: string; key: string; value: any }>(null);

    return (
        <DropTarget accept={'string'} onData={(data) => setData(data)} style={{ width: '500px', height: '100px' }}>
            Drag and Drop Here! (only accepts strings)
            <h6>{data ? `${data.parentType}/${data.key}/` : ''}</h6>
            <h6>{data?.value ?? ''}</h6>
            <h6>{JSON.stringify(data)}</h6>
        </DropTarget>
    );
}
