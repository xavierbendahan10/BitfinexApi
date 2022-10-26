import { React } from "react";
import './Root.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Inicio from '../Init/Init';
import BestPrice from '../BestPrice/BestPrice';
import Trade from '../Trade/Trade';


const Root = () => (
    <Router>
        <div>
            <hr />
            {/* <Route exact path = "/" component={Turno}/> */}
            <Route exact path="/" component={Inicio} />
            <Route path="/bestPrice" component={BestPrice} />
            <Route path="/trade" component={Trade} />
        </div>
    </Router>
);

export default Root;