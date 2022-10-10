import CloseIcon from '@mui/icons-material/Close';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import {
    Link as RouterLink
} from "react-router-dom";
import Link from '@mui/material/Link';


export default function CloseButton(props) {

    return (
        <Link to="/" component={RouterLink} style={{ textDecoration: 'none' }}>
        <div style={{ position: "fixed", top: 0, right: 0, padding: "2rem" , margin: "2rem", borderRadius: "0.5rem", backgroundColor: props.backgroundColor, boxShadow: "3px 3px 5px rgba(0,0,0,0.3)"}}>
            
                <KeyboardReturnIcon color={props.color} fontSize="large"/>
            
        </div>
        </Link>
    )
}