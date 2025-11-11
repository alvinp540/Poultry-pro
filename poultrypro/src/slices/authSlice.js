import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc,setDoc,getDoc } from "firebase/firestore";
import { db } from "../src/firebase/firebaseconfig";
import { auth } from "../src/firebase/firebaseconfig";

const initialState = {
    user:null,
    role:null,
    loading:false,
    error:null,
};

//declare slice
const authSlice = createSlice({
     name:"auth",
    initialState,
    reducers:{
        //initial loading
        startLoading:(state) => {
            state.loading = true
        },
       //enter user info
        setUser: (state,action) =>{
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.loading = false;
            state.error =null;
        },
       //clear user field
        clearUser:(state) => {
             state.user = null;
            state.role = null;
            state.loading = false;
            state.error =null; 
        },
        setError:(state,action) =>{
            
            state.error =action.payload;
            state.loading =false;
        },
    
    }
})

export const {startLoading,setUser,clearUser,setError} = authSlice.actions
export default authSlice.reducer
//redux thunk
//registering a user
export const registerUser = (email,password,role) => async (dispatch) =>{
    dispatch(startLoading());
    try {
        //api call
        const userdetails = await createUserWithEmailAndPassword(auth,email,password);

        //convert to consumabe data
        const user = userdetails.user;
        await setDoc(doc(db,"users",user.uid),{email,role})
        dispatch(setUser({user,role}))
    } catch (error) {
        dispatch(setError(error.message));
        
    }
}
    //thunk to log in
    export const Login =(email,password) => async (dispatch) => {
        dispatch(startLoading());
        try {
            //api call
            const userDetails = await signInWithEmailAndPassword(auth,email,password);
            //convert to consumable data
            const user = userDetails.user
            //check firestore for user detail 
            const docSnapShot = await getDoc(doc(db,"users",user.uid),);
            if(!docSnapShot.exists()){
                dispatch(setError("user does not exist"))
                await signOut(auth);
                return;
            }
            const role =docSnapShot.data().role;
            dispatch(setUser({user,role}));
        } catch (error) {
           if(error.code === "auth/user not found"){
            dispatch(setError("User not registered"))
           } 
           else if (error.code === "auth/wronng user credentials")
            {dispatch(setError("Incorrect email or password"))
            }
            else{dispatch(setError(error.message))}
           
                
        }

    }
//logout
export const Logout = () => async(dispatch) =>{
    await  signOut(auth);
    dispatch(clearUser());
}
