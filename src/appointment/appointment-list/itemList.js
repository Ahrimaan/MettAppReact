import React from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import moment from 'moment';
moment.locale('de');

const EventList = ({ items, userid, isAdmin, onSubscribe, onUnscribe, onDelete }) => {
    if (items) {
        return <React.Fragment>
            <Grid>
                {items.map(item => {
                    return <React.Fragment key={ item.date }>
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
                                                <Button basic color='green' as={Link} to={ '/home/' + item.id  }>
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
                                                    basic color='red' onClick={() => onDelete(item.id) }>
                                                    Delete
                                                </Button>)}
                                        </div>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </React.Fragment>
                })}
            </Grid>
        </React.Fragment>
    }
    return null;
}

export default EventList;