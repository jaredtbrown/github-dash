import React from 'react';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import {
    CheckCircleFillIcon,
    XCircleFillIcon,
    SkipIcon,
    StopwatchIcon,
    DotFillIcon
} from '@primer/octicons-react';
import theme from '../../theme'

const WorkflowStatus = (props) => {
    const { githubColors } = theme.palette;

    const getTooltipText = () => {
        if (props.text) {
            return props.text;
        }

        if (props.status === 'completed') {
            return props.conclusion;
        }

        return props.status;
    }
    
    const getIcon = () => {
        if (props.status === 'queued') {
            return (
                <Icon>
                    <StopwatchIcon />
                </Icon>
            );
        }

        if (props.status === 'in_progress') {
            return (
                <Icon style={{ color: githubColors.yellow}}>
                    <DotFillIcon />
                </Icon>
            );
        }

        switch(props.conclusion) {
            case 'success':
                return (
                    <Icon style={{ color: githubColors.green }}>
                        <CheckCircleFillIcon />
                    </Icon>
                );
            case 'failure':
                return (
                    <Icon style={{ color: githubColors.red }}>
                        <XCircleFillIcon />
                    </Icon>
                );
            default:
                return (
                    <Icon>
                        <SkipIcon />
                    </Icon>
                );
        }
    }

    const icon = getIcon();
    const text = getTooltipText();
    return (
        <Tooltip title={text}>
            { icon }
        </Tooltip>
    );
}
 
export default WorkflowStatus;