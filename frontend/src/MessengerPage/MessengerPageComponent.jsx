import * as React from 'react';
import {Grid} from 'semantic-ui-react';
import {Conversations} from './Conversations';
import {Route, Switch} from 'react-router-dom';
import {Messages} from './Messages';

export class MessengerPageComponent extends React.Component {
    render() {
        const { match } = this.props;

        return (
            <Grid columns={2} divided>
                <Grid.Column width={6}>
                    <Conversations/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Switch>
                        <Route exact path={`${match.url}/:id`} component={Messages}/>
                    </Switch>
                </Grid.Column>
            </Grid>
        );
    }
}