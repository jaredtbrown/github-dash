import React from 'react';
import Grid from '@material-ui/core/Grid';
import WorkflowRuns from '../WorkflowRuns';

const MyWork = () => {
    return (
        <Grid container item xs={12} style={{ padding: 16 }}>
            <Grid item xs={12}>
                <WorkflowRuns resource="/user" />
            </Grid>
        </Grid>
    );
}
 
export default MyWork;
