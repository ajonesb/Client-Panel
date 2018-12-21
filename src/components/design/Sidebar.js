import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/PersonAdd'

const DashBoard = (props) =>{
    

    return(
        <Button variant="contained" color="secondary" className="buttonStyle">
            <Link to="/client/add" className="linkitem">
                <AddIcon></AddIcon>Add Client
            </Link>  
        </Button>
    )
}
export default DashBoard;