import { Button, Col, Form, Layout, Modal, Row } from "antd"
import ProducerForm from "@/components/producerForm"
import Head from "next/head"
import Header from "@/components/header"
import PageContainer from "@/components/pageContainer"
import { ProducerFormValues } from "@/interfaces/components/producerForm"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ProducersService from "@/services/producersService"

// Tela de edição de produtores
const EditPage = () => {
    const [editProducerForm] = Form.useForm<ProducerFormValues>()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [producerId, setProducerId] = useState("")
    const router = useRouter();

    // Função para enviar o formulário para o backend
    const submitForm = () => {
        setButtonLoading(true)
        ProducersService.UpdateProducerById(producerId, editProducerForm.getFieldsValue())
            .then(_ => {
                setButtonLoading(false)

                Modal.success({
                    content: "Dados atualizados com sucesso!",
                    centered: true,
                    afterClose: () => router.push("/")
                });
            })
            .catch(_ => {
                setButtonLoading(false)

                Modal.error({
                    content: "Houve um erro ao atualizar os dados deste produtor. Por favor, tente novamente!",
                    centered: true
                });
            })
    }

    const getProducerById = (id: string) => {
        // O ideal seria ter um loading até o carregamento das informações
        setProducerId(id)

        ProducersService.GetProducerById(String(id))
            .then(result => editProducerForm.setFieldsValue(result))
            .catch((error: Error) => {
                const content = error.message === "Not Found" ? "Produtor não encontrado" : "Houve um problema para encontrar este produtor!"

                Modal.error({
                    content,
                    centered: true,
                    afterClose: () => router.push("/")
                });
            })
    }

    useEffect(() => {
        if (!router.query.id) return

        getProducerById(String(router.query.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.id])

    return <Layout>
        <Head><title>Editar produtor</title></Head>

        <Header title="Editar produtor" />

        <PageContainer>
            <Row>
                <Col offset={6} span={12}>
                    <ProducerForm
                        form={editProducerForm}
                        submitForm={submitForm} />
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <Button
                        type="primary"
                        onClick={() => editProducerForm.submit()}
                        loading={buttonLoading}
                    >
                        Salvar
                    </Button>
                </Col>
            </Row>
        </PageContainer>
    </Layout>
}

export default EditPage