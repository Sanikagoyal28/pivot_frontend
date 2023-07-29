import { useEffect } from "react";
import * as ReactBootstrap from 'react-bootstrap';

function Loader(props) {

    const { loading } = props

    useEffect(() => {
        if (loading === true) {
            document.body.style.opacity = 0.5;
        }
        else {
            document.body.style.opacity = 1;
        }
    }, [loading])

    return <>
        <div className="fixed top-[45vh] left-[50vw] z-50">
            {loading ? <ReactBootstrap.Spinner animation="border" variant="light" className="" /> : null}
        </div>
    </>
}

export default Loader