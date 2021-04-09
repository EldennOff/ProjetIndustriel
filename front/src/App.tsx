import logo from './logo.svg'
import './App.css';
import {Collapse, Input, Modal, Select, Space, Switch} from "antd";
import "antd/dist/antd.css";
import {AppstoreOutlined, BarsOutlined, UserOutlined} from '@ant-design/icons'
import TextTheme from './Themes/TextTheme'
import React, {useState} from 'react'
import ImageTheme from './Themes/ImageTheme'


const {Search} = Input;
const check = true;


function App() {




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
        } else {
            setDisplayMode('image')
        }
        // console.log(displayMode)
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="headerLogos">
                    <img src={'https://img.icons8.com/ios/452/steam-circled.png'} className="App-logo" alt="logo"/>
                    <a onClick={showModal}>
                        <UserOutlined className="User-logo"/>
                    </a>
                </div>
            </header>
            <body>
            <div className="SearchBar">
                <div className="switchView">
                    <BarsOutlined/>
                    <Switch onChange={modeChange}/>
                    <AppstoreOutlined/>
                </div>
            </div>
            {displayMode === 'text' ? <TextTheme/> : <ImageTheme/>}
            <div className="modalConnexion">
                <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Space direction="vertical">
                        <Input placeholder="Enter your username"/>
                        <Input.Password placeholder="Enter your password"/>
                    </Space>
                </Modal>
            </div>
            </body>
        </div>

    );
}

export default App;
