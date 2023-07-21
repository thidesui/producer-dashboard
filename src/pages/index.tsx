import Header from '@/components/header'
import PageContainer from '@/components/pageContainer'
import ProducerList from '@/components/producerList'
import { ProducerWithId } from '@/interfaces/components/producerForm'
import { DashboardInfos } from '@/interfaces/services/dashboardService'
import { generateDashboardInfos } from '@/services/dashboardService'
import ProducersService from '@/services/producersService'
import { Card, Col, Divider, Layout, List, Modal, Row, Statistic } from 'antd'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

// Tela home/dashboard, contém lista dos produtores e gráficos
const Dashboard = () => {
  const [producerList, setProducerList] = useState<ProducerWithId[]>([])
  const [dashboardInfos, setDashboardInfos] = useState<DashboardInfos>()

  const getProducerList = () => {
    ProducersService.GetProducerList().then((producerList) => {
      setProducerList(producerList)
      setDashboardInfos(generateDashboardInfos(producerList))
    })
  }

  useEffect(() => { getProducerList() }, [])

  const deleteFarm = (id: string) => {
    ProducersService.DeleteProducerById(id).then(_ => {
      getProducerList()
    }).catch(_ => {
      Modal.error({
        content: 'Houve um erro ao excluir este produtor. Por favor, tente novamente!',
        centered: true
      });
    })
  }

  return <Layout>
    <Head><title>Dashboard</title></Head>

    <Header title="Dashboard" home />

    <PageContainer>
      <Row>
        <Col offset={2} span={20}>
          <ProducerList deleteFarm={deleteFarm} producerList={producerList} />
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col offset={2} span={20}>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={[
              { title: 'Total de fazendas em quantidade', value: dashboardInfos?.totalFarm },
              { title: 'Total de fazendas em hectares (área total)', value: dashboardInfos?.totalHectare }
            ]}
            renderItem={(item) => (
              < List.Item >
                <Card bordered={false}>
                  <Statistic title={item.title} value={item.value} />
                </Card>
              </List.Item>
            )}
          >
          </List>
        </Col>
      </Row>

      <Divider />


      <Row>
        <Col offset={2} span={20}>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={[
              { title: 'Fazendas por estado', value: dashboardInfos?.farmPerState },
              { title: 'Distribuição de cultura', value: dashboardInfos?.cropsQtd },
              { title: 'Uso do solo', value: dashboardInfos?.hectareUtilization }
            ]}
            renderItem={(item) => (
              <List.Item>
                <Card bordered={false}>
                  <Chart
                    chartType='PieChart'
                    width='100%'
                    height='300px'
                    options={{ title: item.title }}
                    data={[['Item', 'Value'], ...(item.value?.map(a => ([a.label, a.qtd])) || [])]}
                  />
                </Card>
              </List.Item>
            )}
          >
          </List>
        </Col>
      </Row>

    </PageContainer >
  </Layout >
}

export default Dashboard