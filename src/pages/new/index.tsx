import { Button, Col, Form, Layout, Modal, Row } from 'antd'
import ProducerForm from '@/components/producerForm'
import Head from 'next/head'
import Header from '@/components/header'
import PageContainer from '@/components/pageContainer'
import { ProducerFormValues } from '@/interfaces/components/producerForm'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ProducersService from '@/services/producersService'

// Página de criação de novo produtor
const NewPage = () => {
  const [createProducerForm] = Form.useForm<ProducerFormValues>()
  const [buttonLoading, setButtonLoading] = useState(false)
  const router = useRouter();

  const submitForm = () => {
    setButtonLoading(true)

    ProducersService.CreateNewProducer(createProducerForm.getFieldsValue()).then(_ => {
      setButtonLoading(false)

      Modal.success({
        content: 'Produtor criado com sucesso!',
        centered: true,
        afterClose: () => router.push('/')
      });
    })
      .catch(_ => {
        setButtonLoading(false)

        Modal.error({
          content: 'Houve um erro ao criar este produtor. Por favor, tente novamente!',
          centered: true
        });
      })
  }

  return <Layout>
    <Head><title>Criar produtor</title></Head>

    <Header title="Criar produtor" />

    <PageContainer>
      <Row>
        <Col offset={6} span={12}>
          <ProducerForm
            form={createProducerForm}
            submitForm={submitForm} />
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
}

export default NewPage