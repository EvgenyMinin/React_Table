import React from 'react';

const Table = props => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={props.onSort.bind(null, 'id')}>
                        ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, 'body')}>
                        Body {props.sortField === 'body' ? <small>{props.sort}</small> : null}
                    </th>
                    <th onClick={props.onSort.bind(null, 'title')}>
                        Title {props.sortField === 'title' ? <small>{props.sort}</small> : null}
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => (
                    <tr key={item.id} onClick={props.onRowSelect.bind(null, item)}>
                        <td>{item.id}</td>
                        <td>{item.body}</td>
                        <td>{item.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default Table;