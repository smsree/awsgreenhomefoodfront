import React,{useRef,useState} from "react"
import classes from "./LoginForm.module.css";
const isEmpty=(value)=>value.trim()==="";
const isSixChar=(value)=>value.trim().length===6;
const UserRegistrationForm = props => {
    const [formInputValidity,setFormInputValidity]=useState({
        email:true,
        name:true,
        street:true,
        city:true,
        phoneNumber:true,
        password:true
    })
    const inputNameRef=useRef("");
    const inputEmailRef=useRef("");
    const inputSteetRef=useRef("");
    const inputCityRef=useRef("");
    const inputPhoneNumberRef=useRef("");
    const inputCreatePasswordRef=useRef("");
    

    const userRegSubmitHandler = event =>{
        event.preventDefault();
        const enteredName=inputNameRef.current.value;
        const enteredEmail=inputEmailRef.current.value;
        const enteredStreet=inputSteetRef.current.value;
        const enteredCity=inputCityRef.current.value;
        const enteredPhoneNumber=inputPhoneNumberRef.current.value;
        const enteredPassword = inputCreatePasswordRef.current.value;
        console.log(enteredCity+""+enteredEmail+""+enteredName+""+enteredStreet+""+enteredPhoneNumber+""+enteredPassword);
        const enteredNameValid = !isEmpty(enteredName)
        const enteredEmailValid= !isEmpty(enteredEmail)
        const enteredSteetValid= !isEmpty(enteredStreet)
        const enteredCityValid=!isEmpty(enteredCity)
        const enteredPhoneNumberValid=!isEmpty(enteredPhoneNumber)
        const enteredPasswordValdi = isSixChar(enteredPassword)
        console.log(enteredCityValid)
        setFormInputValidity({
            email:enteredEmailValid,
            name:enteredNameValid,
            street:enteredSteetValid,
            city:enteredCityValid,
            phoneNumber:enteredPhoneNumberValid,
            password:enteredPasswordValdi
        })
        const formValid = enteredEmailValid && enteredNameValid && enteredPasswordValdi && enteredPhoneNumberValid && enteredCityValid && enteredSteetValid;
        if(!formValid){
            return;
        }
         fetch("http://ec2-34-220-134-123.us-west-2.compute.amazonaws.com:8100/userRegistration/add",{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({
                email:enteredEmail,
                name:enteredName,
                street:enteredStreet,
                city:enteredCity,
                phoneNumber:enteredPhoneNumber,
                password:enteredPassword
            })
          });
        inputNameRef.current.value="";
        inputEmailRef.current.value="";
        inputPhoneNumberRef.current.value="";
        inputSteetRef.current.value="";
        inputCityRef.current.value="";
        inputCreatePasswordRef.current.value="";
    }
    return <form onSubmit={userRegSubmitHandler} className={classes.form}>
        <h1>New user Registration form</h1>
        <div>
            <label htmlFor="name">Enter name:</label><br/>
            <input type="text" id="name" ref={inputNameRef}/>
            {!formInputValidity.name && <p>Please enter name:</p>}
        </div>
        <div>
            <label htmlFor="email">Enter email:</label><br/>
            <input type="email" id="email" ref={inputEmailRef}/>
            {!formInputValidity.email && <p>Please enter email:</p>}
        </div>
        <div>
            <label htmlFor="address">Enter phone number:</label><br/>
            <input type="text" id="address" ref={inputPhoneNumberRef}/>
            {!formInputValidity.phoneNumber && <p>Please enter phone number:</p>}
        </div>
        <div>
            <label htmlFor="street">Enter Street:</label><br/>
            <input type="text" id="street" ref={inputSteetRef}/>
            {!formInputValidity.street && <p>Please enter Street:</p>}
        </div>
        <div>
            <label htmlFor="city">Enter city:</label><br/>
            <input type="text" id="city" ref={inputCityRef}/>
            {!formInputValidity.city && <p>Please enter city:</p>}
        </div>
        <div>
            <label htmlFor="create">Create password:</label><br/>
            <input type="text" id="create" ref={inputCreatePasswordRef}/>
            {!formInputValidity.password && <p>password must be six charaters:</p>}
        </div>
        
        <button type="submit">Register</button>
        <button type="button" onClick={props.onCloseReg}>close</button>
    </form>
    
}
export default UserRegistrationForm