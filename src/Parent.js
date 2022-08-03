import { useEffect, useState } from "react";
import App from "./App";
import LoginForm from "./Component/Login/LoginForm";

const Parent = props => {
    const [isLoginSuccess,setIsLoginSuccess]=useState(false);
    const [ userName,setUserName]=useState("");
    const [userPhone,setUserPhone]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const [userStreet,setUserStreet]=useState("street");
    const [userCity,setUserCity]=useState("city");
    
    function parentCallback(childData){
        setUserName(childData.name);
        setUserPhone(childData.phoneNumber);
        setUserEmail(childData.email);
        setUserCity(childData.city);
        setUserStreet(childData.street);
    }
    useEffect(()=>{
      console.log(userName);
      console.log(userPhone);
      console.log(userEmail);
      console.log(userCity);
      console.log(userStreet);
    },[userName,userPhone,userEmail,userCity,userStreet])
    function login(){
        setIsLoginSuccess(true);
    }
    return <div>
      {!isLoginSuccess &&  <LoginForm isLog={login} data={parentCallback}/>}
      {isLoginSuccess && <App uName={userName} uPhone={userPhone} uEmail={userEmail} uCity={userCity} uStreet={userStreet}/>}
    </div>
}
export default Parent;