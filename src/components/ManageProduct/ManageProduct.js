import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AdminHeader from '../AdminHeader/AdminHeader';
import ProductRow from '../ProductRow/ProductRow';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [reloadDelete , setReloadDelete ] = useState(false);
    useEffect(()=>{
        fetch('https://salty-sands-30958.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [reloadDelete])

    const handleDelete =(product)=>{
        fetch('https://salty-sands-30958.herokuapp.com/deleteProduct/'+ product._id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => setReloadDelete(product._id))
    }

    return (
        <div>
            <AdminHeader></AdminHeader>
            <h1>Manage Product</h1>
            <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
         products.map(product => <ProductRow handleDelete={handleDelete} product={product}></ProductRow>)
        }
        
        </tbody>
      </Table>
        </div>
    );
};

export default ManageProduct;