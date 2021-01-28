import React from 'react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { GraphIcon } from '@primer/octicons-react';
import OwnerInfoCard from '../OwnerInfoCard';
import ReposCard from '../ReposCard';

const Organization = (props) => {
    return (
        <Grid container item xs={12} spacing={2} style={{ padding: 16, paddingTop: 80 }}>
            <Grid lg={3} md={6} xs={12} item>
                <OwnerInfoCard
                    text="Stats"
                    icon={<Icon><GraphIcon size="medium" /></Icon>}
                    resource="orgs"
                    resourceId={props.match.params.orgid}
                />
            </Grid>
            <Grid item xs={12}>
                <ReposCard resource={`/orgs/${props.match.params.orgid}`} />
            </Grid>
        </Grid>
    );
}
 
export default Organization;
