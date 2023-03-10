import React from 'react';
import s from "./App.module.css";
import { Col, Row } from "antd";
import { InputCopy } from "components/InputCopy";


function App() {
  return (
    <div className={s.app}>
      <Row>
        <Col span={24}>
          <InputCopy value={""} onChange={() => {
          }}/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
