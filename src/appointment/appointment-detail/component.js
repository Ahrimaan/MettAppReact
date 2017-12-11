import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class AppointmentDetail extends Component{
    render(){
        return (
            <div>
              <Card >
                <CardContent>
                  <Typography type="body1" >
                    Word of the Day
                  </Typography>
                  <Typography type="headline" component="h2">
            
                  </Typography>
                  <Typography type="body1" >
                    adjective
                  </Typography>
                  <Typography component="p">
                    well meaning and kindly.<br />
                    {'"a benevolent smile"'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button dense>Learn More</Button>
                </CardActions>
              </Card>
            </div>
          );
    }
}

export default AppointmentDetail;