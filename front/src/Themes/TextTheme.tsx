import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Collapse, Modal, Row, Table } from 'antd';
import axios from "axios";
import "./TextTheme.css";

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
        dataIndex: 'release_date_string',
        key: 'release_date',
    },

    {
        title: 'Image',
        dataIndex: 'header_image',
        key: 'header_image',
        render: (record: any) => {
            return (
                <div>
                    <img style={{ width: '250px' }} src={record} />
                </div>
            );
        },
    },
    {
        title: 'Required Age',
        dataIndex: 'required_age',
        key: 'required_age',
    },
];

interface Info {
    steam: Game
    description: Description
    media: Media
    requirements: Requirements
    // support: 
    tags: String[]

}

interface SteamCall {
    total_games: string
    total_pages: string
    data: Game[]
}

interface Game {
    appid: string,
    name: string,
    release_date: number,
    release_date_string: string,
    english: string,
    developer: string,
    publisher: string,
    platforms: string,
    required_age: string,
    categories: string,
    genres: string,
    steamspy_tags: string,
    achievements: string,
    positive_ratings: string,
    negative_ratings: string,
    percentage_ratings: number,
    average_playtime: string,
    median_playtime: string,
    owners: string,
    price: string
}

interface Description {
    appid: string
    detailed_description: Object
    about_the_game: Object
    short_description: Object
}

interface Media {
    appid: string
    header_image: string
    screenshots: string
    background: string
    movies: string
}

interface Requirements {
    minimum: string
    recommended: string

}
interface Support {

}




function TextTheme() {
    const [apiCall, setApiCall] = useState<SteamCall | null>(null);
    const [gameCall, setGameCall] = useState<Info | null>(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        axios.get<SteamCall>('http://steamback/api/getfirstgames?pageid=1')
            .then(({ data }) => {
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

    const getGameByAppId = (appid: string) => {
        axios.get<Info>('http://steamback/api/game?appi=' + appid)
            .then(({ data }) => {
                setGameCall(data);
            })
            .catch((error) => console.error())
    }

    

    console.log(gameCall)

    return (
        <>
            <div>
                {!isLoading && apiCall ?
                    <Table dataSource={apiCall.data} columns={columns} pagination={false} rowKey={record => record.appid} onRow={(record, rowIndex) => {

                        return {
                            onClick: event => {
                                getGameByAppId(record.appid.toString())
                                showModal()
                            }
                        };
                    }} />
                    // apiCall.data.map((game: Game) => ())
                    // <li key={game.appid}>{game.name} - {game.name} </li>))
                    : <p>Loading</p>}
            </div>
            {
                gameCall && (

                    <Modal
                        visible={isModalVisible}
                        width="1100px"
                        title={gameCall.steam.name}
                        onOk={handleOk}
                        onCancel={handleOk}
                        footer={[
                            <Button key="back" onClick={handleOk}>
                                Ok
                    </Button>
                        ]}
                    >
                        <>
                            <Row>
                                <Col span={4}>

                                </Col>
                                <Col span={8} offset={4}>
                                    <h1 className="center">{gameCall.steam.name}</h1>
                                </Col>
                                <Col span={4} offset={4}>
                                    <h3>Rate : {gameCall.steam.percentage_ratings} %</h3>
                                    <p>Required Age : {gameCall.steam.required_age}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={6}>
                                    <Carousel autoplay>
                                        <div className="carousel">
                                            <img
                                                src={gameCall.media.screenshots[0]} />
                                        </div>
                                        <div className="carousel">
                                            <img
                                                src={gameCall.media.screenshots[1]} />
                                        </div>
                                        <div className="carousel">
                                            <img
                                                src={gameCall.media.screenshots[2]} />
                                        </div>
                                    </Carousel>
                                </Col>
                                {/* <Col span={12} offset={2}>
                            <img className="SteamCall" src="https://lh3.googleusercontent.com/proxy/4B3IORMMoc_1ycCUsq8FyzznkE_AFvtN3tdhUEk-NIx-aZJIqp7OuxFVHSBf0u_cITo0vzSzgjXgMRSiX5qaflYP0Q1fovtlM8l2rwb8OcrOeTVn9vL4csw_stMvCeV3-bA9TcfyO5op_qu5SkxOiZ-eJ-b5eu_5yvEEJy4dFYLbtoCThrVDiPVqrJMfUkhm1qYo2JeAkkEP2G9nl1KuoW9vP3Qawsx-_dpJ8M4HD_C0f0C_-oo1rA" />
                        </Col> */}
                            </Row>

                            <Row className="about">
                                <Col span={20} offset={2}>
                                    <h1>About this game</h1>
                                    <p>
                                        {gameCall.description.short_description}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={16}>
                                    <Row>
                                        <Col span={6}>
                                            <h3>Developer</h3>
                                            <p>{gameCall.steam.developer}</p>
                                        </Col>
                                        <Col span={6}>
                                            <h3>Publisher</h3>
                                            <p>{gameCall.steam.publisher}</p>
                                        </Col>
                                    </Row>

                                    <h3>Categories</h3>
                                    <p>{gameCall.steam.categories}</p>
                                    <h3>Genres</h3>
                                    <p>{gameCall.steam.genres}</p>
                                    <h3>Tags</h3>
                                    <p>{gameCall.tags.toString()}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={16}>
                                    <h2>Requirements</h2>
                                    <ul>
                                        <li>Minimum <br />{gameCall.requirements.minimum}</li>
                                        {gameCall.requirements.recommended && <li>Recommended : <br />{gameCall.requirements.recommended}</li>}
                                    </ul>
                                </Col>
                            </Row>
                        </>

                    </Modal>
                )
            }
        </>
    );
}

export default TextTheme;
