import '../style/style.scss';
import './app.scss';

import { Spin } from 'antd';
import React, { useEffect, useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { CommonHeader } from '../app/components/header/header';
import { DescriptionPage } from './pages/description/description';
import { MainPage } from './pages/main/main';
import { AppRoutes } from './routes/routes';
import { loadData } from './store/app.thunks';

export const App: FC = () => {
  const dispatch = useDispatch();

  const [isDataLoad, setIsDataLoad] = useState(false);

  useEffect(() => {
    const abortController: AbortController = new AbortController();
    dispatch(loadData(abortController, setIsDataLoad));

    return () => abortController.abort();
  }, [dispatch]);

  return (
    <>
      {isDataLoad && (
        <>
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
        </>
      )}
      {!isDataLoad && <Spin className="app_spinner" size="large" />}
    </>
  );
};
