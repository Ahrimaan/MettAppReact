import React from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';
import AppointmentDetail from './subscribe-modal';
import moment from 'moment';
moment.locale('de');

class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        const { items, userid, isAdmin, onUnscribe, onDelete, onSubscribe } = this.props;
        if (items) {
            return <React.Fragment>
                <Grid>
                    {items.map(item => {
                        return <React.Fragment key={item.date}>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>Event at</Card.Header>
                                            <Card.Meta> {moment(item.date).format('LL')} </Card.Meta>
                                            <Card.Description>
                                                There are {item.participants ? item.participants.length : 0} Persons subscribed
                                                </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
                                                {userid && (
                                                    <Button basic color='green' onClick={() => this.setState({ show:true }) }>
                                                        Subscribe
                                                        </Button>)
                                                }
                                                {!userid && (
                                                    <Button basic color='yellow' onClick={() => onUnscribe(item.id)}>
                                                        Unscribe
                                                        </Button>)
                                                }
                                                {isAdmin && (
                                                    <Button disabled={item.participants ? item.participants.length > 0 : false}
                                                        basic color='red' onClick={() => onDelete(item.id)}>
                                                        Delete
                                                    </Button>)}
                                            </div>
                                            <AppointmentDetail
                                                id={item.id}
                                                show={this.state.show}
                                                onCancel={() => this.setState({ show: false })}
                                                onSaveClick={onSubscribe}
                                                paypalLink={item.link}
                                            />
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </React.Fragment>
                    })}
                </Grid>
            </React.Fragment>
        } else {
            return null;
        }
    }
}

export default EventList;