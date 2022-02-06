import React from 'react';
import classes from "./Complete.module.css"
import Card from '../UI/Card';
import { useSelector } from 'react-redux';



const Complete = () => {
    const cart = useSelector((state) => state.cart)
    
  return (
    <>
        <h1>ORDER COMPETED</h1>
        <Card>
            <div className={classes.container}>
                <h2>Order Summary:</h2>
                <div className={classes.content}>
                    <p>Name</p>
                    <p>Quantitiy</p>
                    <p>Price</p>
                    <p>Total Price</p>
                </div>
                <div className={classes.items}> 
                    {cart.items.map(item => <div key={Math.random()}><p>{item.name}</p> <p>{item.quantity}</p> <p>{item.price}€</p> <p>{item.totalPrice.toFixed(2)}€</p></div>)}  
                </div>
                <h5>Coupons aplied:</h5>
                <h2>Total Price: {cart.totalAmount.toFixed(2)}€</h2>
            </div>
        </Card>
    </>
      
  )
};
export default Complete;