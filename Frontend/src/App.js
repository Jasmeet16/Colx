import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'



function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/cart' component={CartScreen} exact />
          <Route path='/login' component={ LoginScreen } />
          <Route path='/register' component={ RegisterScreen } />

          <Route path='/cart/:id' component={CartScreen} />
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
