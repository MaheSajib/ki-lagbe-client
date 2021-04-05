import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

const ProductRow = (props) => {
    return (
        <tr>
            <td>{props.product.name}</td>
            <td>{props.product.weight}</td>
            <td>{props.product.price}</td>
            <td>
                <button className="btn btn-danger m-2" onClick={()=> props.handleDelete(props.product)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                
                <button className="btn btn-success m-2"><FontAwesomeIcon icon={faEdit} /></button>
            
            </td>
        </tr>
    );
};

export default ProductRow;