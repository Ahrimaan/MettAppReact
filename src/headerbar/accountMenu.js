import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';

class AccountMenu extends Component {
    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleLogout = () => {
        this.handleRequestClose();
    }

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Image avatar src={ this.props.imageUrl }/>
            </div>
        );
    }
}

export default AccountMenu;