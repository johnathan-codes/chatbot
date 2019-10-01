import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const MyCard = props => (
  <Card>
    <CardActionArea>
      <table>
        <tbody>
          <td>
            <img src={props.payload.fields.image.stringValue} alt={props.payload.fields.header.stringValue} />
          </td>
          <td>
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {props.payload.fields.header.stringValue}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {props.payload.fields.description.stringValue}
              </Typography>
              <a href='https://www.millennium.sk/kontaktny-formular/' target='_blank' rel='noopener noreferrer'>
                {props.payload.fields.price.stringValue}
              </a>
            </CardContent>
          </td>
        </tbody>
      </table>
    </CardActionArea>
  </Card>
);

export default MyCard;
