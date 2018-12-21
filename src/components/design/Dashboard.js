import React from 'react'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline';
import Group from '@material-ui/icons/Group'
// Components
import Clients from '../clients/Clients'
import Sidebar from '../design/Sidebar'
import './Style.css'

const DashBoard = () =>{
    const clientIcon={ display:'inline-block', paddingLeft: '1%'}
    return(
        <div >
            <CssBaseline />
            <Grid container spacing = {24} className="layout">
                <Grid item xs = {9} className= "layout1">
                    <div>
                        <Group></Group>
                        <h2 style={clientIcon}>Clients</h2>
                    </div>
                </Grid>
                <Grid item xs = {3} className= "layout2"><Sidebar /></Grid>
            </Grid>
            <Grid container spacing = {24} className="layout">
                <Grid item xs={12} className= "layout1"><Clients /></Grid>
            </Grid>
        </div>
    )
}
export default DashBoard;