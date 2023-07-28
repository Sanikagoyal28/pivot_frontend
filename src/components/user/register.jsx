import { useState } from "react"
import { useDispatch } from "react-redux"
import Input from "../admin/input"
import { useNavigate } from "react-router"

function Register() {
    const [inputs, setInputs] = useState({
        name: "",
        category: "",
        difficulty: "",
        numOfQues: "",
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            category: inputs.category,
            difficulty: inputs.difficulty,
            numOfQues: inputs.numOfQues,
        }

        console.log(data)
        navigate("/quiz")
    }
    return <>
        <div className="flex flex-col justify-center h-screen w-full">
            <form className="flex flex-col justify-center items-center bg-gray-900 py-4 px-12 text-white w-11/12 rounded shadow-lg max-w-[500px] mx-auto" onSubmit={handleSubmit}>
                <h2 className="font-bold text-3xl text-center my-4">User Registration</h2>
                <Input label="Username" placeholder="Enter your Username" name="username" onChange={handleChange} />
                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Category</label>
                    <select className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" required onChange={(e) => {
                        handleChange("category", e.target.value)
                    }}>
                        <option value="">--select--</option>
                        <option value="general_knowledge">General Knowledge</option>
                        <option value="science">Science</option>
                        <option value="sports">Sports</option>
                        <option value="music">Music</option>
                    </select>
                </div>

                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Difficulty</label>
                    <select className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" required onChange={(e) => {
                        handleChange("difficulty", e.target.value)
                    }}>
                        <option value="">--select--</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Number of Questions</label>
                    <select className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" required onChange={(e) => {
                        handleChange("difficulty", e.target.value)
                    }}>
                        <option value="">--select--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <button type="submit" className="w-full my-8 text-black bg-teal-500 shadow-sm shadow-teal-400 rounded-lg focus:bg-teal-600 duration-300 ease-in p-2 font-semibold max-w-4/5 outline-none hover:scale-[1.02]">Signin</button>
            </form>
        </div>
    </>
}

export default Register;