import { describe, expect, it } from '@jest/globals';
import { generateDashboardInfos } from '.';

const producerListMock = [{
  'id': '1',
  'cpfCnpj': '390.675.360-32',
  'producerName': 'Raul Caio Gomes',
  'farmName': 'Santo Paraíso',
  'city': 'São Lourenço da Mata',
  'state': 'Pernambuco',
  'totalHectare': '125',
  'arableHectare': '60',
  'vegetationHectare': '20',
  'plantedCrops': [
    'Café',
    'Milho'
  ]
},{
  'id': '2',
  'cpfCnpj': '390.675.360-32',
  'producerName': 'Raul Caio Gomes',
  'farmName': 'Santo Paraíso',
  'city': 'São Lourenço da Mata',
  'state': 'Pernambuco',
  'totalHectare': '125',
  'arableHectare': '60',
  'vegetationHectare': '20',
  'plantedCrops': [
    'Café',
    'Milho'
  ]
}]

const mockDashboard = {
  'totalFarm': 2,
  'totalHectare': '101.17',
  'farmPerState': [
    {
      'label': 'Pernambuco',
      'qtd': 2
    }
  ],
  'cropsQtd': [
    {
      'label': 'Café',
      'qtd': 2
    },
    {
      'label': 'Milho',
      'qtd': 2
    }
  ],
  'hectareUtilization': [
    {
      'label': 'Agricultável',
      'qtd': 120
    },
    {
      'label': 'Vegetação',
      'qtd': 40
    }
  ]
}

describe('generateDashboardInfos',()=>{
  it('should generate dashboard', () => {
    const dashboardTest = generateDashboardInfos(producerListMock)

    expect(JSON.stringify(dashboardTest)).toBe(JSON.stringify(mockDashboard));
  });
})