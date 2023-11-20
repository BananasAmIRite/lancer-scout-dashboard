import { useState } from 'react';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';
import {
    AllEntriesQuery,
    TableEntryQuery,
    isTableEntryQuery,
    useGetAllEntriesQuery,
    useGetTableEntryByIdQuery,
} from '../services/scout';
import './RequestTreeView.css';
import { useDrag } from 'react-dnd';

export function AllRequestTree(props: { text: string; query: AllEntriesQuery }) {
    return (
        <ul>
            <AllRequestTreeView {...props} />
        </ul>
    );
}

export function RequestTree(props: { text: string; query: TableEntryQuery }) {
    return (
        <ul>
            <RequestTreeView {...props} />
        </ul>
    );
}

function AllRequestTreeView({ text, query }: { text: string; query: AllEntriesQuery }) {
    const [droppedDown, setDroppedDown] = useState(false);
    const { data, error, isLoading } = useGetAllEntriesQuery(query);

    return (
        <>
            <li onClick={() => setDroppedDown(() => !droppedDown)}>
                {droppedDown ? <AiFillCaretDown /> : <AiFillCaretRight />} {text}
            </li>
            <ul>
                {droppedDown && !isLoading && !error ? (
                    data.map((e, i) => resolveElementType(e[0], e[1], query.name))
                ) : (
                    <></>
                )}
            </ul>
        </>
    );
}

function RequestTreeView({ text, query }: { text: string; query: TableEntryQuery }) {
    const [droppedDown, setDroppedDown] = useState(false);
    const { data, error, isLoading } = useGetTableEntryByIdQuery(query);

    return (
        <>
            <li onClick={() => setDroppedDown(() => !droppedDown)}>
                {droppedDown ? <AiFillCaretDown /> : <AiFillCaretRight />} {text}
            </li>
            <ul>
                {droppedDown && !isLoading && !error ? (
                    Object.entries(data).map((e, i) => resolveElementType(e[0], e[1], query.name))
                ) : (
                    <></>
                )}
            </ul>
        </>
    );
}

function TreeViewElement({
    text,
    value,
    parentType,
}: {
    text: string;
    value: string | number | boolean;
    parentType: string;
}) {
    const elemType = typeof value;
    const [{ opacity }, dragRef] = useDrag(() => ({
        type: elemType,
        item: { key: text, value, parentType },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    }));
    return (
        <li ref={dragRef} style={{ opacity }}>
            {text} <span className='text-secondary'> {value} </span>
        </li>
    );
}

function TreeViewArray({ text, arr }: { text: string; arr: any[] }) {
    const [droppedDown, setDroppedDown] = useState(false);

    return (
        <>
            <li onClick={() => setDroppedDown(() => !droppedDown)}>
                {droppedDown ? <AiFillCaretDown /> : <AiFillCaretRight />} {text}{' '}
                <span className='text-secondary'> [] </span>
            </li>
            <ul>{droppedDown ? arr.map((e, i) => resolveElementType(`${i}`, e, '')) : <></>}</ul>
        </>
    );
}

function TreeViewObject({ text, obj }: { text: string; obj: Object }) {
    const [droppedDown, setDroppedDown] = useState(false);

    return (
        <>
            <li onClick={() => setDroppedDown(() => !droppedDown)}>
                {droppedDown ? <AiFillCaretDown /> : <AiFillCaretRight />} {text}
            </li>
            <ul>{droppedDown ? Object.entries(obj).map((e, i) => resolveElementType(e[0], e[1], '')) : <></>}</ul>
        </>
    );
}

function resolveElementType(key: string, value: any, parentElementType: string) {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
        return <TreeViewElement text={key} value={value} parentType={parentElementType} />;
    if (isTableEntryQuery(value)) return <RequestTreeView text={key} query={value} />;
    if (Array.isArray(value)) return <TreeViewArray text={key} arr={value} />;
    return <TreeViewObject text={key} obj={value} />;
}
