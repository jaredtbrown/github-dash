import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {
    RepoIcon,
    GitPullRequestIcon,
    GitMergeIcon,
    CodeIcon
} from '@primer/octicons-react'
import theme from '../../theme';
import DashCard from '../../components/DashCard';
import GitHubApiClient from '../../githubApiClient/index';
import { flow, head, last, maxBy, partialRight, toPairs, countBy } from 'lodash';

const OwnerInfoCard = (props) => {
    const [numberOfRepos, setNumberOfRepos] = useState(0);
    const [numberOfOpenPrs, setNumberOfOpenPrs] = useState(0);
    const [numberOfMergedPrs, setNumberOfMergedPrs] = useState(0);
    const [topLanguage, setTopLanguage] = useState('');

    useEffect(() => {
        const getRepos = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`/${props.resource}/${props.resourceId}/repos`);
            setNumberOfRepos(response.length);
            const langauges = response.map((repo) => repo.language);
            const language = flow(
                countBy,
                toPairs,
                partialRight(maxBy, last),
                head
              )(langauges);
            setTopLanguage(language);
            return response;
        }

        const getOpenPrs = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`/search/issues?q=is:open+is:pr+user:${props.resourceId}`);
            setNumberOfOpenPrs(response.total_count);
        }

        const getMergedPrs = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`/search/issues?q=is:merged+is:pr+user:${props.resourceId}`);
            setNumberOfMergedPrs(response.total_count);
        }

        getRepos();
        getOpenPrs();
        getMergedPrs();
    }, [props.resource, props.resourceId]);

    const handleOnReposClick = () => {
        window.open(`https://github.com/${props.resourceId}`, '_blank');
    };

    const handleOnOpenPrsClick = () => {
        window.open(`https://github.com/pulls?q=is%3Aopen+is%3Apr+user%3A${props.resourceId}`)
    }

    const handleOnMergedPrsClick = () => {
        window.open(`https://github.com/pulls?q=is%3Amerged+is%3Apr+user%3A${props.resourceId}`)
    }

    return (
        <DashCard
            text={props.text}
            icon={props.icon}
            content={
                <List>
                    <ListItem button onClick={handleOnReposClick}>
                        <ListItemText 
                            primary={
                                <React.Fragment>
                                    <Icon style={{ color: theme.palette.githubColors.yellow }}><RepoIcon /></Icon>&nbsp; Repos
                                </React.Fragment>
                            }
                        />
                        <Typography>
                            {numberOfRepos}
                        </Typography>
                    </ListItem>
                    <ListItem button onClick={handleOnOpenPrsClick}>
                        <ListItemText 
                            primary={
                                <React.Fragment>
                                    <Icon style={{ color: theme.palette.githubColors.green }}><GitPullRequestIcon /></Icon>&nbsp; Open PRs
                                </React.Fragment>
                            }
                        />
                        <Typography>
                            {numberOfOpenPrs}
                        </Typography>
                    </ListItem>
                    <ListItem button onClick={handleOnMergedPrsClick}>
                        <ListItemText 
                            primary={
                                <React.Fragment>
                                    <Icon style={{ color: theme.palette.githubColors.purple }}><GitMergeIcon /></Icon>&nbsp; Merged PRs
                                </React.Fragment>
                            }
                        />
                        <Typography>
                            {numberOfMergedPrs}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemText 
                            primary={
                                <React.Fragment>
                                    <CodeIcon />&nbsp; Top Language
                                </React.Fragment>
                            }
                        />
                        <Typography>
                            {topLanguage}
                        </Typography>
                    </ListItem>
                </List>
            }
        />
    );
}
 
export default OwnerInfoCard;