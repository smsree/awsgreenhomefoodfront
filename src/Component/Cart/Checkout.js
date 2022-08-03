import classes from "./Checkout.module.css"
import {useRef,useState/*,useContext*/} from "react";
import Razorpay from "./Razorpay";
//import CartContext from "../../Store/CartContext";
const isEmpty=(value)=>value.trim()==="";
const isSixChar=(value)=>value.trim().length===6;

const Checkout = props =>{
   // const cartCtx = useContext(CartContext);
    /*const[formInputValidity,setFormInputValidity]=useState({
        name:true,
        street:true,
        city:true,
        pincode:true,
        phoneNumber:true
    })*/
    const [isSubmit, setIsSubmit]=useState(false)
   


    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const cityInputRef=useRef();
    const pincodeInputRef=useRef();
    const phoneNumberInputRef=useRef();
   
 
    const confirmHandler = (event) => {
        event.preventDefault();
        console.log("conform han dler");
        const enteredName = nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredCity=cityInputRef.current.value;
        const enteredPincode=pincodeInputRef.current.value;
        const enteredPhoneNumber=phoneNumberInputRef.current.value;


        const enteredNameIsValid=!isEmpty(enteredName);
        const  entredStreetIsValid=!isEmpty(enteredStreet);
        const enteredCityIsValid=!isEmpty(enteredCity);
        const enteredPincodeIsValid=isSixChar(enteredPincode);
        const enteredPhoneNumberIsvalid=!isEmpty(enteredPhoneNumber);
        

      /*  setFormInputValidity({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            pincode:enteredPincode,
            phoneNumber:enteredPhoneNumber
        });*/

        const formIsValid=enteredNameIsValid && enteredCityIsValid && entredStreetIsValid && enteredPincodeIsValid && enteredPhoneNumberIsvalid;

        if(!formIsValid){
            props.onConfirm({
                name:props.uName,
                street:props.uStreet,
                city:props.uCity,
                pincode:"789543",
                phoneNumber:props.uPhone
            });
              
        }
        else{
        console.log("validation doine");
         props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            pincode:enteredPincode,
            phoneNumber:enteredPhoneNumber
        })  } 

        nameInputRef.current.value="";
        streetInputRef.current.value="";
        cityInputRef.current.value="";
        pincodeInputRef.current.value="";
        phoneNumberInputRef.current.value="";
        console.log(props.userObj);
        setIsSubmit(true);
      };
      
      
    return<div>
       {!isSubmit && <form onSubmit={confirmHandler} className={classes.form}>
            <div>
                <label htmlFor="name"><b>Your name</b></label><br/>
                <input type="text" id="name" placeholder={props.uName} ref={nameInputRef}/>
                
            </div>
            <div>
                <label htmlFor="street"><b>Your street</b></label><br/>
                <input type="text" id="street" plcaeholder={props.uStreet} ref={streetInputRef}/>
                
            </div>
            <div>
                <label htmlFor="city"><b>Your city</b></label><br/>
                <input type="text" id="city" placeholder={props.uCity}ref={cityInputRef}/>
                
            </div>   
            <div>
                <label htmlFor="pincode"><b>pincode</b></label><br/>
                <input type="text" id="pincode" placeholder="789543" ref={pincodeInputRef}/>
               
            </div>
            <div>
                <label htmlFor="phoneNumber"><b>Phone Number</b></label><br/>
                <input type="number" id="phoneNumber"  placeholder={props.uPhone}ref={phoneNumberInputRef}/>
                
            </div>
      
                <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                Cancel
                </button>
                <button className={classes.submit}>Submit Order</button>
            </div>
      
        </form>}
        {isSubmit && <Razorpay />}
    </div>
}
export default Checkout;