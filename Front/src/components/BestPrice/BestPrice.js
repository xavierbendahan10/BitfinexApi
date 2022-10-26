import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { savePrice , reset_price } from '../../redux/reducers/bestpriceSlice';
import { useHistory } from "react-router-dom";
import './BestPrice.css';

// savePrice para poder usar el "dispatch" y enviar el evento  al store redux
// useSelector para leer datos del store, useDispatch para enviar actions.

function Navigator() {
    const dispatch = useDispatch();
    const history = useHistory();
    
        
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home"> Coins </Navbar.Brand>
                <Nav className="me-auto">
                    <Button variant="outline-info" style={{marginRight: 2}} onClick={() => history.push("/")}>
                        Home
                    </Button>            
                </Nav>
                <Form className="d-flex">
                    <Form.Select size="sm" id="filterControl">
                       <option>ETH-USD</option>
                       <option>BTC-USD</option>
                    </Form.Select>
                    <Button variant="outline-success" type='button' value='Search'
                        onClick={() => {
                            let xhr = new XMLHttpRequest();
                            let filter = document.getElementById("filterControl").value
                            if(filter.replace(/\s+/g, '') === ""){
                                alert('This field cannot be empty');
                            }else if(!(filter.match(/([A-Z]){0,3}-([A-Z]){0,5}/))){
                                alert('input incorrect , example of input correct : ETH-USDT');
                            }else{
                                let xhr = new XMLHttpRequest();
                                let url = 'http://localhost:8000/bestprice/price'
                                xhr.open('POST', url);
                                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                let body = { "nameCoin": filter};
                                xhr.send(JSON.stringify(body));
                                xhr.onload = function () {
                                    let responseObj = JSON.parse(xhr.response);
                                    if (responseObj.error1 != null) {
                                      alert(responseObj.error1);
                                    } else if (responseObj.error2 != null) {
                                      alert(responseObj.error2);
                                    } else {
                                      let array1 = responseObj.lista.toString().split(',');  
                                      alert("LO Q ME LLEGA DEL SOCKET" + array1);
                                      var newArray = new Array();
                                      var count=0;
                                      var price=0;
                                      var countp=0;
                                      var amount=0;
                                      var id=0;
                                      for(var element of array1){
                                        if(count === 0){
                                          id=element;
                                        } else if (count===1) {
                                          price=element;
                                        } else if (count ===2){
                                          countp=element;
                                        } else{
                                          amount=element;
                                          count=-1;
                                          newArray.push({
                                            id:id, 
                                            price : price,
                                            count : countp,
                                            amount : amount})
                                        }
                                        count++;  
                                      }    
                                      dispatch(savePrice(newArray))
                                    }
                                };
                                    
                            }
                        }
                        }
                    >
                        <FontAwesomeIcon icon={faSearch}> </FontAwesomeIcon>
                    </Button>
                </Form>
            </Container>
        </Navbar>
    );
}




function Coins(props) {
    return (
        <Col className='mb-3' md={4} >
            <Card bg={'card l-bg-green-dark'}>
                <Card.Body>
                    <Card.Text>
                       {props.price} us$
                    </Card.Text>
                    <Card.Text>
                        count = {props.count}
                    </Card.Text>
                    <Card.Text>
                        Amount = {props.amount}
                    </Card.Text>
                    <Row>
                        <Col md={{ offset: 5 }}>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    );
}

function BestPrice() {
    const listCoins = useSelector((state) => state.price.value)
    return (
        <div className="Partida">
            <div className="App-navbar">
                <Navigator> </Navigator>
            </div>
            <Container className='pt-4'>
                <Row>
                   {listCoins.map(Coins)}
                </Row>
            </Container>
        </div>
    );
}

export default BestPrice;