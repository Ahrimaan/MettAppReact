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

    isActive(date) {
        return  new Date(date).getDate() >= new Date().getDate();
    }

    render() {
        const { items, userid, isAdmin, onUnscribe, onDelete, onSubscribe } = this.props;
        if (items) {
            return <React.Fragment>
                <Grid>
                    {items.map(item => {
                        const isSubscribed = item.attendees ? item.attendees.find(item => item.uid === userid) : false;
                        const active = this.isActive(item.date);
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
                                                There are {item.attendees ? item.attendees.length : 0} Persons subscribed
                                                </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
                                                {(!isSubscribed && active) && (
                                                    <Button basic color='green' onClick={() => this.setState({ show:true }) }>
                                                        Subscribe
                                                        </Button>)
                                                }
                                                {(isSubscribed && active) && (
                                                    <Button basic color='yellow' onClick={() => onUnscribe(item.id)}>
                                                        Unscribe
                                                        </Button>)
                                                }
                                                {(isAdmin || !active) && (
                                                    <Button disabled={item.attendees ? item.attendees.length > 0 : false}
                                                        basic color='red' onClick={() => onDelete(item.id)}>
                                                        Delete
                                                    </Button>)}
                                            </div>
                                            <AppointmentDetail
                                                id={item.id}
                                                hasPaypal={item.allowPaypal}
                                                show={this.state.show}
                                                onCancel={() => this.setState({ show: false })}
                                                onSaveClick={(id,data) => {
                                                    onSubscribe(id,data);
                                                    this.setState({show:false});
                                                }}
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