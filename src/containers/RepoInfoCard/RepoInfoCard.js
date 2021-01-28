import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DashCard from '../../components/DashCard';
import GitHubApiClient from '../../githubApiClient';
import gitHubLangColors from '../../github-lang-colors';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const RepoInfoCard = (props) => {
    const [repo, setRepo] = useState({});
    const [languages, setLanguages] = useState({});

    useEffect(() => {
        const getRepo = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`/repos/${props.repoFullName}`);
            setRepo(response);
        }

        const getReposLanguages = async () => {
            const token = localStorage.getItem('token');
            const gitHubApiClient = new GitHubApiClient(token);
            var response = await gitHubApiClient.get(`/repos/${props.repoFullName}/languages`);
            setLanguages(response);
        };

        getRepo();
        getReposLanguages();
    }, [props.repoFullName]);

    const totalLanguageBytes = Object.values(languages).reduce((a, b) => { return a + b }, 0);
    const renderLanguage = (key) => {
        const byteValue = languages[key];
        const bytePercentage = () => {
            const percentValue = (byteValue / totalLanguageBytes) * 100;
            if (percentValue < 1) {
                return 1;
            }

            return percentValue;
        }
        const color = gitHubLangColors[key];
        return (
            <Tooltip key={key} title={key}>
                <div style={{ backgroundColor: color, width: `${bytePercentage()}%`, height: '100%' }} />
            </Tooltip>
        )
    };

    return (
        <DashCard
            text={props.text}
            icon={props.icon}
            content={
                <Grid container item xs={12} spacing={2}>
                    <Grid container item xs={12}>
                        <Grid item xs={4}>
                            <Typography>Languages</Typography>
                        </Grid>
                        <Grid item xs={8} style={{ display: 'flex' }}>
                            {
                                Object.keys(languages).map(renderLanguage)
                            }
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4}>
                            <Typography>Last Pushed</Typography>
                        </Grid>
                        <Grid container item xs={8}>
                            <Typography align="right" style={{ width: '100%' }}>{repo.pushed_at}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            }
        />
    );
}
 
export default RepoInfoCard;
