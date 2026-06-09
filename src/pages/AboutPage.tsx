import "../App.css";

import { useState, useEffect } from "react";

import about_arrow_l from "../pic/about_arrow_l.svg";
import about_arrow_m from "../pic/about_arrow_m.svg";
import about_arrow_s from "../pic/about_arrow_s.svg";
import about_arrow_right from "../pic/about_arrow_right.svg";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AboutPage: React.FC = () => {
    const [isEnter, setEnter] = useState<Boolean>(false);

    useEffect(() => {
        setEnter(true);
        console.log(`isEnter: ${isEnter}`);
    }, []);

    return(
        <Container fluid className="about-body px-0">
            <Container fluid className={isEnter ? "about-head-transition" : "about-head"}>
                <Row>
                    <Col className="about-head-col about-head-text">
                        <div>
                            <span className="about-head-title">“숨”</span>은 순서도를 사용해<br />
                        프로그램을 구성하는<br />
                        비주얼 프로그래밍 언어입니다.
                        </div>
                    </Col>
                    <Col className="about-head-col">
                        <div className="about-head-img-input" onMouseEnter={() => setEnter(true)}>
                            입력
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className="about-head-col">
                        <img src={about_arrow_l}></img>
                    </Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <section className="about-head-img-rect">
                            <div>
                                <h2>
                                    왜 “숨”인가요?
                                </h2>
                                <p className="about-head-rect-text">
                                    “숨”이라는 이름에는 숨 쉬듯 자연스럽고 쉬운 프로그래밍 언어라는 의미가 담겨 있습니다.<br />
                                    또한 순서도의 형태에서 영감을 받은 이름으로, 언어의 직관적인 사용성을 상징합니다.
                                </p>
                            </div>
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <img src={about_arrow_m}></img>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <div className="about-head-img-diamond">
                            왜?
                        </div>
                        <div>
                            <img src={about_arrow_right}></img>
                        </div>
                        <section className="about-head-img-rect">
                            <div className="about-head-rect-text">
                                숨은 비주얼 프로그래밍의 장점을 입문자용 도구에만 머무르게 하지 않고,<br />
                                실제 개발에서도 효율적으로 사용할 수 있도록 만들기 위해 탄생했습니다.<br />
                                유효하지 않은 입력을 막고, 작성 즉시 오류를 확인할 수 있으며,<br />
                                변수명이나 함수명 변경도 정의한 곳에서 수정하면 자동으로 반영됩니다.
                            </div>
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <img src={about_arrow_m}></img>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <div className="about-head-img-diamond">
                            특징
                        </div>
                        <div>
                            <img src={about_arrow_right}></img>
                        </div>
                        <section className="about-head-img-rect">
                            <div className="about-head-rect-text">
                                숨은 컴파일 오류를 줄이고, 자료형과 이름 변경을 안전하게 관리하며,<br />
                                널 안정성, 쉬운 반복문 탈출, 객체 지향 프로그래밍 등을 지원합니다.<br />
                                덕분에 실수를 줄이면서도 복잡한 프로그램을 안정적으로 작성할 수 있습니다.
                            </div>    
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col className="about-head-col">
                        <img src={about_arrow_m}></img>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col className="about-head-col">
                        <section className="about-head-img-rect">
                            <div className="about-head-rect-text">
                                숨은 키보드만으로 빠르게 개발할 수 있는 입력 체계를 갖추고 있습니다.<br />
                                자유로운 작명과 함수 수정, 안전한 메모리 관리, 할당자 트리 기반 쓰레기 수집,<br />
                                효율적인 반복문, 다중상속, 직관적인 괄호 구조 등을 특징으로 합니다.
                            </div>    
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <img src={about_arrow_m}></img>
                    </Col>
                </Row>
                <Row>
                    <Col className="about-head-col about-head-img-diamond">
                            철학
                    </Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <img src={about_arrow_m}></img>
                    </Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <section className="about-head-img-rect">
                            <div>
                                <h2>
                                    숨은 직관적이고 빠른 개발 경험을 추구합니다.
                                </h2>
                                <p className="about-head-rect-text">
                                    기존 비주얼 프로그래밍 언어는 직관적이지만 마우스 조작이 많아 전문 개발자에게는 비효율적일 수 있습니다.<br />
                                    숨은 이 한계를 해결하기 위해 키보드 중심의 비주얼 프로그래밍을 지향합니다.<br />
                                    예약어 대신 단축키로 구문을 만들 수 있어, 언어 입력 방식에 얽매이지 않고 여러 언어 환경에서 자연스럽게 프로그래밍할 수 있습니다.
                                </p>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
};

export default AboutPage;
