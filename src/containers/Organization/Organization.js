import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { GraphIcon } from '@primer/octicons-react';
import InfoCard from '../InfoCard';
import ReposCard from '../ReposCard';

const Organization = (props) => {
    return (
        <Grid container item xs={12} spacing={2} style={{ padding: 16, paddingTop: 80 }}>
            <Grid lg={3} md={6} xs={12} item>
                <InfoCard
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
