import "antd/dist/antd.css";
import React, {useState} from "react";
import {Button, Modal, Table} from 'antd';


const dataSource = [
    {

        "appid": "365460",
        "name": "CHARIOT WARS",
        "release_date": "2015-05-25",
        "english": "1",
        "developer": "OM ENTERTAINMENT",
        "publisher": "OM ENTERTAINMENT",
        "platforms": "windows",
        "required_age": "0",
        "categories": "Single-player;Multi-player;Steam Achievements;Steam Cloud;Stats;Steam Leaderboards",
        "genres": "Racing",
        "steamspy_tags": "Racing;Arcade;Action",
        "achievements": "16",
        "positive_ratings": "1",
        "negative_ratings": "9",
        "average_playtime": "0",
        "median_playtime": "0",
        "owners": "0-20000",
        "price": "4.99"

    },
    {
        "appid": "371520",
        "name": "Bounty Train",
        "release_date": "2017-05-16",
        "english": "1",
        "developer": "Corbie Games",
        "publisher": "Daedalic Entertainment",
        "platforms": "windows;mac",
        "required_age": "0",
        "categories": "Single-player;Steam Achievements;Steam Trading Cards",
        "genres": "Indie;Simulation;Strategy",
        "steamspy_tags": "Simulation;Strategy;Indie",
        "achievements": "30",
        "positive_ratings": "572",
        "negative_ratings": "240",
        "average_playtime": "217",
        "median_playtime": "217",
        "owners": "50000-100000",
        "price": "18.99"
    },
    {
        "appid": "371550",
        "name": "A Bastard's Tale",
        "release_date": "2015-05-26",
        "english": "1",
        "developer": "No Pest Productions",
        "publisher": "No Pest Productions",
        "platforms": "windows",
        "required_age": "0",
        "categories": "Single-player;Steam Achievements;Full controller support;Steam Trading Cards;Steam Cloud",
        "genres": "Action;Adventure;Indie",
        "steamspy_tags": "Indie;Action;Adventure",
        "achievements": "10",
        "positive_ratings": "164",
        "negative_ratings": "38",
        "average_playtime": "408",
        "median_playtime": "408",
        "owners": "20000-50000",
        "price": "3.99"
    }
];

const columns = [

    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Genres',
        dataIndex: 'genres',
        key: 'genres',
    },
    {
        title: 'Publisher',
        dataIndex: 'publisher',
        key: 'publisher',
    },
    {
        title: 'Developer',
        dataIndex: 'developer',
        key: 'developer',
    },
    {
        title: 'Release Date',
        dataIndex: 'release_date',
        key: 'release_date',
    },

    {
        title: 'Image',
        dataIndex: 'header_image',
        key: 'header_image',
        render: (record: any) => {
            return (
                <div>
                    <img style={{width: '250px'}} src={record}/>
                </div>
            );},
    },
    {
        title: 'Required Age',
        dataIndex: 'required_age',
        key: 'required_age',
    },
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
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    return (

        <>

            <a onClick={showModal}>
                <Table dataSource={game} columns={columns}/>
            </a>

            <Modal
                visible={isModalVisible}
                title="Title"
                onOk={handleOk}
                footer={[
                    <Button key="back" onClick={handleOk}>
                        Ok
                    </Button>,
                ]}
            >
                <p>aa</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
}

export default TextTheme;
