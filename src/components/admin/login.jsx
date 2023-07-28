import { useDispatch } from "react-redux"
import Input from "./input"
import { useState } from "react"

function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch()

    function handleChange(identifier, value) {
        setInputs({
            ...inputs,
            [identifier]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const data = {
            username: inputs.username,
            password: inputs.password
        }

        console.log(data)
    }
    return <>
        <div className="flex flex-col justify-center h-screen w-full">
            <form className="flex flex-col justify-center items-center bg-gray-900 py-4 px-12 text-white w-11/12 rounded shadow-lg max-w-[500px] mx-auto" onSubmit={handleSubmit}>
                <h2 className="font-bold text-3xl text-center my-4">Admin SignIn</h2>
                <Input label="Username" placeholder="Enter your Username" name="username" onChange={handleChange} />
                <Input label="Password" placeholder="Enter your Password" name="password" onChange={handleChange} />
                <button type="submit" className="w-full my-8 text-black bg-teal-500 shadow-sm shadow-teal-400 rounded-lg focus:bg-teal-600 duration-300 ease-in p-2 font-semibold max-w-4/5 outline-none hover:scale-[1.02]">Signin</button>
            </form>
        </div>
    </>
}

export default Login