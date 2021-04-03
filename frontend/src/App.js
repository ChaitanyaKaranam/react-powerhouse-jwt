import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Home from './pages/Home';
import './styles/index.css';

function App() {
    return (
        <div className='App'>
            <UserProvider>
                <Router>
                    <Switch>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route path='/'>
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </UserProvider>
        </div>
    );
}

export default App;
