import React from 'react';
import classes from "./Order.module.css"
import Card from '../UI/Card';
import { useNavigate } from 'react-router-dom';
import { deleteCartData } from '../../store/cart-actions';
import { useDispatch } from 'react-redux';



const Order = () => {
  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const formSubmitHandler = () =>{
    navigate("/complete")
    dispatch(deleteCartData())
  }

  return (  
    <Card className={classes.wrapper}>
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <h1>Enter your details to make the order</h1>
            <label htmlFor="name">Full Name</label>
            <input id="name" required></input>
            <label htmlFor='address' required>Full Address:</label>
            <input id='address' required></input>
            <label htmlFor='card' required>Credit Card Number:</label>
            <input id='card' required></input>
            <label htmlFor='cvv' required>CVV:</label>
            <input id='cvv' required></input>
            <label htmlFor='email' required >Email:</label>
            <input id='email' type="email" required></input>
            <button className={classes.formBtn}>Order now!</button>
        </form>
      </div>
    </Card>     
  )
};
export default Order;