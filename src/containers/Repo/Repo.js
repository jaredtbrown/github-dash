import React from 'react';
import Grid from '@material-ui/core/Grid';
import WorkflowRunsCard from '../WorkflowRunsCard';
import RepoInfoCard from '../RepoInfoCard';
import { RepoIcon } from '@primer/octicons-react';
import Icon from '@material-ui/core/Icon';

const Repo = (props) => {
    const { owner, repo } = props.match.params;
    const repoFullName = `${owner}/${repo}`;
    return (
        <Grid container item xs={12} spacing={2} style={{ padding: 16, paddingTop: 80 }}>
            <Grid lg={3} md={6} xs={12} item>
                <RepoInfoCard
                    text={repo}
                    icon={<Icon><RepoIcon size="medium" /></Icon>}
                    repoFullName={repoFullName}
                />
            </Grid>
            <Grid item xs={12}>
                <WorkflowRunsCard
                    repoFullName={repoFullName}
                />
            </Grid>
        </Grid>
    );
}

export default Repo;
