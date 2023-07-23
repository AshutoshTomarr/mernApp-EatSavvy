import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './screens/SignUp';
import { CardProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CardProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home></Home>} />
          <Route exact path="/Login" element={<Login></Login>} />
          <Route exact path="/createuser" element={<SignUp></SignUp>} />
          <Route exact path="/MyOrder" element={<MyOrder></MyOrder>} />
        </Routes>
      </div>
    </Router>
    </CardProvider>
  );
}

export default App;
