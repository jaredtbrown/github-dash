import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

const DashCard = (props) => {
    return (
        <Card onClick={props.onClick} style={{ cursor: 'pointer' }}>
            <CardHeader
                title={
                    <Typography variant="h5">
                        {props.icon}&nbsp; {props.text}
                    </Typography>
                }
            />
        </Card>
    );
}
 
export default DashCard;
