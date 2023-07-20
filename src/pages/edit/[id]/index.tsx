import { Button, Col, Form, Layout, Modal, Row } from "antd"
import ProducerForm from "@/components/producerForm"
import Head from "next/head"
import Header from "@/components/header"
import PageContainer from "@/components/pageContainer"
import { ProducerFormValues } from "@/interfaces/components/producerForm"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { producersFormMock, simulateEndpoint } from "@/services/mockup"

const EditPage = () => {
    const [createProducerForm] = Form.useForm<ProducerFormValues>()
    const [buttonLoading, setButtonLoading] = useState(false)
    const router = useRouter();

    const sendForm = () => {
        setButtonLoading(true)

        simulateEndpoint().then(_ => {
            setButtonLoading(false)

            Modal.success({
                content: 'Dados atualizados com sucesso!',
                centered: true,
                afterClose: () => router.push('/')
            });
        })
    }

    useEffect(() => {
        if (!router.query.id) return

        const producerFound = producersFormMock.find(producer => producer.id === router.query.id)

        if (producerFound) createProducerForm.setFieldsValue(producerFound)
        else router.push('/')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.id])

    return <>
        <Head><title>Editar produtor</title></Head>

        <Layout>
            <Header title="Editar produtor" />

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

export default EditPage