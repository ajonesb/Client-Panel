import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
// Material UI stuff
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
//Spinner
import Spinner from '../design/Spinner'
//CSS
import '../design/Style.css'
//Button
import Button from '@material-ui/core/Button';
//Icon
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'

class ClientDetails extends Component{
    //Delete Client
    onDeleteClick = () => {
        //Pulling the client and firestore from props
        const {client, firestore} = this.props;
        firestore.delete({collection: 'clients', doc: client.id}).then(()=>{
            this.props.history.push('/');
        })
    }
    render(){
        const {client} = this.props;
        if(client){
            return(
                <div className="layout">
                    <CssBaseline />
                    <Grid container spacing={24} className="layout">
                        <Grid item xs={6}>
                        <Link to="/" className="backbutton">
                            <Button color="primary">
                                <KeyboardArrowLeft></KeyboardArrowLeft>Back to Dashboard
                            </Button>
                        </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to={`/client/edit/${client.id}`} className="backbutton">
                                <Button color="primary">
                                    <Edit></Edit>Edit
                                </Button>
                            </Link>
                            
                            <Button color="secondary" onClick={this.onDeleteClick}>
                                <Delete></Delete>Delete
                            </Button>
                            
                        </Grid>
                    </Grid>
                    <div>
                        <Card> 
                            <CardContent>
                                <h3>{client.firstName} {client.lastName}</h3>
                                <Divider light/>
                                Client Id :{client.id}<br/>
                                Address: {client.address}<br/>
                                Contact Email: {client.email}<br />
                                Contact Phone: {client.contact}
                            </CardContent>
                            
                        </Card>
                    </div>
                </div>
            )
        }else{
            return <Spinner />
        }
        
    }
}

ClientDetails.propTypes = {
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
)(ClientDetails);