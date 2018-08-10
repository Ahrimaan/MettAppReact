import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountMenu from './accountMenu';
import { subscribeUserEvent, logoutCurrentUser } from '../shared';
import { Menu, Header } from 'semantic-ui-react'

class HeaderComponent extends Component {
    componentWillMount() {
        this.props.subscribeUserEvent();
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
            if (this.props.app.user &&this.props.app.user.isAdmin) {
                return (
                    <Menu.Item name='Admin' as={Link} to='/admin' >

                    </Menu.Item>
                );
            }
    }

    render() {
        const { activeItem } = this.state
        return (
            <Menu>
                <Menu.Item
                    position='left'
                    as={Link}
                    to='/home'
                    name='home'
                    active={activeItem === 'home'}/>
                <Header as='h3'>Mett App</Header>
                <Menu.Menu position='right'>
                    {this.renderAdminLink()}
                    <Menu.Item name='Tenant' as={Link}
                        to='tenant' />
                    {this.props.app.user && (
                        <Menu.Item >
                            <AccountMenu
                                username={this.props.app.user.displayName}
                                imageUrl={this.props.app.user.picture} />
                        </Menu.Item>
                    )}

                    {!this.props.app.user && (<Menu.Item name='login' as={Link}
                        to='login' />)
                    }
                    {!this.props.app.user && (<Menu.Item name='register' as={Link}
                        to='login/new' />)
                    }
                    {this.props.app.user && (<Menu.Item name='logout' onClick={this.handleLogoutClick} />)
                    }

                </Menu.Menu>
            </Menu>
        );
    }
}

function mapStateToProps(props) {
    return { app: props.app }
}

export default connect(mapStateToProps, { subscribeUserEvent, logoutCurrentUser })(HeaderComponent);