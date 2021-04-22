import React from 'react';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import 'fontsource-roboto';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Transactions from './components/Transactions';

import AlertState from './context/alerts/alertState';
import TransactionState from './context/transactions/transactionState';
import OperationsState from './context/operations/operationState';

function App() {
  return (
      <AlertState>
        <TransactionState>
          <OperationsState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={NewAccount} />
                <Route exact path="/transactions" component={Transactions} />
              </Switch>
            </Router>
          </OperationsState>
        </TransactionState>
      </AlertState>  
  );
}

export default App;
