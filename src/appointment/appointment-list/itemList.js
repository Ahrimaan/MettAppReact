import React from 'react';
import EventItem from './item';
import { Grid } from 'semantic-ui-react';

const EventList = ({ items,userid }) => {
    if(items) {
        return <React.Fragment>
                <Grid>
                    { items.map(item => {
                        return <EventItem data={ item } key={ item.date } userid={ userid } />
                    }) }
                </Grid>
            </React.Fragment>
    }
    return null;
}

export default EventList;