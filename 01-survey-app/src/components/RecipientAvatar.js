import { Avatar } from "@mui/material";

export default function RecipientAvatar(props) {

    function stringToColor(string) {
        let hash = 0;
        let i;

        if (string == null || string == "") {
            return "#989898"
        } else {

            /* eslint-disable no-bitwise */
            for (i = 0; i < string.length; i += 1) {
                hash = string.charCodeAt(i) + ((hash << 5) - hash);
            }

            let color = '#';

            for (i = 0; i < 3; i += 1) {
                const value = (hash >> (i * 8)) & 0xff;
                color += `00${value.toString(16)}`.slice(-2);
            }
            /* eslint-enable no-bitwise */

            return color;
        }
    }

    function stringAvatar(name, size) {
        let s = 25
        let f = 18

        if (size == "small") {
            s = 15
            f = 10
        }
        
        return {
            sx: {
                bgcolor: stringToColor(name),
                height: s+'px',
                width: s+'px',
                fontSize: f,
            }
        }

    }

    return (
        <Avatar {...stringAvatar(props.writer, props.size)} src="/broken-image.jpg" alt={props.writer}/>
    )
}