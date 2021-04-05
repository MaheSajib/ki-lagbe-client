import React from 'react';
import { Button, Card } from 'react-bootstrap';



const Product = ( props ) => {
    const {name, img, price} = props.product;
    return (
        
            <Card style={{ width: '20rem', marginLeft:' 9%', marginBottom:'4%' }}>
                <Card.Img style={{height: '300px'}} variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Title style={{color: 'green', fontSize:'30px', fontWeight:'700'}}>{price} 
                    <Button style={{marginLeft:'30%'}} onClick={() => props.handleClick(props.product)} variant="btn btn-success">Buy Now</Button>
                    </Card.Title>
                </Card.Body>
            </Card>
        
    );
};

export default Product;