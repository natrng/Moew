import React from "react";
import landingImage from "../../static/catLap.jpg";
import "./style.css";

import { Row, Col, Typography } from "antd";

const { Title } = Typography;

const LandingPage = () => {
  return (
    <>
      <Row justify={"center"}>
        <Col>
          <Row justify={"center"}>
            <Title className="landingTitle">Moew</Title>
          </Row>
          <img alt="cat" src={landingImage} className="landingImage" />
          <Title className="imageText">Did you organize your day yet?</Title>
        </Col>
      </Row>
      <Row>
        <Col>
            
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
