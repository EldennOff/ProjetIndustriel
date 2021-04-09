import "antd/dist/antd.css";
import React, {useEffect, useState} from "react";
import {Button, Carousel, Col, Collapse, Input, Modal, Pagination, Radio, Row, Select} from 'antd';
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

interface Info {
    steam: Game
    description: Description
    media: Media
    requirements: Requirements
    // support:
    // tags:

}

interface SteamCall {
    total_games: string
    total_pages: string
    data: Game[]
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
    recommanded: string

}

interface Support {

}
interface Tags {

}


function ImageTheme() {


    const handleName = (event: any) => {
        setInput_name(event.target.value);
    }

    const handleCategories = (event: any) => {
        setInput_categories(event.target.value);
    }

    const handleGenres = (event: any) => {
        setInput_genres(event.target.value);
    }

    const handleDeveloper = (event: any) => {
        setInput_developer(event.target.value);
    }

    const handlePublisher = (event: any) => {
        setInput_publisher(event.target.value);
    }

    const handleShortBy = (event: any) => {
        setSelect_shortBy(event.target.value);
    }

    const handleRadio = (event: any) => {
        setRadioButton(event.target.value);
    }

    const [gameCall, setGameCall] = useState<Info | null>(null);

    const [input_name, setInput_name] = useState<string>("");
    const [input_categories, setInput_categories] = useState<string>("");
    const [input_genres, setInput_genres] = useState<string>("");
    const [input_developer, setInput_developer] = useState<string>("");
    const [input_publisher, setInput_publisher] = useState<string>("");
    const [select_shortBy, setSelect_shortBy] = useState<string>("");
    const [radioButton, setRadioButton] = useState<string>("");

    const {Panel} = Collapse;

    function callback(key: any) {
        console.log(key);
    }

    const [apiCall, setApiCall] = useState<Temp | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getGameByAppId = (appid: string) => {
        axios.get<Info>('http://steamback/api/game?appi=' + appid)
            .then(({ data }) => {
                setGameCall(data);
            })
            .catch((error) => console.error())
    }

    useEffect(() => {
        axios.get<Temp>("http://steamback/api/getfirstgames?pageid=1")
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


    function researchData(pageid: number) {
        console.log(input_name)

        const bodyFormData = new FormData();

        bodyFormData.append('name', input_name);
        bodyFormData.append('categories', input_categories);
        bodyFormData.append('genres', input_genres);
        bodyFormData.append('developer', input_developer);
        bodyFormData.append('publisher', input_publisher);
        bodyFormData.append('asc_desc', radioButton);
        bodyFormData.append('sortby', select_shortBy);
        bodyFormData.append("pageid", pageid.toString());
        axios({
            method: "post",
            url: "http://steamback/api/searchgame",
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data"},
        }).then(({data}) => {
            setApiCall(data);
        })
            .catch((error) => console.error())
            .finally(() => setIsLoading(false))


    }


    return (
        <>

            <div style={{textAlign: "left"}}>
                <Collapse defaultActiveKey={['0']} onChange={callback}>
                    <Panel header="Recherche avancée" key="1">
                        Name : <Input id="input_name" value={input_name} type="text" onChange={handleName}/><br/><br/>
                        Categories : <Input id="input_categories" type="text" value={input_categories}
                                            onChange={handleCategories}/><br/><br/>
                        Genres : <Input id="input_genres" type="text" value={input_genres}
                                        onChange={handleGenres}/><br/><br/>
                        Developer : <Input id="input_developer" type="text" value={input_developer}
                                           onChange={handleDeveloper}/><br/><br/>
                        Publisher : <Input id="input_publisher" type="text" value={input_publisher}
                                           onChange={handlePublisher}/> <br/><br/>
                        <div>
                            Sort By : <Select defaultValue="name" id="select_sortBy" style={{width: "120px"}}>
                            <option value="name" onChange={handleShortBy}>Name</option>
                            <option value="release_date" onChange={handleShortBy}>Release Date</option>
                            <option value="developer" onChange={handleShortBy}>Developer</option>
                            <option value="publisher" onChange={handleShortBy}>Publisher</option>
                            <option value="required_age" onChange={handleShortBy}>Required Age</option>
                            <option value="percentage_ratings">Percentage Ratings</option>
                        </Select>
                        </div>
                        <div style={{textAlign: "justify"}}>
                            <Radio.Group defaultValue="desc">
                                <Radio value="desc" onChange={handleRadio}>Descendant</Radio>
                                <Radio value="asc" onChange={handleRadio}>Ascendant</Radio>
                            </Radio.Group>
                        </div>
                        <div>
                            <Button value="Submit" id="submit" onClick={() => {
                                researchData(1)
                            }}>Research</Button>
                        </div>
                    </Panel>
                </Collapse>
            </div>


            <div style={{textAlign: "center"}}>

                {!isLoading && apiCall ? apiCall.data.map((game: Game) => (
                    <img key={game.appid} style={{margin: "4px 4px 4px 4px"}} src={game.header_image} onClick={ ()=> {
                        getGameByAppId(game.appid.toString())
                        showModal()
                    }}/>
                )) : <p>Loading</p>}

            </div>
            {
                gameCall && (

                    <Modal
                        visible={isModalVisible}
                        width="1100px"
                        title={gameCall.steam.name}
                        onOk={handleOk}
                        footer={[
                            <Button key="back" onClick={handleOk}>
                                Ok
                            </Button>
                        ]}
                    >
                        <>
                            <Row>
                                <Col span={8} offset={8}>
                                    <h1 className="center">{gameCall.steam.name}</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} offset={6}>
                                    <Carousel
                                        autoplay
                                    >
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
                                    <h2>Requirements :</h2>
                                    <ul>
                                        <li>{gameCall.requirements.minimum}</li>
                                    </ul>
                                </Col>
                            </Row>
                        </>

                    </Modal>
                )
            }

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
            <Pagination showSizeChanger={false} pageSize={20} defaultCurrent={1} total={total_games}
                        onChange={(page) => {
                            researchData(page)
                        }}/>

        </>
    );
}

export default ImageTheme;
