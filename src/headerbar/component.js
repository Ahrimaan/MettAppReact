import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountMenu from './accountMenu';
import { LoginAction , FetchUserInfo } from '../shared';

class Header extends Component {
    componentDidMount(){
        this.props.FetchUserInfo();
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className="header_menuButton" color="contrast" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" color="inherit" className="flex1">
                        Mett App
                        </Typography>
                    {
                        !this.props.profile && (
                            <Button color="contrast" onClick={this.props.LoginAction} >Login</Button>
                        )
                    }
                    {
                        this.props.profile && (
                            <AccountMenu />
                        )
                    }

                </Toolbar>
            </AppBar>
        );
    }

    renderProfileSection() {
        console.log(this.props);

    }
}

function mapStateToProps(props) {
    return {
        profile: props.profile
    }
}

export default connect(mapStateToProps, { LoginAction, FetchUserInfo })(Header);