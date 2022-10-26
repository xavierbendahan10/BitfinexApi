import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './Trade.css';
import React, { useState , useEffect} from 'react';
import { search , reset_trade } from '../../redux/reducers/tradeSlice';



function Coin(props) {
    return (
        <Card style={{ width: '13rem' }} text={"white bg-success mb-3"}>
            <h5 class="card-header">
                {props.nickname}
            </h5>
            <h6 class="card-title mb-2">
                {props.others}
            </h6>
        </Card>
    );
}

function OrdenLobby(props) {
    return (
        <Container className='pt-4'>
            <Row>
                <Col xs={6} md={5}>
                    {props.col1}
                </Col>
                <Col xs={6} md={5}>
                    {props.col2}
                </Col>
                <Col xs={6} md={2}>
                    {props.col3}
                </Col>
            </Row>
        </Container>
    );
}

function Trade() {
 const [validate, setValidated] = useState(false);
     
 const handleSubmit = (event) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    let name_coin = document.getElementById('disabledTextInput').value.toString();
    let amount    = document.getElementById('disabledTextInputAmount').value.toString();
    let price     = document.getElementById('disabledTextInputTwo').value.toString();
    let divisa    = document.getElementById('disabledSelectOne').value.toString();
    let type      = document.getElementById('disabledSelectTwo').value.toString();
    var id_coin = 1;
    var ws = "";
    
    alert(divisa);
    alert(type);
    alert("antes del fetch");
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:8000/trade/coin'
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let body = { "nameCoin": name_coin  , 
                  "amount" : amount,
                  "price"   : price , 
                  "divisa"  : divisa , 
                  "type"    : type};
    alert(JSON.stringify(body));
    xhr.send(JSON.stringify(body));
    alert("DESPUS DEL SEND");
    xhr.onload = function () {
      let responseObj = JSON.parse(xhr.response);
      alert(responseObj.price)
    };
   }
   setValidated(true);
   };

    const history = useHistory();
    //const trade = useSelector((state) => state.trade.coin);
    const dispatch = useDispatch();
    return (
        <div className="container" >
            <Container className='pt-4'>
                <h1 className="WeTitle" >
                    Buy && Sell
                </h1>
                <Row>
                 <Col>  
                 <Form noValidate validated={validate} onSubmit ={handleSubmit} >
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInput">NameCoin</Form.Label>
                        <Form.Control
                          id="disabledTextInput"
                          required
                          type="text"
                          placeholder="Name Coin"
                          pattern="([A-Z]){0,3}-([A-Z]){0,5}"
                        />
                        <Form.Control.Feedback type="invalid">Coin must be type of ETH-USDT </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInputAmount">Amount</Form.Label>
                        <Form.Control
                          id="disabledTextInputAmount"
                          required
                          type="text"
                          placeholder="Put amount"
                          pattern="([0-9])+.\w+"
                        />
                        <Form.Control.Feedback type="invalid">Amount cannot be text</Form.Control.Feedback>
                     
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledTextInputTwo">Price</Form.Label>
                        <Form.Control
                          id="disabledTextInputTwo"
                          required
                          type="text"
                          placeholder="Put price"
                          pattern="([0-9])*"
                        />
                        <Form.Control.Feedback type="invalid">Price must be numeric </Form.Control.Feedback>
                     
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Money</Form.Label>
                        <Form.Select id="disabledSelectOne">
                          <option>USD</option>
                          <option>Peso Argentino</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">Select Buy or Sell</Form.Label>
                        <Form.Select id="disabledSelectTwo">
                          <option>Buy</option>
                          <option>Sell</option>
                        </Form.Select>
                      </Form.Group>
                      <Button variant="primary" type="submit"  onClick={() => 
                        /*
                        {
                      let name_coin = document.getElementById('disabledTextInput').value.toString();
                      let price     = document.getElementById('disabledTextInputTwo').value.toString();
                      let divisa    = document.getElementById('disabledSelectOne').value.toString();
                      let type      = document.getElementById('disabledSelectTwo').value.toString();
                      var id_coin = 1;
                      var ws = "";
                      
                      alert(divisa);
                      alert(type);
                      alert("antes del fetch");
                      let xhr = new XMLHttpRequest();
                      let url = 'http://localhost:8000/trade/coin'
                      xhr.open('POST', url);
                      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                      let body = { "nameCoin": name_coin  , 
                                   "price"   : price , 
                                   "divisa"  : divisa , 
                                   "type"    : type};
                      alert(JSON.stringify(body));
                      xhr.send(JSON.stringify(body));
                      alert("DESPUS DEL SEND");
                      xhr.onload = function () {
                        let responseObj = JSON.parse(xhr.response);
                        alert(responseObj.price)
                      };
                      } 
                      */
                     {}
                      }
                      
                      >
                        Submit
                      </Button>
                      <Button type="submit" onClick={() => history.push("/")}>
                        Home
                      </Button>    
                 </Form>
                 </Col>
                 <Col>
                 </Col>
                 </Row> 
            </Container>
        </div>
    );
}

export default Trade;
