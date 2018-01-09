import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addApointment} from '../actions';
import {Button} from 'semantic-ui-react';

class AppointmentList extends Component {
    componentDidMount() {
        this.handleAddButtonClick = this
            .handleAddButtonClick
            .bind(this);
    }

    render() {
        if (this.props.app.user) {
            return (
                <div>
                    {this.props.app.user.isAdmin && (
                        <Button primary circular icon='add' floated='right'></Button>
                    )}
                </div>
            )

        } else {
            return <div/>
        }
    }

    handleAddButtonClick() {
        this
            .props
            .addApointment({'date': new Date()});
    }
}

function mapStateToProps(props) {
    return {app: props.app};
}

export default connect(mapStateToProps, {addApointment})(AppointmentList);