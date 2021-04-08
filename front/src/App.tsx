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
        } else {
            setDisplayMode('image')
        }
        // console.log(displayMode)
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="headerLogos">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <a onClick={showModal}>
                        <UserOutlined className="User-logo"/>
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

                    <div style={{textAlign: "left"}} >
                        <Collapse defaultActiveKey={['0']} onChange={callback}>
                            <Panel header="Recherche avancée" key="1">
                                Name : <Input type="text"/><br/><br/>
                                Categories : <Input type="text"/><br/><br/>
                                Publisher : <Input type="text"/> <br/><br/>
                                Developer : <Input type="text"/><br/><br/>

                                Sort By : <Select defaultValue="name" style={{width: "120px"}} id="sortBy" allowClear>

                                <option value="name">Name</option>
                                <option value="release_date">Release Date</option>
                                <option value="developer">Developer</option>
                                <option value="publisher">Publisher</option>
                                <option value="required_age">Required Age</option>
                                <option value="percentage_ratings">Percentage Ratings</option>
                            </Select>
                                <div style={{textAlign:"justify"}}>
                                    <input type="radio" id="ascendant" name="ascendant" value="ascendant" checked/>
                                    <label htmlFor="ascendant">Ascendant  </label>
                                    <input type="radio" id="descendant" name="descendant" value="descendant"/>
                                    <label htmlFor="descendant">Descendant  </label>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>

                </Space>
                <br/>
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
