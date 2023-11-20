import { PropsWithChildren } from 'react';
import { useDrop } from 'react-dnd';

export default function DropTarget(
    props: {
        accept: string | string[];
        onData: (data: { parentType: string; key: string; value: any }) => void;
        style?: React.CSSProperties;
    } & PropsWithChildren
) {
    const [, drop] = useDrop(() => ({
        accept: props.accept,
        drop: (item, monitor) => {
            props.onData(item as { parentType: string; key: string; value: any });
        },
    }));

    return (
        <div ref={drop} style={props.style}>
            {props.children}
        </div>
    );
}
