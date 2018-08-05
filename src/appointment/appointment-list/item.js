import React from 'react';
import { Grid, Card, Button } from 'semantic-ui-react';
import moment from 'moment';
moment.locale('de');

const EventItem = ({ data, userid, onSubscribe,obUnscribe }) => {
    return <React.Fragment>
        <Grid.Row columns={3}>
            <Grid.Column>

            </Grid.Column>
            <Grid.Column>
                <Card>
                    <Card.Content>
                        <Card.Header>Event at</Card.Header>
                        <Card.Meta> {moment(data.date).format('LL')} </Card.Meta>
                        <Card.Description>
                            There are {data.participants ? data.participants.length : 0} Persons subscribed
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            {userid && (
                                <Button basic color='green' onClick={onSubscribe}>
                                    Subsribe
                                </Button>)
                            }
                            {!userid && (
                                <Button basic color='yellow' onClick={obUnscribe}>
                                    Unscribe
                                </Button>)
                            }
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column>

            </Grid.Column>
        </Grid.Row>
    </React.Fragment>
}

export default EventItem;