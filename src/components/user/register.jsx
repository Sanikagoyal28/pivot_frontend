import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Input from "../admin/input"
import { useNavigate } from "react-router"
import { CategoryThunk, QuestionThunk } from "../../redux/categorySlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../utils/loader"
import { GetQuestionThunk } from "../../redux/userSlice"

function Register() {
    const [inputs, setInputs] = useState({
        username: "",
        category: "",
        difficulty: "",
        numOfQues: "",
    })
    const [categories, setCategories] = useState([])
    var [questions, setQuestions] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reducer = useSelector((state) => state.userReducer)
    const categReducer = useSelector((state) => state.categReducer)

    function handleChange(identifier, value) {
        setInputs({
            ...inputs,
            [identifier]: value
        })
    }

    function handleCategory() {
        dispatch(CategoryThunk())
        console.log("category")
    }

    useEffect(() => {
        setCategories(categReducer.categories)
    }, [categReducer])

    function handleQuestion() {
        dispatch(QuestionThunk({
            category: inputs.category,
            difficulty: inputs.difficulty,
        }))
    }

    useEffect(() => {
        // form an array from the number of questions
        setQuestions(Array.from({ length: categReducer.ques_count }, (_, index) => index + 1))
    }, [categReducer.ques_count])


    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            username: inputs.username,
            category: inputs.category,
            difficulty: inputs.difficulty,
            numOfQues: inputs.numOfQues,
        }

        localStorage.setItem("user", JSON.stringify(data))

        console.log(data)
        if (inputs.username && inputs.category && inputs.difficulty && inputs.numOfQues) {
            const data2 = {
                category: inputs.category,
                difficulty: inputs.difficulty,
                num_of_ques: inputs.numOfQues,
            }
            dispatch(GetQuestionThunk(data2)).
                then((res) => {
                    if (res.payload.data.success) {
                        navigate("/quiz")
                    }
                })
        }
    }

    return <>
        <div className="flex flex-col justify-center w-full py-12">
            <form className="h-fit bg-gray-900 py-4 px-4 md:px-8 text-white w-11/12 rounded shadow-lg max-w-[500px] mx-auto" onSubmit={handleSubmit}>
                <h2 className="font-bold text-3xl text-center my-4">User Registration</h2>
                <Input label="Username" placeholder="Enter your Username" name="username" onChange={handleChange} value={inputs.username} />
                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Category</label>
                    <select className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" required onChange={(e) => {
                        handleChange("category", e.target.value)
                    }} onClick={handleCategory} >
                        <option value="">--select--</option>
                        {categories.length > 0 && categories.map((item) => {
                            return <option value={item._id} key={item._id}>
                                {item.category}
                            </option>
                        })}
                    </select>
                </div>
                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Difficulty</label>
                    <select className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" required onChange={(e) => {
                        handleChange("difficulty", e.target.value)
                    }} value={inputs.difficulty}>
                        <option value="">--select--</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div className="flex flex-col max-w-4/5 w-full mx-auto my-4 text-gray-200">
                    <label className="text-base mb-1">Number of Questions</label>
                    <select className="bg-gray-700 rounded-lg p-2 outline-none focus:bg-gray-800 focus:border border-gray-700" required onChange={(e) => {
                        handleChange("numOfQues", e.target.value)
                    }} onClick={handleQuestion} value={inputs.numOfQues} >
                        <option value="">--select--</option>
                        {questions.length > 0 && questions.map((item) => {
                            return <option value={item} key={item}>{item}</option>
                        })}
                    </select>
                </div>
                <button type="submit" className="w-full my-8 text-black bg-teal-500 shadow-sm shadow-teal-400 rounded-lg focus:bg-teal-600 duration-300 ease-in p-2 font-semibold max-w-4/5 outline-none hover:scale-[1.02]">Register</button>
            </form>
        </div>
        <Loader loading={reducer.loading} />
    </>
}

export default Register;