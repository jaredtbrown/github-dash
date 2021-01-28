import React from 'react';
import Grid from '@material-ui/core/Grid';
import WorkflowRunsCard from '../WorkflowRunsCard';

const Repo = (props) => {
    const { owner, repo } = props.match.params;
    return (
        <Grid container item xs={12} style={{ padding: 16, paddingTop: 80 }}>
            <Grid item xs={12}>
                <WorkflowRunsCard
                    repoFullName={`${owner}/${repo}`}
                />
            </Grid>
        </Grid>
    );
}

export default Repo;
