import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AccountMenu from './accountMenu';
import {ShowLoginAction,FetchProfileAction, LogoutAction} from '../authentication';
import {Input, Menu, Header} from 'semantic-ui-react'

class HeaderComponent extends Component {
    componentDidMount() {
        this
            .props
            .FetchProfileAction();
    }

    state = {
        activeItem: 'home'
    }

    handleLoginClick = (e) => this
        .props
        .ShowLoginAction();

    handleLogoutClick = (e) => this
        .props
        .LogoutAction();

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

                    {this.props.auth && (
                        <Menu.Item >
                            <AccountMenu imageUrl={this.props.auth.picture}/>
                        </Menu.Item>
                    )}

                    {!this.props.auth && (<Menu.Item name='login' onClick={this.handleLoginClick}/>)
}
                    {this.props.auth && (<Menu.Item name='logout' onClick={this.handleLogoutClick}/>)
}

                </Menu.Menu>
            </Menu>
        );
    }
}

function mapStateToProps(props) {
    return {auth: props.auth}
}

export default connect(mapStateToProps, {ShowLoginAction, FetchProfileAction, LogoutAction})(HeaderComponent);