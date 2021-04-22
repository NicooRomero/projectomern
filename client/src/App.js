import React from 'react';
import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import 'fontsource-roboto';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Transactions from './components/Transactions';

import AlertState from './context/alerts/alertState';
import TransactionState from './context/transactions/transactionState';
import OperationsState from './context/operations/operationState';

import AuthState from './context/authentication/authState';

function App() {
  return (
      <AlertState>
        <TransactionState>
          <OperationsState>
            <AuthState>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/new-account" component={NewAccount} />
                  <Route exact path="/transactions" component={Transactions} />
                </Switch>
              </Router>
            </AuthState>
          </OperationsState>
        </TransactionState>
      </AlertState>  
  );
}

export default App;
