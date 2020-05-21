import React, {Component} from 'react';
import './Me.css';
import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import Cookies from "js-cookie";
import Logo from "../../static/images/logo_w.png"
import Button from "react-bootstrap/Button";
import MyArticlesPanel from "../../components/myarticles/MyArticlesPanel";

class Me extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (Cookies.get("login") === "null") {
            this.props.history.push("/login");
            return null;
        }

        let user = JSON.parse(Cookies.get("login")).userInfo.userDTO;

        return (<Container style={{padding: 0, marginTop: '1em'}} className="Home">
            <Container className="Events">
                <Row style={{padding: 0}}>
                    <Col md={4} style={{padding: 0}}>
                        <Container className="Left-Card" style={{padding: 0}}>
                            <Image style={{width: '100%', background: '#000', padding: '4em'}} src={Logo}/>
                            <Container style={{padding: '3em'}}>
                                <Row>
                                    <h2>{user.username}</h2>
                                </Row>
                                <Row>
                                    <h4>{user.email}</h4>
                                </Row>
                                <Row style={{marginTop: '1em'}}>
                                </Row>

                                <Row style={{fontSize: '0.8em', marginTop: '1em'}}>
                                    <span style={{color: 'gray'}}>上一次在线: {user.lastLoginTime}</span>
                                </Row>
                                <Row style={{fontSize: '0.8em'}}>
                                    <span style={{color: 'gray'}}>共发布 2 篇文章</span>
                                </Row>

                                <Row style={{fontSize: '0.8em', marginTop: '2em'}}>
                                    <Button variant="outline-dark" type="button" style={{width: '100%'}} onClick={this.logout.bind(this)}>登出</Button>
                                </Row>
                            </Container>
                        </Container>
                    </Col>
                    <Col md={8} style={{paddingRight: 0, textAlign: 'left'}}>
                        <Row>
                            <Container style={{marginTop: '0em'}}>
                                <MyArticlesPanel uid={user.uid}/>
                            </Container>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>);
    }

    logout() {
        Cookies.set("login", null);
        this.props.history.push("/");
    }
}

export default Me;
