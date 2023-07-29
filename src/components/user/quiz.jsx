import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "./modal.jsx";
import submitLogo from "../assets/pending.gif"
import wrongLogo from "../assets/fail.gif"
import correctLogo from "../assets/success.gif"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SubmitThunk, decrement, handleCheck, increment, increment_correct_ans, markedOption } from "../../redux/userSlice.js";

function Quiz() {

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const reducer = useSelector((state) => state.userReducer)
    const [quesCount, setQuesCount] = useState(reducer.ques_count);
    const [options, setOptions] = useState([])
    const [optionIndex, setOptionIndex] = useState(0)
    const [check, setCheck] = useState(0)
    const user = JSON.parse(localStorage.getItem("user"))
    const [currQues, setCurrQues] = useState({
        question: "",
        correct_answer: "",
        incorrect_answer: []
    })
    const [dialogFunc, setDialogFunc] = useState(() => () => console.log('Default function'));

    const [modal, setModal] = useState({
        title: "",
        text: "",
        buttonText: "",
        logo: '',
        size: ""
    })

    useEffect(() => {
        setQuesCount(reducer.ques_count)
        setCheck(reducer.check)
    }, [reducer.ques_count, reducer.check])

    function handleOptions(index) {
        var options = document.getElementsByClassName("options");
        for (var i = 0; i < options.length; i++) {
            if (i === index - 1) {
                options[i].style.color = "rgb(20, 184, 166)";
                setOptions(options[i].innerHTML)
                setOptionIndex(index)
            }
            else {
                options[i].style.color = "rgb(156, 163, 175)";
            }
        }
    }

    function handleNext() {
        dispatch(handleCheck(0))
        setShowModal(true)
        if (options.length > 0) {
            dispatch(markedOption({
                question: quesCount,
                answer: optionIndex
            }))
            if (options.includes(currQues.correct_answer)) {
                dispatch(increment_correct_ans())
                setModal({
                    title: "Correct Answer",
                    text: "Move to next question",
                    buttonText: "Next",
                    logo: correctLogo,
                    size: "72px"
                })
                setDialogFunc(() => () => {
                    dispatch(increment())
                    setShowModal(false)
                    setOptions([])
                    handleOptions(0)
                })
            }
            else {
                setModal({
                    title: "Incorrect Answer",
                    text: "Move to next question",
                    buttonText: "Next",
                    logo: wrongLogo,
                    size: "48px"
                })
                setDialogFunc(() => () => {
                    dispatch(increment())
                    setShowModal(false)
                    setOptions([])
                    handleOptions(0)
                })
            }
            if (quesCount === reducer.questions.length) {
                const data = {
                    username: user.username,
                    category: user.category,
                    difficulty: user.difficulty,
                    correct_ans: reducer.correct_ans,
                    total_ques: reducer.questions.length,
                    score: reducer.correct_ans * 10
                }
                setModal({
                    title: "Quiz Submission",
                    text: "Are you sure to submit your response",
                    buttonText: "Yes",
                    logo: submitLogo,
                    size: "72px"
                })
                setDialogFunc(() => () => {
                    dispatch(SubmitThunk(data)).then((res) => {
                        if (res.payload.data.success) {
                            navigate("/result")
                            setShowModal(false)
                        }
                    })
                })
            }
        }
        else {
            setModal({
                title: "No Option Selected",
                text: "Please select an option in your response",
                buttonText: "Okay",
                logo: submitLogo,
                size: "72px"
            })
            setDialogFunc(() => () => {
                setShowModal(false)
            })
        }
    }
   
    function handlePrev() {
        dispatch(decrement())
        dispatch(handleCheck(1))
    }

    function markOption(index) {
        if (check === 0) {
            console.log("yes")
            handleOptions(index)
        }
        else {
            console.log("no")
        }
    }

    useEffect(() => {
        const x = reducer.marked_options.find((item) => item.question === reducer.quesCount)
        if (x !== undefined)
            dispatch(handleCheck(1))
        else
            dispatch(handleCheck(0))
    }, [reducer])

    useEffect(() => {
        if (check === 1) {
            const x = reducer.marked_options.find((item) => item.question === quesCount)
            if (x !== undefined) {
                // console.log(x.answer, quesCount, reducer.marked_options)
                var selectedOption = x.answer
                handleOptions(selectedOption)
            }
        }
    }, [quesCount, currQues, reducer])

    useEffect(() => {
        if (reducer.questions.length > 0) {
            setCurrQues({
                ...currQues,
                question: reducer.questions[quesCount - 1].question,
                correct_answer: reducer.questions[quesCount - 1].correct_answer,
                incorrect_answer: reducer.questions[quesCount - 1].incorrect_answers
            })
        }
    }, [reducer.ques_count, quesCount])

    return <>
        <section className="w-full h-screen flex flex-col justify-center py-16 md:px-16 sm:px-4 ">
            <div className="border-red-400 border-2 inline w-fit mx-auto px-[4px] py-1 text-center mb-4">
                <p className="border-blue-500 p-2 text-3xl border-2 bg-gradient-to-r from-red-500 to-blue-400 bg-clip-text inline font-bold" style={{
                    WebkitTextFillColor: "transparent"
                }}>QUIZ COMPETETION</p>
            </div>
            <div className="flex flex-col justify-center items-center w-11/12 max-w-[720px] p-8 bg-gray-900 m-auto rounded shadow-lg">
                <div className="flex justify-end w-full">
                    <p className="text-gray-400 text-lg">{quesCount}/{reducer.questions.length}</p>
                </div>
                <h2 className="font-semibold text-white md:text-2xl text-xl text-center mb-4 md:mb-8 capitalize w-11/12 mx-auto">{currQues.question}</h2>
                <div className="grid grid-cols-2 w-full md:my-4 my-2 text-center">
                    <p className="text-lg text-gray-400 options">
                        <span className="mx-2 cursor-pointer" onClick={() => { markOption(1) }}>
                            <FontAwesomeIcon icon={faCircleDot} fontSize={14} />
                        </span>
                        {currQues.correct_answer}</p>
                    <p className="text-lg text-gray-400 options">
                        <span className="mx-2 cursor-pointer" onClick={() => { markOption(2) }}>
                            <FontAwesomeIcon icon={faCircleDot} fontSize={14} />
                        </span>
                        {currQues.incorrect_answer[0]}</p>
                </div>
                <div className="grid grid-cols-2 w-full md:mt-4 mt-2 mb-8 text-center">
                    <p className="text-lg text-gray-400 options">
                        <span className="mx-2 cursor-pointer" onClick={() => { markOption(3) }}>
                            <FontAwesomeIcon icon={faCircleDot} fontSize={14} />
                        </span>
                        {currQues.incorrect_answer[1]}</p>
                    <p className="text-lg text-gray-400 options">
                        <span className="mx-2 cursor-pointer" onClick={() => { markOption(4) }}>
                            <FontAwesomeIcon icon={faCircleDot} fontSize={14} />
                        </span>
                        {currQues.incorrect_answer[2]}</p>
                </div>

                <div className="flex justify-between w-full mb-4">
                    <button className="bg-teal-500 py-2 md:px-5 px-4 rounded-xl text-white font-medium hover:bg-teal-600"
                        style={{ visibility: quesCount === 1 ? "hidden" : "visible" }} onClick={handlePrev}>Previous</button>
                    <button className="bg-teal-500 py-2 md:px-5 px-4 rounded-xl text-white font-medium hover:bg-teal-600"
                        onClick={handleNext}>Next</button>
                </div>
            </div>
        </section>
        <Modal title={modal.title} text={modal.text} buttonText={modal.buttonText} logo={modal.logo} size={modal.size} open={showModal} setOpen={setShowModal} handleDialogBtn={dialogFunc} />
    </>
}

export default Quiz;