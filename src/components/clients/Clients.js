import React, {Component} from 'react'
import {Link} from 'react-router-dom'

// Icons
import DetailsIcon from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button';

// Data Table stuff
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//To load data from firebase
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import PropTypes from 'prop-types'
//Spinner
import Spinner from '../design/Spinner'

class Clients extends Component{
    
    render(){
        // const clients  = this.props.clients;
        const { clients } = this.props;
        
        //const clients = [{id: 1, firstName: 'Chris', lastName: 'Evans', address: '121 Evans house', email:'chris@evans.com', contact: '8989898989'}]
        if(clients){
            return(
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>NAME</TableCell>
                                    <TableCell>ADDRESS</TableCell>
                                    <TableCell>CONTACT</TableCell>
                                    <TableCell>EMAIL</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clients.map(client => {
                                    return(
                                        <TableRow key={client.id}>
                                            <TableCell component="th">{client.firstName} { client.lastName}</TableCell>
                                            <TableCell>{client.address}</TableCell>
                                            <TableCell>{client.contact}</TableCell>
                                            <TableCell>{client.email}</TableCell>
                                            <TableCell>
                                                <Link to={`/client/${client.id}`}>
                                                    <Button className="buttonStyle" size="small">
                                                        <DetailsIcon></DetailsIcon>
                                                        Details
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            )
        }
        else{
        return (
            <Spinner />
        )
    }
}
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
}

export default compose(
    //Creating Firestore queries - automatically
    firestoreConnect([{ collection: 'clients' }]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients,
    }))
)(Clients);
 