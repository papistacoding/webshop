import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart-slice';
import { uiActions } from '../../store/ui-slice';


import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Coupons from './Coupons'



const Cart = (props) => {
  const dispatch = useDispatch()
  const couponInput = useRef("")
  const cart = useSelector((state) => state.cart)
  const navigate = useNavigate();
  const [couponIsError, setCouponIsError] = useState(false)
  const [couponIsMixable, setCouponIsMixable] = useState(true)

  const cartItems = cart.items
  const totalAmount = cart.totalAmount
  const coupons = cart.coupons

  const addCouponHandler = () =>{
    
    if(couponInput.current.value === "20%OFF"){
      if(cart.coupons.couponsList.length > 0){
        setCouponIsMixable(false)
      }
      dispatch(cartActions.addCoupon({        
        couponName: couponInput.current.value,
        couponMixable : false,
        id: "p1",
        discountAmount: 0,
        discountPercentage: 0.2
      }))
    }
    if(couponInput.current.value === "5%OFF"){
      if(cart.coupons.couponMixable === false){
        setCouponIsMixable(false)
      }

      dispatch(cartActions.addCoupon({        
        couponName: couponInput.current.value,
        couponMixable : true,
        id: "p2",
        discountAmount: 0,
        discountPercentage: 0.05
      }))
    }
    if(couponInput.current.value === "20EUROFF"){
      if(cart.coupons.couponMixable === false){
        setCouponIsMixable(false)
      }
      dispatch(cartActions.addCoupon({        
        couponName: couponInput.current.value,
        couponMixable : true,
        id: "p3",
        discountAmount: 20,
        discountPercentage: 0
      }))
    } 
    if(couponInput.current.value !== "20EUROFF" && couponInput.current.value !== "5%OFF" && couponInput.current.value !== "20%OFF"){
      setCouponIsError(true)
    }
    if(cart)
    couponInput.current.value =""
  }
  const onRemoveCoupon = (id)=>{         // LIFTING THE STATE UP KNOWLEDGE
    dispatch(cartActions.removeCoupon(id))
  }
  const orderHandler = ()=>{
    if(cart.totalAmount < 0 ){
      alert("you must ad someting in the cart to proceed")
      return
    }
    
    if(cart.items.length !== 0) navigate("/order")
  }
  const inputFocusHandler = ()=>{
    setCouponIsError(false)
    setCouponIsMixable(true)
  }

  const closeModal = ()=>{
    dispatch(uiActions.toggle())
  }

  return (
    <div  className={classes.background}>
      <Card className={classes.cart} >
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
          <input onFocus={inputFocusHandler} ref={couponInput} className={classes.couponInput} placeholder="Enter Coupon"></input>
          
          <button onClick={addCouponHandler} className={classes.btn} >Apply</button>
          {couponIsError && <span className={classes.error}>Invalid coupon</span>}
          {!couponIsMixable && <span className={classes.error}>Coupon that you've entered cannot be mixed with other coupons</span>}
          <div>
            <button  onClick={orderHandler} className={classes.btn}>Order</button>
            <button onClick={closeModal} className={classes.close}>X</button>
          </div>
      </Card>
    </div>
  );
};

export default Cart;
