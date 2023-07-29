import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Result() {

    const reducer = useSelector((state) => state.userReducer)
    const navigate = useNavigate()
    const name = JSON.parse(localStorage.getItem("user"))
    const correct_ans = reducer.correct_ans
    const total_ques = reducer.questions.length
    const wrong_ans = total_ques - correct_ans
    const score = correct_ans * 10
    const percentage = (score / (total_ques * 10)) * 100
    const [check, setCheck] = useState(0)

    useEffect(() => {
        if (reducer.msg != "" && check == 0) {
            setCheck(1)
            toast.success(`${reducer.msg}`, {
                position: "top-right",
                theme: "light",
            });
        }
    }, [reducer.msg])

    return <>
        <section className="w-full h-screen flex flex-col py-16 px-4 md:p-24">
            <div className="border-red-400 border-2 inline px-[4px] py-1 w-fit mx-auto text-center mb-16">
                <p className="border-blue-500 p-2 text-3xl border-2 bg-gradient-to-r from-red-500 to-blue-400 bg-clip-text inline font-bold" style={{
                    WebkitTextFillColor: "transparent"
                }}>RESULTS</p>
            </div>

            <div className="flex flex-col justify-center items-center mx-auto max-w-[560px] w-11/12">
                <div className="flex w-full items-center justify-start my-2 gap-4 mx-auto">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Name:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">{name.username}</p>
                </div>
                <div className="flex w-full items-center justify-start my-2 gap-4">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Correct Answer Count:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">{correct_ans}</p>
                </div>
                <div className="flex w-full items-center justify-start my-2 gap-4">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Wrong Answer Count:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">{wrong_ans}</p>
                </div>
                <div className="flex w-full items-center justify-start my-2 gap-4">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Total Score:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">{score}</p>
                </div>
                <div className="flex w-full items-center justify-start my-2 gap-4">
                    <label className="text-xl font-semibold text-gray-200 underline underline-offset-4 w-2/5">Percentage:</label>
                    <p className="text-gray-300 text-lg px-2 py-1 rounded bg-gray-600 w-1/2">{percentage}%</p>
                </div>

                <div className="flex justify-end w-full me-16">
                <button type="submit" className="w-full my-8 bg-black text-teal-500 shadow-sm shadow-teal-400 rounded-lg focus:bg-teal-600 p-2 font-semibold max-w-[200px] outline-none" onClick={()=>{
                    navigate("/dashboard")
                }}>To Dashboard</button>
                </div>
            </div>
        </section >
        <ToastContainer />
    </>
}

export default Result