import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart-slice';


import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Coupons from './Coupons'



const Cart = (props) => {
  const dispatch = useDispatch(cartActions)
  const couponInput = useRef("")
  const cart = useSelector((state) => state.cart)
  const navigate = useNavigate();

  const cartItems = cart.items
  const totalAmount = cart.totalAmount
  const coupons = cart.coupons

  const addCouponHandler = () =>{
    
    if(couponInput.current.value === "20%OFF"){
      
      dispatch(cartActions.addCoupon({        
        couponName: couponInput.current.value,
        couponMixable : false,
        id: "p1",
        discountAmount: 0,
        discountPercentage: 0.2
      }))
    }
    if(couponInput.current.value === "5%OFF"){
      dispatch(cartActions.addCoupon({        
        couponName: couponInput.current.value,
        couponMixable : true,
        id: "p2",
        discountAmount: 0,
        discountPercentage: 0.05
      }))
    }
    if(couponInput.current.value === "20EUROFF"){
      
      dispatch(cartActions.addCoupon({        
        couponName: couponInput.current.value,
        couponMixable : true,
        id: "p3",
        discountAmount: 20,
        discountPercentage: 0
      }))
    
    }   
    couponInput.current.value =""


  }
  const onRemoveCoupon = (id)=>{         // LIFTING THE STATE UP KNOWLEDGE
    dispatch(cartActions.removeCoupon(id))
  }
  const orderHandler = ()=>{
    if(cart.items.length !== 0) navigate("/order")
  }



  return (
    <Card className={classes.cart}>
      
      <h2>Total: {totalAmount.toFixed(2)}€</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
      {coupons.couponsList.map(coupon =><Coupons name = {coupon.couponName}key={coupon.id} id={coupon.id} onRemove = {onRemoveCoupon}></Coupons>)}
      <input ref={couponInput} className={classes.couponInput} placeholder="Enter Coupon"></input>
      <button onClick={addCouponHandler} className={classes.btn} >Apply</button>
      <div>
        <button  onClick={orderHandler} className={classes.btn}>Order</button>
      </div>
    </Card>
  );
};

export default Cart;
