import { ProducerWithId } from '@/interfaces/components/producerForm';
import { DashboardInfos, Graph } from '@/interfaces/services/dashboardService';

// Este código deveria ser server-side
export const generateDashboardInfos = (data: ProducerWithId[]): DashboardInfos => {
  let totalHectare = 0;
  let farmPerState: Graph = []
  let cropsQtd: Graph = []
  let hectareUtilizationObj = { arableHectare: 0, vegetationHectare: 0 }

  data.map(farm => {
    totalHectare += Number(farm.totalHectare)

    const farmPerStateFound = farmPerState.find(graph => graph.label === farm.state)
    if (farmPerStateFound) farmPerStateFound.qtd++
    else farmPerState.push({ label: farm.state, qtd: 1 })

    for (const plantedCrops of farm.plantedCrops) {
      const cropsQtdFound = cropsQtd.find(graph => graph.label === plantedCrops)
      if (cropsQtdFound) cropsQtdFound.qtd++
      else cropsQtd.push({ label: plantedCrops, qtd: 1 })
    }

    hectareUtilizationObj.arableHectare += Number(farm.arableHectare);
    hectareUtilizationObj.vegetationHectare += Number(farm.vegetationHectare);
  })

  return {
    totalFarm: data.length,
    totalHectare: (totalHectare / 2.4711).toFixed(2),
    farmPerState,
    cropsQtd,
    hectareUtilization: [
      { label: 'Agricultável', qtd: hectareUtilizationObj.arableHectare },
      { label: 'Vegetação', qtd: hectareUtilizationObj.vegetationHectare }
    ]
  }
}