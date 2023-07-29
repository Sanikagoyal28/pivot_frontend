import { Dialog } from "@mui/material";

function Modal(props){

    function handleBtn (){
        props.handleDialogBtn()
    }
    
    return <>
    <Dialog open={props.open} className="w-full mx-auto rounded-lg shadow-lg px-8 h-screen flex flex-col justify-center">
        <div className="w-full mx-auto sm:min-w-[360px] px-4 sm:px-12 py-8 flex flex-col justify-center items-center m-auto bg-teal-600">
            <h2 className="font-bold text-xl text-white text-center">{props.title}</h2>
            <img src={props.logo} width={props.size} />
            <p className="font-medium text-lg text-gray-200 text-center">{props.text}</p>
            <button className="bg-gray-900 py-2 mt-4 mb-2 px-10 rounded-lg text-teal-500 font-medium hover:scale-105 duration-300 ease-in-out overflow-hidden" onClick={()=>{handleBtn()}}>{props.buttonText}</button>
        </div>
        </Dialog>
    </>
}

export default Modal;