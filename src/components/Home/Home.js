import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';
import Product from '../Product/Product';
import Header from './Header/Header';



const Home = () => {
    const [products, setProducts] = useState([]);
    const { userDetail, checkOutDetail } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = userDetail;
    const [checkOut, setCheckOut] = checkOutDetail;



    useEffect(() => {

        fetch('https://salty-sands-30958.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    const handleClick = (pd) => {
        console.log(pd._id);
        let newOrder;

        const matchProduct = checkOut.find(itm => itm._id === pd._id);
        let count;

        if (matchProduct) {
            count = matchProduct.quantity + 1;
            matchProduct.quantity = count;
            const otherProduct = checkOut.filter(itm => itm._id !== pd._id);
            newOrder = [...otherProduct, matchProduct];
        } else {
            newOrder = [...checkOut, pd];
        }

        setCheckOut(newOrder);
    }
    console.log(checkOut)




    return (
        <div>
            <Header></Header>

            <div className="d-flex justify-content-center m-5">
                <input type="text" className="w-25 border-0 bg-light" name="" placeholder="Search Product" id="" />
                <button className="btn btn-success" >Search</button>
            </div>




            <div className="row">

                {
                    products.length
                        ? products.map(product => <Product handleClick={handleClick} product={product}></Product>)
                        : <div className="mx-auto ">
                            <Spinner animation="border" variant="success" />
                        </div>
                }
            </div>
        </div>

    );
};

export default Home;