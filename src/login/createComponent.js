import React, { Component } from 'react';
import { createUser } from '../shared';
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
                            <Form.Input name='username' value={this.state.username} onChange={this.handleChange}  label='Email' placeholder='your@mail.com' />
                            <Form.Input name='password' value={this.state.password} onChange={this.handleChange} type='password' label='Password' placeholder='your password' />
                            {this.props.error && <Message error header='Error' content={this.props.error} />}

                            <Button onClick={ () => this.props.createUser(this.state.username, this.state.password) } >Login</Button>
                        </Form>
                        

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

export default connect(mapStateToProps, { createUser })(LoginFormComponent);
