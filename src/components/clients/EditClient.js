import React, {Component} from 'react'
//import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
//Material UI Stuff
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Divider from '@material-ui/core/Divider';
//Spinner
import Spinner from '../design/Spinner'
// CSS
import '../design/Style.css'
//Button
import Button from '@material-ui/core/Button';

class EditClient extends Component{
    constructor(props){
        super(props);
        //Create Ref
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.addressInput = React.createRef();
        this.contactInput = React.createRef();
    }

    //On form Submission
    onSubmit = e =>{
        e.preventDefault();

        const { client, firestore, history } = this.props;
        
        console.log(this.firstNameInput)

        //Updated client
        const updatedClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            address: this.addressInput.current.value,
            email: this.emailInput.current.value,
            contact: this.contactInput.current.value,
        }
        console.log(updatedClient)

        //Update this client in firestore
        firestore.update({ collection: 'clients' , doc: client.id }, updatedClient)
        .then(history.push('/'));
    }
    render(){
        const { client } = this.props;
        if(client){
            return(
                <div>
                <CssBaseline />
                <Grid className="layout-add-client">
                    <Card>
                        <CardContent>
                            <Typography ><span className="add-client-heading">Edit Client</span></Typography>
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
                                    defaultValue={client.firstName}
                                    inputRef={this.firstNameInput}
                                    name="firstName"
                                />&nbsp;
                                <TextField
                                    required
                                    label="Last Name"
                                    placeholder="Last name"
                                    margin="normal"
                                    variant="filled"
                                    inputRef={this.lastNameInput}
                                    defaultValue={client.lastName}
                                    name="lastName"
                                />
                                <TextField
                                    required
                                    multiline
                                    fullWidth
                                    label="Address"
                                    placeholder="Address"
                                    margin="normal"
                                    variant="filled"
                                    inputRef={this.addressInput}
                                    defaultValue={client.address}
                                    name="address"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Email"
                                    placeholder="Email"
                                    //type="email"
                                    //autoComplete="email"
                                    margin="normal"
                                    variant="filled"
                                    inputRef={this.emailInput}
                                    defaultValue={client.email}
                                    name="email"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Contact"
                                    placeholder="Contact"
                                    margin="normal"
                                    variant="filled"
                                    inputRef={this.contactInput}
                                    defaultValue={client.contact}
                                    name="contact"
                                />
                            </CardContent>    
                            <CardActions>
                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Update
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </div>
            )
        }else{
            return <Spinner />
        }
        
    }
}

EditClient.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    //Getting single client from firestore at a time
    //Not storing in the state, we create seperate - 'client' to store
    //Getting id from URL - props.match.params.id
    firestoreConnect(props => [
        { collection: 'clients' , storeAs: 'client', doc: props.match.params.id}
    ]),
    connect(( { firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0],
    }))
)(EditClient);