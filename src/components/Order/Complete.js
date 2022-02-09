import React from 'react';
import classes from "./Complete.module.css"
import Card from '../UI/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';



const Complete = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const navigate = useNavigate("")
    const buttonHandler = ()=>{
        dispatch(cartActions.removeState())
        dispatch(uiActions.toggle())
        navigate("/")

    }
    
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
                <ul>Coupons aplied: {cart.coupons.couponsList.map(coupon =><li key={coupon.id}>{coupon.couponName} </li>)}</ul>
                <h2>Total Price: {cart.totalAmount.toFixed(2)}€</h2>
            </div>
            <button className={classes.btn} onClick={buttonHandler}>Continue shopping</button>
        </Card>
    </>
      
  )
};
export default Complete;