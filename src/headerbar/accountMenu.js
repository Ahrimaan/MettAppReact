import React, { Component } from 'react';
import { Image, Popup } from 'semantic-ui-react';

class AccountMenu extends Component {
    state = {
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
        const { imageUrl, username } = this.props;
        return (
            <div>
                <div>
                    <Image src={imageUrl } avatar />
                    <span>{username}</span>
                </div>
            </div>
        );
    }
}

export default AccountMenu;