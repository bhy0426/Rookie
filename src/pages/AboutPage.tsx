import "../App.css";

import about_input from "../pic/about_input.svg";
import about_arrow from "../pic/about_arrow.svg";
import about_rect from "../pic/about_rect.svg";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AboutPage: React.FC = () => {
    return(
        <Container fluid className="about-body px-0">
            <Container fluid className="about-head">
                <Row>
                    <Col className="about-head-col about-head-text">
                        <div>
                            <span className="about-head-title">“숨”</span>은 순서도를 사용해<br />
                        프로그램을 구성하는<br />
                        비주얼 프로그래밍 언어입니다.
                        </div>
                        
                    </Col>
                    <Col className="about-head-col">
                        <div className="about-head-img-input">
                            입력
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col className="about-head-col">
                        <img src={about_arrow}></img>
                    </Col>
                </Row>
                <Row>
                    <Col className="about-head-col">
                        <div className="about-head-img-rect">
                            숨은 무슨 뜻인가요?
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
};

export default AboutPage;
