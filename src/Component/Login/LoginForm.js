import AdminModal from "../UI/AdminModal";
import React,{useState,useRef} from "react";
import AdminLoginForm from "../Admin/AdminLoginform";
import UserRegistrationForm from "./UserRegistrationForm";

const LoginForm = props => {
        const [showUserReg,setShowUserReg]=useState(false);
        const [showAdmin,setShowAdmin]=useState(false);
        //const [lName,setLName]=useState("-")
       // const [lPass,setLPass]=useState("-")
        const [userData,setUserData]=useState({
            name:"",
            email:"",
            phoneNumber:"",
            street:"",
            city:"",
            password:""
        })
        const inputNameRef=useRef();
        const inputLPassRef=useRef();
       /* useEffect(()=>{
            const fetchMeals=async () => {
                const response = await fetch("http://localhost:8100/userRegistration/find/"+resource);
                const ressponseData = await response.json();
                console.log(resource)
                setUserData(ressponseData);
                console.log(lName);
              };
              fetchMeals();
        },[lName])*/

       
        const loginSubmitHandler=async(event)=>{
            event.preventDefault();
            const username=inputNameRef.current.value;
            const password = inputLPassRef.current.value;
            console.log(username);
            const response=await fetch("http://ec2-34-220-134-123.us-west-2.compute.amazonaws.com:8100/userRegistration/find/"+username);
            const responseData= await response.json();
            console.log(responseData);
            setUserData(responseData)
            if(userData.email === username && userData.password === password){
                props.isLog();
                props.data(userData);
            }
            else{
                console.log("User not found please register as new user");
            }
        }
        const MainLoginForm =   <form onSubmit={loginSubmitHandler}>
                                    <h1>Welcome to Green Home Foods</h1>
                                    <label htmlFor="email"><b>Enter email:</b></label><br/>
                                    <input type="email" id="email"  ref={inputNameRef}/><br/>
                                    <label htmlFor="password"><b>Enter password:</b></label><br/>
                                    <input type="password" id="password" ref={inputLPassRef}/><br/>
                                    <button type="submit">Login</button>
                                    <button type="button" onClick={()=>{setShowUserReg(true)}} >New User</button>
                                    <button type="button" onClick={()=>{setShowAdmin(true)}}>Admin</button>
                                </form>
        
    

    return <div>
          <AdminModal>
            {!showAdmin && MainLoginForm}
            {!showAdmin && showUserReg && <UserRegistrationForm onCloseReg={()=>{setShowUserReg(false)}}/>}
            {showAdmin && <AdminLoginForm onCloseAdmin={()=>{setShowAdmin(false)}}/>}
            </AdminModal>
            
        </div>
}
export default LoginForm;