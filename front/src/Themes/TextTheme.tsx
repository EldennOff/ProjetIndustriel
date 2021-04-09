import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import {Button, Carousel, Col, Collapse, Input, Modal, Pagination, Radio, Row, Select, Table} from 'antd';
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
                    <img style={{ width: '250px' }} src={record} alt={'image head'}/>
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

    const [apiCall, setApiCall] = useState<SteamCall | null>(null);
    const [gameCall, setGameCall] = useState<Info | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

    let total_games = Number(apiCall?.total_games)

    console.log(gameCall);

    function researchData(pageid: number) {
        console.log(input_name)

        const bodyFormData = new FormData();

        bodyFormData.append('name',input_name);
        bodyFormData.append('categories',input_categories);
        bodyFormData.append('genres',input_genres);
        bodyFormData.append('developer',input_developer);
        bodyFormData.append('publisher',input_publisher);
        bodyFormData.append('asc_desc',radioButton);
        bodyFormData.append('sortby',select_shortBy);
        bodyFormData.append("pageid",pageid.toString());
        axios({
            method: "post",
            url: "http://steamback/api/searchgame",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
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
                        Categories : <Input id="input_categories" type="text" value={input_categories} onChange={handleCategories}/><br/><br/>
                        Genres : <Input id="input_genres" type="text"  value={input_genres} onChange={handleGenres}/><br/><br/>
                        Developer : <Input id="input_developer" type="text"  value={input_developer} onChange={handleDeveloper}/><br/><br/>
                        Publisher : <Input id="input_publisher" type="text"  value={input_publisher} onChange={handlePublisher}/> <br/><br/>
                        <div>
                            Sort By : <Select defaultValue="name" id="select_sortBy" style={{width: "120px"}} >
                            <option value="name" onChange={handleShortBy}>Name</option>
                            <option value="release_date" onChange={handleShortBy}>Release Date</option>
                            <option value="developer" onChange={handleShortBy}>Developer</option>
                            <option value="publisher" onChange={handleShortBy}>Publisher</option>
                            <option value="required_age" onChange={handleShortBy}>Required Age</option>
                            <option value="percentage_ratings" >Percentage Ratings</option>
                        </Select>
                        </div>
                        <div style={{textAlign: "justify"}}>
                            <Radio.Group  defaultValue="desc">
                                <Radio value="desc" onChange={handleRadio}>Descendant</Radio>
                                <Radio value="asc" onChange={handleRadio} >Ascendant</Radio>
                            </Radio.Group>
                        </div>
                        <div>
                            <Button value="Submit" id="submit" onClick={()=>{researchData(1)}}>Research</Button>
                        </div>
                    </Panel>
                </Collapse>
            </div>
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
            <Pagination showSizeChanger={false} pageSize={20} defaultCurrent={1} total={total_games}
                        onChange={(page) =>{researchData(page) }}/>
        </>
    );
}

export default TextTheme;
