import "antd/dist/antd.css";
import React, {useEffect, useState} from "react";
import {Carousel, Col, Collapse, Modal, Row} from 'antd';
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
                    <img style={{width: '250px'}} src={record}/>
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
}

interface Temp {
    total_games: string
    total_pages: string
    data: Game[]
}


function TextTheme() {
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

    return (

        <>

            <div>
                <ul>
                    {!isLoading && apiCall ?
                        // <Table dataSource={apiCall.data} columns={columns} />
                        apiCall.data.map((game: Game) => (
                            <li key={game.appid}>{game.name} - {game.name} </li>))
                        : <p>Loading</p>}
                </ul>
            </div>





            {/* <Button onClick={showModal}>Modal</Button> */}

            <Modal
                visible={isModalVisible}
                width="1100px"
                title="Modal de #Nomdujeu"
                onOk={handleOk}
                footer={[
                    // <Button key="back" onClick={handleOk}>
                    //     Ok
                    // </Button>
                ]}
            >
                <>
                    <Row>
                        <Col span={8} offset={8}>
                            <h1 className="center">Nom du jeu</h1>
                        </Col>
                        <Col span={4} offset={4}>
                            <h1 className="note">Note : 99</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} offset={6}>
                            <Carousel
                                autoplay
                            >
                                <div className="carousel">
                                    <img
                                        src="https://lh3.googleusercontent.com/proxy/4B3IORMMoc_1ycCUsq8FyzznkE_AFvtN3tdhUEk-NIx-aZJIqp7OuxFVHSBf0u_cITo0vzSzgjXgMRSiX5qaflYP0Q1fovtlM8l2rwb8OcrOeTVn9vL4csw_stMvCeV3-bA9TcfyO5op_qu5SkxOiZ-eJ-b5eu_5yvEEJy4dFYLbtoCThrVDiPVqrJMfUkhm1qYo2JeAkkEP2G9nl1KuoW9vP3Qawsx-_dpJ8M4HD_C0f0C_-oo1rA"/>
                                </div>
                                <div className="carousel">
                                    <img
                                        src="https://store-images.s-microsoft.com/image/apps.34721.14497007681830249.1b307a7b-fe75-442d-9bb3-13b865e22c88.02d5bc74-b5bd-444b-9e83-be774d5f4fd5?mode=scale&q=90&h=1080&w=1920&format=jpg"/>
                                </div>
                                <div className="carousel">
                                    <img src="https://www.gamereactor.fr/media/99/deadcells_2539923b.jpg"/>
                                </div>
                            </Carousel>
                        </Col>
                        {/* <Col span={12} offset={2}>
                            <img className="temp" src="https://lh3.googleusercontent.com/proxy/4B3IORMMoc_1ycCUsq8FyzznkE_AFvtN3tdhUEk-NIx-aZJIqp7OuxFVHSBf0u_cITo0vzSzgjXgMRSiX5qaflYP0Q1fovtlM8l2rwb8OcrOeTVn9vL4csw_stMvCeV3-bA9TcfyO5op_qu5SkxOiZ-eJ-b5eu_5yvEEJy4dFYLbtoCThrVDiPVqrJMfUkhm1qYo2JeAkkEP2G9nl1KuoW9vP3Qawsx-_dpJ8M4HD_C0f0C_-oo1rA" />
                        </Col> */}
                    </Row>

                    <Row className="about">
                        <Col span={12} offset={6}>
                            <h1>About this game</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ea ab laudantium,
                                neque dolore repellat dicta ut repellendus voluptate eos, magni explicabo laborum unde
                                temporibus perferendis libero mollitia accusamus. Porro?
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <h2>Features</h2>
                            <ul>
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat laboriosam
                                    totam perspiciatis asperiores vitae architecto illo optio! Rem, beatae aliquid
                                    eligendi assumenda dolorem accusantium non inventore praesentium laudantium
                                    accusamus!
                                </li>
                                <li>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto id, quidem,
                                    laboriosam rerum magnam saepe error optio veritatis soluta, voluptatum ipsam ex
                                    esse.
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <h2>Config</h2>
                            <ul>
                                <li>
                                    Processeur : Intel Core i5 ou AMD Ryzen 5
                                </li>
                                <li>
                                    Mémoire Vive RAM : 16 Go de RAM DDR4 2133 hz
                                </li>
                                <li>
                                    Carte graphique : Nvidia GeForce GTX 1060 6 Go
                                </li>
                                <li>
                                    Disque dur : Disque SSD de 250 Go en complément d’un disque dur HDD de 1 To
                                </li>
                                <li>
                                    Système d’exploitation : Windows 10 (64 bit)
                                </li>

                            </ul>
                        </Col>
                    </Row>
                </>

            </Modal>
        </>
    );
}

export default TextTheme;
