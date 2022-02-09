import React from 'react';
import classes from "./Coupons.module.css"

const Coupons = (props) => {
  const removeCouponHandler = () =>{
    props.onRemove(props.id)
  }
  return (
     
       <p>{props.name}<button onClick={removeCouponHandler} className={classes.btn}>x</button></p>
     
  );
};
export default Coupons;