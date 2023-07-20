import { Button, Col, Form, Layout, Modal, Row } from "antd"
import ProducerForm from "@/components/producerForm"
import Head from "next/head"
import Header from "@/components/header"
import PageContainer from "@/components/pageContainer"
import { ProducerFormValues } from "@/interfaces/components/producerForm"
import { useState } from "react"
import { useRouter } from "next/router"
import { simulateEndpoint } from "@/services/mockup"

const NewPage = () => {
    const [createProducerForm] = Form.useForm<ProducerFormValues>()
    const [buttonLoading, setButtonLoading] = useState(false)
    const router = useRouter();

    const sendForm = () => {
        setButtonLoading(true)

        simulateEndpoint().then(a => {
            setButtonLoading(false)

            Modal.success({
                content: 'Produtor criado com sucesso!',
                centered: true,
                afterClose: () => router.push('/')
            });
        })
    }

    return <>
        <Head><title>Criar produtor</title></Head>

        <Layout>
            <Header title="Criar produtor" />

            <PageContainer>
                <Row>
                    <Col offset={6} span={12}>
                        <ProducerForm
                            form={createProducerForm}
                            sendForm={sendForm} />
                    </Col>
                </Row>
                <Row justify="center">
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => createProducerForm.submit()}
                            loading={buttonLoading}
                        >
                            Salvar
                        </Button>
                    </Col>
                </Row>
            </PageContainer>
        </Layout>
    </>
}

export default NewPage