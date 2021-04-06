import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import AdminHeader from '../AdminHeader/AdminHeader';

const AddProducts = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null)



    const onSubmit = (data, e) => {
        const productData = {
            name: data.name,
            weight: data.weight,
            price: data.price,
            img: imageURL
        };
        console.log(productData);
        const url = `https://salty-sands-30958.herokuapp.com/addProduct`


        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res => console.log('server site response', res))

        e.target.reset();
    };
    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '70ba2cebd82dcad56d0ec6fbcd9134cf')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div>
            <AdminHeader></AdminHeader>
            <h1>Add Product</h1>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col">
                            <h6>Product Name</h6>
                            <input name="name" className="form-control" placeholder="Enter Name" ref={register} />
                        </div>
                        <div className="col">
                            <h6>Weight</h6>
                            <input name="weight" className="form-control" placeholder="Enter Name" ref={register} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h6>Add Price</h6>
                            <input name="price" className="form-control" placeholder="Enter price" ref={register} />
                        </div>
                        <div className="col">
                            <h6>Add Photo</h6>
                            <input name="addPhoto" type="file" className="form-control btn btn-outline-success border-0" onChange={handleImageUpload} ref={register} />
                        </div>
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button className="btn btn-success" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;