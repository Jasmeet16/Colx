import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";


function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/products/:id' component={ProductScreen} />
        </Container>
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
