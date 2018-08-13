import React, { Component } from 'react';
import { loginWithGoogle, loginWithCredentials, loginWithGithub } from '../shared';
import { Button, Form, Message, Grid, Divider, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';

class LoginFormComponent extends Component {
    state = { username:'', password:'' }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form success>
                            <Form.Input name='username' value={this.state.username} onChange={this.handleChange} label='Email' placeholder='your@mail.com' />
                            <Form.Input name='password' value={this.state.password} onChange={this.handleChange}  type='password' label='Password' placeholder='your password' />
                            {this.props.error && <Message error header='Error' content={this.props.error} />}

                            <Button onClick={ () => this.props.loginWithCredentials(this.state.username, this.state.password) } >Login</Button>
                        </Form>
                        

                    </Grid.Column>
                </Grid.Row>
                <Divider horizontal>Or</Divider>
                <Grid.Row>
                    <Grid.Column>
                        <Button size='large' color='google plus' onClick={ this.props.loginWithGoogle }>
                            <Icon name='google' /> Google
                         </Button>
                         <Button size='large' color='github' onClick={ this.props.loginWithGithub }>
                            <Icon name='github' /> GitHub
                         </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

function mapStateToProps(props) {
    return {
        app: props.app
    }
}

export default connect(mapStateToProps, { loginWithGoogle, loginWithCredentials, loginWithGithub })(LoginFormComponent);
