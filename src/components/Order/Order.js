import {useRef, useState} from 'react';
import classes from "./Order.module.css"
import Card from '../UI/Card';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {cartActions} from '../../store/cart-slice';



const Order = () => {
  const [imageSrc, setImageSrc] = useState("")
  const [cardIsValid, setCardIsValid] = useState(false)
  const [cardTouched, setCardTouched] = useState(false)
  const [cvvIsValid, setCvvIsValid] = useState(false)
  const [cvvIsTouched, setCvvIsTouched] = useState(false)

  const dispatch = useDispatch(cartActions)
  const navigate =  useNavigate()
  const cart = useSelector((state => state.cart))
  const cardInput = useRef("");
  const cvvInput = useRef("");
  const form = useRef("")

  const masterCard = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
  const americanExpress = /^3[47][0-9]{13}$/;
  const Visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const discover = /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/;
  const maestro = /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/;
  const jcb = /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/;
  const diners = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;


  const formSubmitHandler = (e) =>{
    e.preventDefault()
    if(cardIsValid && cvvIsValid){
      navigate("/complete")
      // dispatch(cartActions.removeState())
     
    }

   
  }

  const cardBlurHandler = () =>{
    setCardTouched(true)
    if (cardInput.current.value.match(masterCard)){
      setImageSrc("https://assets.webiconspng.com/uploads/2017/09/Mastercard-PNG-Image-83251.png")
      setCardIsValid(true)
    }
    else if(cardInput.current.value.match(Visa)){
      setImageSrc("https://logowik.com/content/uploads/images/857_visa.jpg")
      setCardIsValid(true)
    }
    else if(cardInput.current.value.match(americanExpress)){
      setImageSrc("https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png")
      setCardIsValid(true)
    }
    else if(cardInput.current.value.match(discover)){
      setImageSrc("https://ibsintelligence.com/wp-content/uploads/2021/02/Discover-Financial.jpg")
      setCardIsValid(true)
    }
    else if(cardInput.current.value.match(maestro)){
      setImageSrc("https://cdn.iconscout.com/icon/free/png-256/maestro-credit-debit-card-bank-transaction-32299.png")
      setCardIsValid(true)
    }
    else if(cardInput.current.value.match(jcb)){
      setImageSrc("https://cdn.iconscout.com/icon/free/png-256/jcb-credit-debit-card-bank-transaction-1-32327.png")
      setCardIsValid(true)
    }
    else if(cardInput.current.value.match(diners)){
      setImageSrc("https://www.pikpng.com/pngl/m/208-2087430_diners-club-logo-svg-clipart.png")
      setCardIsValid(true)
    }
    else {
      setCardIsValid(false)

    }
  }

  const cardFocusHandler = () =>{
    setCardTouched(false) 
  }

  const cvvBlurHandler = () => {
   const regex = /^[0-9]{3,4}$/;

   setCvvIsTouched(true)
    if (cvvInput.current.value.match(regex)){
      setCvvIsValid(true)
    }
    else{
      setCvvIsValid(false)
    }
    

  }
  const cvvFocusHandler = () => {
    setCvvIsTouched(false)

  }

  return (  
    <Card className={classes.wrapper}>
      <div className={classes.wrapper}>
        <form ref={form} className={classes.form} onSubmit={formSubmitHandler}>
            <h1>Enter your details to make the order</h1>
            <label htmlFor="name"></label>
            <input id="name" placeholder='Full Name:' required></input>
            <label htmlFor='address' required></label>
            <input id='address' placeholder='Full Address' required></input>
            <label htmlFor='email' required ></label>
            <input id='email' placeholder='Email' type="email" required></input>
            <label htmlFor='card' required></label>
            <input className={`${cardTouched && !cardIsValid ? `${classes.err}` : ""}`} ref={cardInput} onFocus={cardFocusHandler} onBlur={cardBlurHandler} id='card' placeholder='Creit Card Number' type="tel" required autoComplete='nope'></input>
            {cardTouched && !cardIsValid && <p className={classes.errorMessage}>Invalid Card Number</p>}
            <img className={classes.img} src={imageSrc} ></img>
            <label htmlFor='cvv' required></label>
            <input className={`${cvvIsTouched && !cvvIsValid ? `${classes.err}` : ""}`} onFocus={cvvFocusHandler} onBlur={cvvBlurHandler} ref={cvvInput} id='cvv' placeholder='CVV' maxLength={4} required></input>
            {cvvIsTouched && !cvvIsValid && <p className={classes.errorMessage}>Invalid CVV Number</p>}
            
            <button className={classes.formBtn}>Pay {cart.totalAmount.toFixed(2)}€</button>
        </form>
      </div>
    </Card>     
  )
};
export default Order;