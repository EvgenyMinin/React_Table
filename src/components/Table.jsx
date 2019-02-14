import React from 'react';

const Table = props => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => props.onSort('id')}>
                        ID {props.sortField === 'id' && <small>{props.sort}</small>}
                    </th>
                    <th onClick={() => props.onSort('firstName')}>
                        firstName {props.sortField === 'firstName' && <small>{props.sort}</small>}
                    </th>
                    <th onClick={() => props.onSort('lastName')}>
                        lastName {props.sortField === 'lastName' && <small>{props.sort}</small>}
                    </th>
                    <th onClick={() => props.onSort('email')}>
                        email {props.sortField === 'email' && <small>{props.sort}</small>}
                    </th>
                    <th onClick={() => props.onSort('phone')}>
                        phone {props.sortField === 'phone' && <small>{props.sort}</small>}
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => (
                    <tr key={item.id} onClick={() => props.onRowSelect(item)}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default Table;