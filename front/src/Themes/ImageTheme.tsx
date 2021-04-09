import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Input, Modal, Pagination, Radio, Row, Select } from 'antd';
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

    const [input_name, setInput_name] = useState<string>("");
    const [input_categories, setInput_categories] = useState<string>("");
    const [input_genres, setInput_genres] = useState<string>("");
    const [input_developer, setInput_developer] = useState<string>("");
    const [input_publisher, setInput_publisher] = useState<string>("");
    const [select_shortBy, setSelect_shortBy] = useState<string>("");
    const [radioButton, setRadioButton] = useState<string>("");

    const { Panel } = Collapse;

    function callback(key: any) {
        console.log(key);
    }

    const [apiCall, setApiCall] = useState<Temp | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get<Temp>("http://steamback/api/getfirstgames?pageid=1")
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
            headers: { "Content-Type": "multipart/form-data" },
        }).then(({ data }) => {
            setApiCall(data);
        })
            .catch((error) => console.error())
            .finally(() => setIsLoading(false))


    }


    return (
        <>

            <div style={{ textAlign: "left" }}>
                <Collapse defaultActiveKey={['0']} onChange={callback}>
                    <Panel header="Recherche avancée" key="1">
                        Name : <Input id="input_name" value={input_name} type="text" onChange={handleName} /><br /><br />
                        Categories : <Input id="input_categories" type="text" value={input_categories} onChange={handleCategories} /><br /><br />
                        Genres : <Input id="input_genres" type="text" value={input_genres} onChange={handleGenres} /><br /><br />
                        Developer : <Input id="input_developer" type="text" value={input_developer} onChange={handleDeveloper} /><br /><br />
                        Publisher : <Input id="input_publisher" type="text" value={input_publisher} onChange={handlePublisher} /> <br /><br />
                        <div>
                            Sort By : <Select defaultValue="name" id="select_sortBy" style={{ width: "120px" }} >
                                <option value="name" onChange={handleShortBy}>Name</option>
                                <option value="release_date" onChange={handleShortBy}>Release Date</option>
                                <option value="developer" onChange={handleShortBy}>Developer</option>
                                <option value="publisher" onChange={handleShortBy}>Publisher</option>
                                <option value="required_age" onChange={handleShortBy}>Required Age</option>
                                <option value="percentage_ratings" >Percentage Ratings</option>
                            </Select>
                        </div>
                        <div style={{ textAlign: "justify" }}>
                            <Radio.Group defaultValue="desc">
                                <Radio value="desc" onChange={handleRadio}>Descendant</Radio>
                                <Radio value="asc" onChange={handleRadio} >Ascendant</Radio>
                            </Radio.Group>
                        </div>
                        <div>
                            <Button value="Submit" id="submit" onClick={() => { researchData(1) }}>Research</Button>
                        </div>
                    </Panel>
                </Collapse>
            </div>


            <div style={{ textAlign: "center" }}>

                {!isLoading && apiCall ? apiCall.data.map((game: Game) => (
                    <img key={game.appid} style={{ margin: "4px 4px 4px 4px" }} src={game.header_image}></img>
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
            <Pagination showSizeChanger={false} pageSize={20} defaultCurrent={1} total={total_games}
                onChange={(page) => { researchData(page) }} />

        </>
    );
}

export default ImageTheme;
