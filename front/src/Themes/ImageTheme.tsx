import "antd/dist/antd.css";
import React, {useEffect, useState} from "react";
import {Button, Col, Modal, Pagination, Row} from 'antd';
import axios from "axios";

interface Game {
    // appid: 'appid'
    // name: 'name'
    // genres: 'genres'
    // publisher: 'publisher'
    // developer: 'developer'
    // release_date: 'release_date'
    // image: 'image'
    // required_age: 'required_age'
    appid: number
    name: string
    genres: string
    publisher: string
    developer: string
    release_date: string
    image: string
    required_age: number
    header_image: string
}

interface Temp {
    total_games: string
    total_pages: string
    data: Game[]
}


function ImageTheme() {

    const [apiCall, setApiCall] = useState<Temp | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get<Temp>('http://steamback/api/getfirstgames?pageid=1')
            .then(({data}) => {
                setApiCall(data);
            })
            .catch((error) => console.error())
            .finally(() => setIsLoading(false))
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    }

    let total_games = Number(apiCall?.total_games)
    if (apiCall) {
        console.log(apiCall.data)

    }

    return (
        <>
            <div style={{textAlign: "center"}}>

                {!isLoading && apiCall ? apiCall.data.map((game: Game) => (
                    <img key={game.appid} style={{margin: "4px 4px 4px 4px"}} src={game.header_image}></img>
                )) : <p>Loading</p>}

            </div>
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
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>

                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
            </Row>
            <Row gutter={[16, 24]}>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
                <Col span={4}/>
            </Row>
            <Pagination showSizeChanger={false} pageSize={20} defaultCurrent={1}  total={total_games}
                        onChange={(page) =>
                            axios.get<Temp>('http://steamback/api/getfirstgames?pageid=' + page)
                                .then(({data}) => {
                                    setApiCall(data);
                                })
                                .catch((error) => console.error())
                                .finally(() => setIsLoading(false))}/>

        </>
    );
}

export default ImageTheme;
