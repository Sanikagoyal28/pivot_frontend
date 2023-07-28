
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "./modal.jsx";
import submitLogo from "../assets/pending.gif"
import wrongLogo from "../assets/fail.gif"
import correctLogo from "../assets/success.gif"
import { useNavigate } from "react-router";

function Quiz() {

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [quesCount, setQuesCount] = useState(1);
    const [options, setOptions] = useState([])
    const [dialogFunc, setDialogFunc] = useState(() => () => console.log('Default function'));

    const [modal, setModal] = useState({
        title: "",
        text: "",
        buttonText: "",
        logo: '',
        size: ""
    })

    function handleOptions(index) {
        var options = document.getElementsByClassName("options");
        for (var i = 0; i < options.length; i++) {
            if (i === index - 1) {
                options[i].style.color = "rgb(20, 184, 166)";
                setOptions(options[i].innerHTML)
            }
            else {
                options[i].style.color = "rgb(156, 163, 175)";
            }

        }
    }

    function handleNext() {
        handleOptions(0)
        setShowModal(true)
        if (options.length > 0) {
            setQuesCount((count) => count + 1)
            if (options.includes("Option 3")) {
                setModal({
                    title: "Correct Answer",
                    text: "Move to next question",
                    buttonText: "Next",
                    logo: correctLogo,
                    size: "72px",
                    handleDialogBtn: () => {
                        setQuesCount((count) => count + 1)
                        setShowModal(false)
                    }
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
                    setQuesCount((count) => count + 1)
                    setShowModal(false)
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
                console.log('no option')
            })
        }
        if (quesCount === 9) {
            setModal({
                title: "Quiz Submission",
                text: "Are you sure to submit your response",
                buttonText: "Yes",
                logo: submitLogo,
                size: "72px"
            })
            setDialogFunc(() => () => {
                navigate("/result")
                setShowModal(false)
            })
        }
    }

    // count update by redux
    // show marked answers by storing the ans in array, display the ans corresponding to count

    return <>
        <section className="w-full h-screen flex flex-col justify-center p-16">
        <div className="border-red-400 border-2 inline w-fit mx-auto px-[4px] py-1 text-center mb-12">
                <p className="border-blue-500 p-2 text-3xl border-2 bg-gradient-to-r from-red-500 to-blue-400 bg-clip-text inline font-bold" style={{
                    WebkitTextFillColor: "transparent"
                }}>QUIZ COMPETETION</p>
            </div>
            <div className="flex flex-col justify-center items-center w-11/12 max-w-[720px] p-8 bg-gray-900 m-auto rounded shadow-lg">
                <div className="flex justify-end w-full">
                    <p className="text-gray-400 text-lg">{quesCount}/10</p>
                </div>
                <h2 className="font-bold text-white text-2xl text-center mb-8">What is the capital of India?</h2>
                <div className="grid grid-cols-2 w-full my-4">
                    <p className="text-lg text-gray-400 text-center options">
                        <span className="mx-2 cursor-pointer" onClick={() => { handleOptions(1) }}>
                            <FontAwesomeIcon icon={faCircleDot} fontSize={14} />
                        </span>
                        Option 1</p>
                    <p className="text-lg text-gray-400 text-center options">
                        <span className="mx-2 cursor-pointer" onClick={() => { handleOptions(2) }}>
                            <FontAwesomeIcon icon={faCircleDot} fontSize={14} />
                        </span>
                        Option 2</p>
                </div>
                <div className="grid grid-cols-2 w-full mt-4 mb-8">
                    <p className="text-lg text-gray-400 text-center options">
                        <span className="mx-2 cursor-pointer" onClick={() => { handleOptions(3) }}>
                            <FontAwesomeIcon icon={faCircleDot} fontSize={14} />
                        </span>
                        Option 3</p>
                    <p className="text-lg text-gray-400 text-center options">
                        <span className="mx-2 cursor-pointer" onClick={() => { handleOptions(4) }}>
                            <FontAwesomeIcon icon={faCircleDot} fontSize={14} />
                        </span>
                        Option 4</p>
                </div>

                <div className="flex justify-between w-full mb-4">
                    <button className="bg-teal-500 py-2 px-5 rounded-xl text-white font-medium hover:bg-teal-600"
                        style={{ visibility: quesCount === 1 ? "hidden" : "visible" }} onClick={() => { setQuesCount((count) => count - 1) }}>Previous</button>
                    <button className="bg-teal-500 py-2 px-5 rounded-xl text-white font-medium hover:bg-teal-600"
                        style={{ innerHTML: quesCount === 9 ? "Submit" : "Next" }}
                        onClick={handleNext}>Next</button>
                </div>
            </div>
        </section>
        <Modal title={modal.title} text={modal.text} buttonText={modal.buttonText} logo={modal.logo} size={modal.size} open={showModal} setOpen={setShowModal} handleDialogBtn={dialogFunc} />
    </>
}

export default Quiz;