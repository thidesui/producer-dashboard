import { Col, Layout, Row } from "antd"
import Styled from '../../styles/pages/new'

const { Content } = Layout

export default () => {
    return <>
        <Layout>
            <Styled.Header>
                Tela de criação de novo produtor
            </Styled.Header>

            <Content>
                <Row>
                    <Col offset={4}>
                        Teste
                    </Col>
                </Row>
            </Content>
        </Layout>
    </>
}