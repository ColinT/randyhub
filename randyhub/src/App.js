/* eslint-disable react/jsx-props-no-spreading */
import React, {
  Suspense, useEffect, useState, useRef,
} from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import MenuDropdown from './common/MenuDropdown';
import RandyGalaxyCursor from './common/RandyGalaxyCursor';
import Main from './routes/Main';

const App = () => {
  const [hueFilter, setHueFilter] = useState(0);
  const [randyCursor, setRandyCursor] = useState(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const retrievedHueValue = localStorage.getItem('randyhub-hue-filter');
      if (retrievedHueValue) {
        setHueFilter(retrievedHueValue);
      }
    } else {
      setRandyCursor(0);
      localStorage.setItem('randyhub-hue-filter', hueFilter);
    }
  }, [hueFilter]);

  return (
    <div id="app" style={{ filter: `hue-rotate(${hueFilter * 3.6}deg)` }}>
      {randyCursor > 0
      && <RandyGalaxyCursor count={50} />}
      <BrowserRouter>
        <MenuDropdown
          hueFilter={hueFilter}
          setHueFilter={setHueFilter}
          randyCursor={randyCursor}
          setRandyCursor={setRandyCursor}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" render={(props) => <Main {...props} hueFilter={hueFilter} setHueFilter={setHueFilter} randyCursor={randyCursor} setRandyCursor={setRandyCursor} />} />
            <Route component={React.lazy(() => import('./routes/SnackOfChampions'))} path="/snack-of-champions" />
            <Route component={React.lazy(() => import('./routes/CookingWithRandy'))} path="/cooking-with-randy" />
            <Route component={React.lazy(() => import('./routes/GitRepo'))} path="/git-repo" />
            <Route component={React.lazy(() => import('./routes/CovidCounter'))} path="/covid-counter" />
            <Route component={React.lazy(() => import('./routes/AuroraWatch'))} path="/aurora-watch" />
            <Route component={React.lazy(() => import('./routes/RandyMovie/details/index'))} path="/movies-with-randy/:mediaId" />
            <Route component={React.lazy(() => import('./routes/RandyMovie'))} path="/movies-with-randy" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
