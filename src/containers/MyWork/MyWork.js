import React from 'react';
import Grid from '@material-ui/core/Grid';
import WorkflowRuns from '../WorkflowRuns';
import InfoCard from '../InfoCard';
import Icon from '@material-ui/core/Icon';
import { GraphIcon } from '@primer/octicons-react';
import ReposCard from '../ReposCard';

const MyWork = (props) => {
    return (
        <Grid container item xs={12} spacing={2} style={{ padding: 16, paddingTop: 80 }}>
            <Grid lg={3} md={6} xs={12} item>
                <InfoCard
                    text="Stats"
                    icon={<Icon><GraphIcon size="medium" /></Icon>}
                    resource="users"
                    resourceId={props.match.params.username}
                />
            </Grid>
            <Grid item xs={12}>
                <ReposCard resource="/user" />
            </Grid>
        </Grid>
    );
}
 
export default MyWork;
