import React from 'react';

const TableData = (props) => {
    return (
        <tr>
            <td>{props.pd.name}</td>
            <td>{props.pd.quantity}</td>
            <td>{props.pd.price*props.pd.quantity}</td>
        </tr>
    );
};

export default TableData;