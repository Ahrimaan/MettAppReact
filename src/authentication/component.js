import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';
import { loginUsingGoogle } from './actions'
import Grid from 'material-ui/Grid';

class AuthenticationControl extends Component {
    render() {
        const { loginUsingGoogle } = this.props;
        return (
                <Grid spacing={0} container justify="center" >
                    {
                        // Only show when user is not logged in
                        !this.props.profile && (
                            <Grid item  >
                                <Button raised color="primary" onClick={loginUsingGoogle} >
                                    Google <br />
                                </Button>
                            </Grid>
                        )
                    }
                </Grid>
        );
    }
}

function mapStateToProps(props) {
    return {
        profile: props.profile
    }
}

export default connect(mapStateToProps, { loginUsingGoogle })(AuthenticationControl);
