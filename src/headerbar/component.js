import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AccountMenu from './accountMenu';
import {showLogin, fetchProfile, logoutCurrentUser} from '../shared';
import {Input, Menu, Header} from 'semantic-ui-react'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';

class HeaderComponent extends Component {
    componentDidMount() {
        this
            .props
            .fetchProfile();
    }

    state = {
        activeItem: 'home'
    }

    handleLoginClick = (e) => this
        .props
        .showLogin();

    handleLogoutClick = (e) => this
        .props
        .logoutCurrentUser();

    renderAdminLink() {
        if (this.props.app.user) {
            if (this.props.app.user.isAdmin) {
                return (
                    <Menu.Item name='Admin' as={ Link } to='/admin' >
                            
                        </Menu.Item>
                );
            }
        }
    }

    render() {
        const {activeItem} = this.state
        return (
            <Menu>
                <Menu.Item
                    position='left'
                    as={Link}
                    to='/'
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}/>
                <Header as='h3'>Mett App</Header>
                <Menu.Menu position='right'>
                    {this.renderAdminLink()}
                    {this.props.app.user && (
                        <Menu.Item >
                            <AccountMenu
                                username={this.props.app.user.name}
                                imageUrl={this.props.app.user.picture}/>
                        </Menu.Item>
                    )}

                    {!this.props.app.user && (<Menu.Item name='login' onClick={this.handleLoginClick}/>)
}
                    {this.props.app.user && (<Menu.Item name='logout' onClick={this.handleLogoutClick}/>)
}

                </Menu.Menu>
            </Menu>
        );
    }
}

function mapStateToProps(props) {
    return {app: props.app}
}

export default connect(mapStateToProps, {showLogin, fetchProfile, logoutCurrentUser})(HeaderComponent);