import "antd/dist/antd.css";
import React, { useState } from "react";
import { Button, Col, Modal, Row, Slider, Table } from 'antd';

const columns = [
  {
    dataIndex: 'header_image',
    key: 'header_image',
    render: (record: any) => {
      return (
        <div>
          <img style={{ width: '250px' }} src={record} />
        </div>
      );
    },
  }

];

function TextTheme() {
  const apiUrl = 'http://steamback/api/getfirstgames?pageid=1';
  const [game, setgame] = useState([]);

  fetch(apiUrl)
    .then((response) => response.json())
    .then(data => setgame(data));



  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
    console.log(game)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  }

  return (
    <>

      <a onClick={showModal}>
        <Table dataSource={game} columns={columns} />
      </a>

      <Modal
        visible={isModalVisible}
        title="Title"
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handleOk}>
            Ok
          </Button>
        ]}
      >

      </Modal>

      <Row gutter={[16, 24]}>
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />

        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
      </Row>
      <Row gutter={[16, 24]}>
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
        <Col span={4} />
      </Row>
    </>
  );
}

export default TextTheme;
