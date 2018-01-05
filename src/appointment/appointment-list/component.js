import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addApointment } from '../actions';
import { Button } from 'semantic-ui-react';

class AppointmentList extends Component {
    componentDidMount() {
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    }

    render() {
        return (
            <Button circular icon='add' floated='right'></Button>
        );
    }

    handleAddButtonClick() {
        this.props.addApointment({ 'date': new Date() });
    }
}

function mapStateToProps(props) {
    return {
        profile: props.profile
    };
}

export default connect(mapStateToProps, { addApointment })(AppointmentList);