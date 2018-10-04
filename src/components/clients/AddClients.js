import React, {Component} from 'react'
import {Link} from 'react-router-dom';
//Material UI Stuff
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

//Importing CSS file
import '../design/Style.css'
//Button
import Button from '@material-ui/core/Button';
//Icon
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
//For Adding Clients- by connecting to firebase
//import { compose } from 'redux'
//import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class AddClient extends Component{
    state = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        contact: ''
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const newClient = this.state;
        //Add it to Firestore
        const {firestore, history} = this.props;
        firestore.add({ collection: 'clients'}, newClient).then(()=>history.push('/'))
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value }); 
    }
    render(){
        return(
            <div>
                <CssBaseline />
                <Grid container spacing={24} className="layout">
                    <Grid item xs={6}>
                        <Link to="/" className="backbutton">
                            <Button color="primary">
                                <KeyboardArrowLeft></KeyboardArrowLeft>Back to Dashboard
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6}></Grid>
                </Grid>
                <Grid className="layout-add-client">
                    <Card>
                        <CardContent>
                            <Typography ><span className="add-client-heading">Add Client</span></Typography>
                            <Divider />
                        </CardContent>
                        <form className="layout-add-form" onSubmit={this.onSubmit}>
                            <CardContent>
                                <TextField
                                    required
                                    label="First Name"
                                    placeholder="First name"
                                    margin="normal"
                                    variant="filled"
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    name="firstName"
                                />&nbsp;
                                <TextField
                                    required
                                    label="Last Name"
                                    placeholder="Last name"
                                    margin="normal"
                                    variant="filled"
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                    name="lastName"
                                />
                                <TextField
                                    required
                                    label="Address"
                                    placeholder="Address"
                                    multiline
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    name="address"
                                    onChange={this.onChange}
                                    value={this.state.address}
                                />
                                <TextField
                                    required
                                    label="Email"
                                    placeholder="Email"
                                    fullWidth
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    margin="normal"
                                    variant="filled"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                />
                                <TextField
                                    required
                                    label="Contact"
                                    placeholder="Contact"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    name="contact"
                                    onChange={this.onChange}
                                    value={this.state.contact}
                                />
                            </CardContent>    
                            <CardActions>
                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Submit
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </div>
        )
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);