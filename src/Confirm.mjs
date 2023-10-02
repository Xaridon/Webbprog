import {useNavigate, useParams, useOutletContext} from "react-router-dom";



function Confirm() {
    let params = useParams();
    const props = useOutletContext();
    const navigate = useNavigate();

    try {
        const senasteBeställningen = props.shoppingCart.find(obj => {
            return obj.uuid === params.uuid
        })

        return(
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Du la till: </strong> {Object.keys(senasteBeställningen.ingredients).join(', ')}
            </div>
            )
    } catch (error) {
        return <div></div>
    }

}

export default Confirm;