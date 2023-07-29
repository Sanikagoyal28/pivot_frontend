import { useEffect, useState } from "react"
import Input from "./input"
import { useDispatch, useSelector } from "react-redux"
import { AddQuestionThunk } from "../../redux/adminSlice"
import { CategoryThunk } from "../../redux/categorySlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../utils/loader"

function AddQues() {

    const [inputs, setInputs] = useState({
        category: "",
        difficulty: "",
        question: "",
        correct_answer: "",
        option1: "",
        option2: "",
        option3: "",
        incorrect_answers: [
        ]
    })
    const [categories, setCategories] = useState([])
    const dispatch = useDispatch()
    const reducer = useSelector((state) => state.adminReducer)
    const categReducer = useSelector((state) => state.categReducer)

    function handleChange(identifier, value) {
        setInputs({
            ...inputs,
            [identifier]: value
        })
    }

    function handleCategory() {
        dispatch(CategoryThunk())
    }

    useEffect(() => {
        setCategories(categReducer.categories)
    }, [categReducer])

    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            category: inputs.category,
            difficulty: inputs.difficulty,
            question: inputs.question,
            correct_answer: inputs.correct_answer,
            incorrect_answers: [
                inputs.option1, inputs.option2, inputs.option3
            ]
        }

        dispatch(AddQuestionThunk(data)).
            then((res) => {
                if (res.payload.data.success) {
                    toast.success(`${res.payload.data.msg}`, {
                        position: "top-right",
                        theme: "light",
                    });
                }
                else {
                    toast.error(`${res.payload.data.msg}`, {
                        position: "top-right",
                        theme: "light",
                    });
                }
            })

        setInputs({
            category: "",
            difficulty: "",
            question: "",
            correct_answer: "",
            option1: "",
            option2: "",
            option3: "",
            incorrect_answers: [
            ]
        })
    }

    return <>
        <section className="flex flex-col justify-center items-center w-full py-12">
            <div className="border-red-400 border-2 inline px-[4px] py-1 text-center mb-12">
                <p className="border-blue-500 p-2 text-3xl border-2 bg-gradient-to-r from-red-500 to-blue-400 bg-clip-text inline font-bold" style={{
                    WebkitTextFillColor: "transparent"
                }}>ADD QUESTION</p>
            </div>
            <form className="bg-gray-900 py-4 md:px-12 sm:px-8 px-4 text-white w-11/12 rounded shadow-lg max-w-[500px] mx-auto" onSubmit={handleSubmit}>
                <h2 className="font-semibold md:text-2xl text-xl text-center my-4">Add a Question by selecting a category, its Difficulty level and their options</h2>
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

                <Input label="Question" placeholder="Enter Question" name="question" onChange={handleChange} value={inputs.question} />
                <Input label="Correct Answer" placeholder="Enter Correct Answer" name="correct_answer" onChange={handleChange} value={inputs.correct_answer} />
                <Input label="Option 1" placeholder="Enter Option 1" name="option1" onChange={handleChange} value={inputs.option1} />
                <Input label="Option 2" placeholder="Enter Option 2" name="option2" onChange={handleChange} value={inputs.option2} />
                <Input label="Option 3" placeholder="Enter Option 3" name="option3" onChange={handleChange} value={inputs.option3} />

                <button type="submit" className="w-full mt-6 mb-8 text-black bg-teal-500 shadow-sm shadow-teal-400 rounded-lg focus:bg-teal-600 duration-300 ease-in p-2 font-semibold max-w-4/5 outline-none hover:scale-[1.02]">Add Question</button>
            </form>
        </section>
        <Loader loading={reducer.loading} />
        <ToastContainer />
    </>
}

export default AddQues