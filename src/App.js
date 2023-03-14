import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/AuthContext';



function App() {
 const authCtx=useContext(AuthContext)

  return (

    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggenIn && (<Route path='/auth'>
          <AuthPage />
        </Route>)}
        <Route path='/profile'>
         {authCtx.isLoggenIn && <UserProfile />}
         {!authCtx.isLoggenIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>


  );
}

export default App;
