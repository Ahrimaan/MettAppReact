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
        const { imageUrl , username } = this.props;
        return (
            <div>
                <Popup size={ 'mini' } trigger={ <Image avatar src={ imageUrl }/> }>
                    <Popup.Content>
                        { username }
                    </Popup.Content>
                 </Popup>
                
            </div>
        );
    }
}

export default AccountMenu;