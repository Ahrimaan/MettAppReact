import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Header, Icon, Grid } from 'semantic-ui-react';

class AdminEventComponent extends Component {
    render() {
        let { id } = this.props.match.params;
        let { events } = this.props.appointment;
        let users = events.find(item => item.id === id).attendees;
        return (
            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column>

                    </Grid.Column>
                    <Grid.Column>
                        <Table basic='very' celled collapsing>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Who ?</Table.HeaderCell>
                                    <Table.HeaderCell>Value</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.getuserTable(users)}
                            </Table.Body>
                        </Table>
                        <div> To Buy : <b>{users.reduce((cur, val) => cur + val.value, 0)} </b> </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid >

        )
    }

    getuserTable(users) {
        if (users) {
            return users.map(user => {
                return (
                    <Table.Row key={user.email}>
                        <Table.Cell>
                            <Header as='h4' image>
                                <Icon name="user" />
                                <Header.Content>
                                    {user.username ? user.username : user.email}
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell> {user.value} </Table.Cell>
                    </Table.Row>
                )
            })
        }

    }
}

function mapStateToProps(props) {
    return { appointment: props.appointment };
}

export default connect(mapStateToProps, null)(AdminEventComponent)