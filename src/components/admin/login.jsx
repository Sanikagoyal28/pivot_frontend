import { useDispatch, useSelector } from "react-redux"
import Input from "./input"
import { useState } from "react"
import { LoginThunk } from "../../redux/adminSlice"
import Loader from "../../utils/loader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router"

function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reducer = useSelector((state) => state.adminReducer)

    function handleChange(identifier, value) {
        setInputs({
            ...inputs,
            [identifier]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            username: inputs.username,
            password: inputs.password
        }

        dispatch(LoginThunk(data)).
            then((res) => {
                if (res.payload.data.success) {
                    localStorage.setItem("token", res.payload.data.accesstoken)
                    toast.success(`${res.payload.data.msg}`, {
                        position: "top-right",
                        theme: "light",
                    });
                    navigate("/admin/addQues")
                }
                else {
                    toast.error(`${res.payload.data.msg}`, {
                        position: "top-right",
                        theme: "light",
                    });
                }
            })
    }
    return <>
        <div className="flex flex-col justify-center h-screen w-full">
            <form className="bg-gray-900 py-4 md:px-12 sm:px-8 px-4 text-white w-11/12 rounded shadow-lg max-w-[500px] mx-auto" onSubmit={handleSubmit}>
                <h2 className="font-bold text-3xl text-center my-4">Admin SignIn</h2>
                <Input label="Username" placeholder="Enter your Username" name="username" onChange={handleChange} />
                <Input label="Password" placeholder="Enter your Password" name="password" onChange={handleChange} />
                <button type="submit" className="w-full my-8 text-black bg-teal-500 shadow-sm shadow-teal-400 rounded-lg focus:bg-teal-600 duration-300 ease-in p-2 font-semibold max-w-4/5 outline-none hover:scale-[1.02]">Signin</button>
            </form>
        </div>
        <Loader loading={reducer.loading} />
        <ToastContainer />
    </>
}

export default Login