import React from 'react';
import Grid from '@material-ui/core/Grid';
import WorkflowRuns from '../WorkflowRuns';

const Organization = (props) => {
    return (
        <Grid container item xs={12} style={{ padding: 16, paddingTop: 80 }}>
            <Grid item xs={12}>
                <WorkflowRuns resource={`/orgs/${props.match.params.orgid}`} />
            </Grid>
        </Grid>
    );
}
 
export default Organization;
