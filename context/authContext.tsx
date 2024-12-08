import { firebase_auth } from "@/constants/firebase";
import { useRouter, useSegments } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);
const auth = firebase_auth;

export const useAuth = () => {
    return useContext(AuthContext);
};

const handleLogin = async ({email,password}:any) => {
    // Handle login logic here
    try{
        const res = await signInWithEmailAndPassword(auth,email,password);
        localStorage.setItem("cross_mail", email);
        console.log(res);
    }
    catch(error){
        console.log(error);
        alert(error);
    }
};

const handleRegister = async ({email,password}:any) => {
    console.log(email);
    console.log(password);
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        console.log(res);
    }
    catch(error){
        console.log(error);
    }
};

const handleLogout = async () => {
    signOut(auth);
}

export function Provider({children}:PropsWithChildren){
    const [user,setUser] = useState<User|null>(null);
    const rootSegment = useSegments()[0];
    const router = useRouter();

    useEffect(()=>{
       onAuthStateChanged(auth,(usr)=>{setUser(usr)});
    },[]);

    useEffect(()=>{
        if(!user && rootSegment !== "(auth)"){
            router.replace("/(auth)/");
        }
        if(user && rootSegment !== "(app)"){
            router.replace("/(app)/");
        }
    },[user,rootSegment]);

    return(
        <AuthContext.Provider
        value={{
            user:user,
            login:async(email:string, password:string)=> {await handleLogin({email,password});},
            register: async(email:string,password:string)=> {await handleRegister({email,password})},
            logout: ()=> {handleLogout()},
        }}
        >
            {children}
        </AuthContext.Provider>
    );

}