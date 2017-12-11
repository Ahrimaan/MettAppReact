import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { addApointment } from '../actions';

class AppointmentList extends Component {
    componentDidMount() {
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    }

    render() {
        return (
            <Button className="fab" color="primary" aria-label="add" onClick={this.handleAddButtonClick}>
                <AddIcon />
            </Button>
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