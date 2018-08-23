import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Header, Icon, Grid } from 'semantic-ui-react';

class AdminEventComponent extends Component {
    render() {
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
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Icon name="user" />
                                            <Header.Content>
                                                Lena
                      <Header.Subheader>Human Resources</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>22</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Icon name="user" />
                                            <Header.Content>
                                                Matthew
                      <Header.Subheader>Fabric Design</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>15</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Icon name="user" />
                                            <Header.Content>
                                                Lindsay
                      <Header.Subheader>Entertainment</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>12</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4' image>
                                            <Icon name="user" />
                                            <Header.Content>
                                                Mark
                      <Header.Subheader>Executive</Header.Subheader>
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>11</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid >

        )
    }
}

export default connect(null, null)(AdminEventComponent)