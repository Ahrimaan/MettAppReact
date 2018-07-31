import React, { Component } from 'react';
import { loginWithGoogle, loginWithCredentials } from '../shared';
import { Button, Form, Message, Grid, Divider, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';

class LoginFormComponent extends Component {
    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form success>
                            <Form.Input label='Email' placeholder='your@mail.com' />
                            <Form.Input type='password' label='Password' placeholder='your password' />
                            {this.props.error && <Message error header='Error' content={this.props.error} />}

                            <Button>Login</Button>
                        </Form>
                        

                    </Grid.Column>
                </Grid.Row>
                <Divider horizontal>Or</Divider>
                <Grid.Row>
                    <Grid.Column>
                        <Button size='large' color='google plus' onClick={ loginWithGoogle() }>
                            <Icon name='google' /> Google
                         </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(props) {
    return {
        error: props.error
    }
}

export default connect(null, { loginWithGoogle, loginWithCredentials })(LoginFormComponent);
