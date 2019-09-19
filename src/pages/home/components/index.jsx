import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router';
import { StyledHomePageWrapper } from './styles';
import ReceiveTraining from '../containers/receiveTraining';
import RegisterTraining from '../containers/registerTraining';

const HomeRouter = ({ match }) => {
  console.log(11, match.path);
  console.log(112, `${match.path}receive`);
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={RegisterTraining} />
      <Route exact path={`${match.path}/receive`} component={ReceiveTraining} />
    </Switch>
  );
};

export default HomeRouter;
