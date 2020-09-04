import '../style/style.scss';

import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { CommonHeader } from '../app/components/header/header';
import { DescriptionPage } from './pages/description/description';
import { MainPage } from './pages/main/main';
import { AppRoutes } from './routes/routes';
import { store } from './store';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <CommonHeader />
      <BrowserRouter>
        <Switch>
          <Route exact path={`/${AppRoutes.main}`} component={MainPage} />
          <Route path={`/${AppRoutes.description}`} component={DescriptionPage} />
          <Route path={'*'}>
            <Redirect to={`/${AppRoutes.main}`} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
