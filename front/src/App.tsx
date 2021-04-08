import logo from './logo.svg'
import './App.css';
import {Input, Space, Table, Switch, Modal, Collapse} from "antd";
import "antd/dist/antd.css";
import { UserOutlined, BarsOutlined, AppstoreOutlined } from '@ant-design/icons'
import TextTheme from './Themes/TextTheme'
import React, { useState } from 'react'
import ImageTheme from './Themes/ImageTheme'
import Connexion from './Connexion'


const { Search } = Input;
const check = true;


function App() {



  const {Panel} = Collapse;

  function callback(key: any) {
    console.log(key);
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [displayMode, setDisplayMode] = useState('text');

  const modeChange = () => {
    if (displayMode === 'image') {
      setDisplayMode('text')
    }
    else {
      setDisplayMode('image')
    }
    // console.log(displayMode)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="headerLogos">
          <img src={logo} className="App-logo" alt="logo" />
          <a onClick={showModal}>
            <UserOutlined className="User-logo" />
          </a>
        </div>
      </header>
      <body>

        <div className="SearchBar">
          <Space direction="vertical">
            <Search
              placeholder="Search Bar"
              allowClear
              enterButton="Search"
              size="middle"
            />
            <Collapse defaultActiveKey={['0']} onChange={callback}>
              <Panel header="Recherche avancée" key="1">
                Name : <input type="text"/><br/><br/>
                Categories : <input type="text"/><br/><br/>
                Publisher : <input type="text"/> <br/><br/>
                Developer : <input type="text"/><br/><br/>
              </Panel>
            </Collapse>
          </Space>
          <br />
          <div className="switchView">
            <BarsOutlined />
            <Switch onChange={modeChange} />
            <AppstoreOutlined />
          </div>
        </div>
        {displayMode === 'text' ? <TextTheme /> : <ImageTheme />}
        <div className="modalConnexion">
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Space direction="vertical">
              <Input placeholder="Enter your username" />
              <Input.Password placeholder="Enter your password" />
            </Space>
          </Modal>
        </div>
      </body>
    </div>

  );
}

export default App;
