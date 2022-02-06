import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
    totalAmount: 0,
    coupons: {
      couponsList: [],
      couponMixable: true,
      totalDiscountAmount : 0,
      totalDiscountPercentage: 1
    }
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.coupons = action.payload.coupons;
      if(!state.coupons.couponsList) state.coupons.couponsList = [];
    
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      let newTotalAmount = 0;
      const countTotalPrice = ()=>{
        newTotalAmount = state.items.reduce((prev, curr)=>{
          return prev+ curr.totalPrice
        },0)
      }
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        countTotalPrice()
        state.totalAmount = (newTotalAmount - state.coupons.totalDiscountAmount) * state.coupons.totalDiscountPercentage
        
      } else {
        existingItem.quantity++;
        if(existingItem.name ==="Motion Sensor" && existingItem.quantity % 3 === 0){
          existingItem.totalPrice = existingItem.totalPrice + 15.02;
        }
        else if(existingItem.name ==="Smoke Sensor" && existingItem.quantity % 2 ===0){
          existingItem.totalPrice = existingItem.totalPrice + 15.01;
        }
        else{
          existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        }
        countTotalPrice()
        state.totalAmount = (newTotalAmount - state.coupons.totalDiscountAmount) * state.coupons.totalDiscountPercentage
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      let newTotalAmount = 0;
      const countTotalPrice = ()=>{
        newTotalAmount = state.items.reduce((prev, curr)=>{
          return prev+ curr.totalPrice
        },0)
      }
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        countTotalPrice()
        state.totalAmount = (newTotalAmount - state.coupons.totalDiscountAmount) * state.coupons.totalDiscountPercentage
      } else {
        if(existingItem.name ==="Motion Sensor" && existingItem.quantity % 3 === 0){
          existingItem.totalPrice = existingItem.totalPrice - 15.02;        
        }
        else if(existingItem.name ==="Smoke Sensor" && existingItem.quantity % 2 ===0){
          existingItem.totalPrice = existingItem.totalPrice - 15.01;
        }
        else{
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;        
        }
        countTotalPrice()
        existingItem.quantity--;
        state.totalAmount = (newTotalAmount - state.coupons.totalDiscountAmount) * state.coupons.totalDiscountPercentage
      }
    },
    addCoupon(state, action){
      
      const newCoupon = action.payload;
      const existingCoupon = state.coupons.couponsList.find((coupon) => coupon.couponName === newCoupon.couponName)
      let newTotalAmount = 0;
      const countTotalPrice = ()=>{
        newTotalAmount = state.items.reduce((prev, curr)=>{
          return prev+ curr.totalPrice
        },0)
      }
      if(existingCoupon) return;
      state.changed = true;

      if(newCoupon.couponName === "20%OFF" && state.coupons.couponsList.length === 0 ){  // APP IS MADE SO YOU CAN ADD MULTIPLE PERCENTAGES ASS WELL, DELETE SECOND CONDITON AND CHANGE couponMixable to true in Cart.js to try this out
        state.coupons.couponMixable = newCoupon.couponMixable;
        state.coupons.couponsList.push(newCoupon) 
        state.coupons.totalDiscountPercentage -= newCoupon.discountPercentage
      }
      else if(newCoupon.couponName === "5%OFF" && state.coupons.couponMixable){
        state.coupons.couponMixable = newCoupon.couponMixable;
        state.coupons.couponsList.push(newCoupon)
        state.coupons.totalDiscountPercentage -= newCoupon.discountPercentage
      }
      else if(newCoupon.couponName === "20EUROFF" && state.coupons.couponMixable && state.totalAmount >= 20){   //COUPON ONLY APLIABLE IF THERE'S MORE THAN 20€ IN TOTAL CART
        state.coupons.couponMixable = newCoupon.couponMixable;
        state.coupons.couponsList.push(newCoupon)
        state.coupons.totalDiscountAmount += 20;  
      }
        countTotalPrice();
        state.totalAmount = (newTotalAmount - state.coupons.totalDiscountAmount) * state.coupons.totalDiscountPercentage
      
    },
  
    removeCoupon(state, action){        // THIS TIME WORKING WITH ID FOR FUN
      const newCouponId = action.payload;
      const existingCoupon = state.coupons.couponsList.find((coupon) => coupon.id === newCouponId)
      let newTotalAmount = 0;
      state.changed = true;
      const countTotalPrice = ()=>{
        newTotalAmount = state.items.reduce((prev, curr)=>{
          return prev+ curr.totalPrice
        },0)
      }
        if(existingCoupon){
          state.coupons.totalDiscountAmount -= existingCoupon.discountAmount
          state.coupons.totalDiscountPercentage += existingCoupon.discountPercentage
         // if(state.coupons.totalDiscountPercentage === 0) state.coupons.totalDiscountPercentage = 1 //FIX FOR PERCENTAGE
          state.coupons.couponsList = state.coupons.couponsList.filter((coupon) => {
          return coupon.id !== newCouponId
          })
        }
      
      countTotalPrice()
      state.totalAmount = (newTotalAmount - state.coupons.totalDiscountAmount) * state.coupons.totalDiscountPercentage
      state.coupons.couponMixable = true;  // IN CASE COUPON WAS NOT MIXABLE
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
