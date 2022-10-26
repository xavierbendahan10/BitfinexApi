import './Init.css';
import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

function Init() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="bg">
      <Container>
        <Row>
          <text className="TextYellow">
            Cripto
            </text>
        </Row>
        <Row>
          <Button className="ButtomExampleTwo" variant="secondary"
            style={{ marginTop: "25%", width: "20%", marginLeft: "19%" }}
            onClick={() => history.push("/bestPrice")}>
            BestPrice
            </Button>
          <Button className="ButtomExampleTwo" variant="secondary"
            style={{ marginTop: "25%", width: "20%", marginLeft: "19%" }}
            onClick={() => history.push("/trade")}>
            Trade
            </Button>
        </Row>
      </Container>
    </div>
  )
};

export default Init;
