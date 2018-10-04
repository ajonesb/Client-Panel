import React, { Component } from 'react';
import Appbar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline';

import {Link} from 'react-router-dom'

class Navbar extends Component{ 
    render(){
        const Heading = { color: '#fff', textDecoration: 'none'}
        return(
            <div>
                <CssBaseline />
                <Appbar position="static">
                    <Toolbar>
                        <Link to="/" style={Heading}>
                            <Typography variant="title" color="inherit">Client Panel</Typography>
                        </Link>
                    </Toolbar>
                </Appbar>
            </div>
        )
    }
    
}

export default Navbar;