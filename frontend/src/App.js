import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import './styles/index.css';
import About from './pages/About';

function App() {
    return (
        <div className='App'>
            <UserProvider>
                <Router>
                    <Switch>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <ProtectedRoute path='/about'>
                            <About />
                        </ProtectedRoute>
                        <ProtectedRoute path='/'>
                            <Home />
                        </ProtectedRoute>
                    </Switch>
                </Router>
            </UserProvider>
        </div>
    );
}

export default App;
