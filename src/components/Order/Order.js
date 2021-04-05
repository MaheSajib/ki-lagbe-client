import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../App';
import Header from '../Home/Header/Header';
import TableData from '../TableData/TableData';

const Order = () => {

  const { userDetail, checkOutDetail } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = userDetail;
  const [checkOut, setCheckOut] = checkOutDetail;
  const [orderDetail, setOrderDetail] = useState({});





  useEffect(() => {

    const checkOutData = {
      user: loggedInUser,
      product: checkOut
    };

    if (checkOut.length !== 0 && loggedInUser.isSignedIn === true) {


      fetch('https://salty-sands-30958.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkOutData),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success: Cart Data Pushed to Server', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    }

  }, [checkOut, loggedInUser]);

  useEffect(() => {
    fetch('https://salty-sands-30958.herokuapp.com/order?email=' + loggedInUser.email)
      .then(res => res.json())
      .then(data => setOrderDetail(data[0]))

  }, [loggedInUser.email])

  const total = orderDetail?.product?.map(pd => {
    const productTotal = pd.price*pd.quantity;
    pd.productTotal = productTotal;
    return pd.productTotal;
  }).reduce((preValue, crrValue)=> preValue + crrValue, 0);

  return (
    <div>
      <Header></Header>
      <h1>Checkout</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        {
          orderDetail?.product?.map(pd => <TableData pd={pd}></TableData>)
        }
        <tr>
          <td>Total: </td>
          <td></td>
          <td>{total}</td>
        </tr>
        </tbody>
      </Table>
      <div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-success">Checkout</button>
        </div>
      </div>


    </div>
  );
};

export default Order;