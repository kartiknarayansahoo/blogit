import { Link, useNavigate } from "react-router-dom"
import { SigninInput, SignupInput } from "@kartik26/mediumzod"
import { ChangeEventHandler, useState, MouseEventHandler } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const SignupAuth = () => {
    const navigate = useNavigate();
    const [userInputs, setUserInputs] = useState<SignupInput>({
        "email": "",
        "password": "",
        "name": "",
    })

    async function sendRequest() {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, userInputs)
            console.log(res);
            const jwt = res.data.jwt;
            localStorage.setItem("token", jwt);
            navigate('/blogs');
        }
        catch (e) {
            alert("Error while signing up");
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col h-screen px-6 lg:px-18 py-10 justify-center content-center">
            {/* {JSON.stringify(userInputs)} */}
            <div className="flex justify-center">
                <div className="">
                    <div className="text-3xl font-bold text-center pb-2 px-20">
                        Create an account
                    </div>
                    <div className="text-gray-500 text-center">
                        Already have an account?
                        <Link to="/signin" className="ps-1 underline hover:text-gray-600">Login</Link>
                    </div>
                    <InputBox onChange={(e) => {
                        setUserInputs({
                            ...userInputs,
                            "name": e.target.value
                        })
                    }} label="Username" placeholder="johndoe@123"></InputBox>
                    <InputBox onChange={(e) => {
                        setUserInputs({
                            ...userInputs,
                            "email": e.target.value
                        })
                    }} label="Email" placeholder="johndoe@email.com"></InputBox>
                    <InputBox onChange={(e) => {
                        setUserInputs({
                            ...userInputs,
                            "password": e.target.value
                        })
                    }} label="Password" type={"password"} placeholder="********"></InputBox>
                    <div className="p-4">
                        <AuthButton onClick={sendRequest} label="Sign Up"></AuthButton>
                    </div>
                </div>
            </div>
        </div >
    )
}


export const SigninAuth = () => {
    const navigate = useNavigate();
    const [userInputs, setUserInputs] = useState<SigninInput>({
        "email": "",
        "password": "",
    })

    async function sendRequest() {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, userInputs)
            console.log(res);
            const jwt = res.data.jwt;
            localStorage.setItem("token", jwt);
            navigate('/blogs');
        }
        catch (e) {
            alert("Error while signing up");
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col h-screen px-6 py-10 justify-center content-center">
            {/* {JSON.stringify(userInputs)} */}
            <div className="flex justify-center">
                <div className="">
                    <div className="text-3xl font-bold text-center pb-2 px-10">
                        Login into your account
                    </div>
                    <div className="text-gray-500 text-center">
                        Don't have an account?
                        <Link to="/signup" className="ps-1 underline">Sign up</Link>
                    </div>
                    <InputBox onChange={(e) => {
                        setUserInputs({
                            ...userInputs,
                            "email": e.target.value
                        })
                    }} label="Email" placeholder="johndoe@email.com"></InputBox>
                    <InputBox onChange={(e) => {
                        setUserInputs({
                            ...userInputs,
                            "password": e.target.value
                        })
                    }} label="Password" type={"password"} placeholder="********"></InputBox>
                    <div className="m-4">
                        <AuthButton onClick={sendRequest} label="Sign In"></AuthButton>
                    </div>
                </div>
            </div>
        </div >
    )
}

const AuthButton = ({ label, onClick }: { label: string, onClick: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <button onClick={onClick} className="transition duration-500 bg-transparent bg-gradient-to-br from-gray-800 to-gray-400 hover:from-violet-500 hover:to-green-400 hover:cursor-pointer active:from-violet-700 active:to-green-600 text-white w-full rounded-sm p-2 shadow-md shadow-gray-400">{label}</button>
    )
}

type inputBoxParams = {
    label: string,
    placeholder: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    type?: string
}

export const InputBox = ({ label, placeholder, onChange, type }: inputBoxParams) => {
    return (
        <div className="p-4">
            <div className="pb-2 font-medium">{label}</div>
            <input onChange={onChange} type={type || "text"} className="bg-gray-50 border-2 border-gray-300 focus:border-gray-500 focus:outline-offset-3 focus:outline-gray-500 rounded-sm p-2 w-full " placeholder={placeholder}></input>
        </div>
    )
}