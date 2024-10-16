import { makeStyles } from "@mui/styles"

const videoStyles = makeStyles((theme) => ({
    video : {
        width : '550px',
        [theme.breakpoints.down('xs')] : {
            width : '300px'
        }
    }, 
    gridContainer : {
        justifyContent : 'center',
        [theme.breakpoints.down('xs')] : {
            flexDirection : 'column'
        }
    },
    paper : {
        padding : '10px',
        border : '2px solid black',
        margin : '10px'
    }
}));

export default videoStyles