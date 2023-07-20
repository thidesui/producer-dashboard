import { ProducerFormValuesWithId } from "@/interfaces/components/producerForm";

export const producersFormMock: ProducerFormValuesWithId[] = [{
    id: '1',
    cpfCnpj: "390.675.360-32",
    producerName: "Raul Caio Gomes",
    farmName: "Santo Paraíso",
    city: "São Lourenço da Mata",
    state: "Pernambuco",
    totalAcre: "125",
    arableAcre: "60",
    vegetationAcre: "20",
    plantedCrops: [
        "Café",
        "Milho"
    ]
}, {
    id: '2',
    cpfCnpj: "99.660.973/0001-14",
    producerName: "Clara Eduarda Aline Nunes",
    farmName: "Boa Terra",
    city: "Manaus",
    state: "Amazonas",
    totalAcre: "200",
    arableAcre: "40",
    vegetationAcre: "50",
    plantedCrops: [
        "Algodão"
    ]
}, {
    id: '3',
    cpfCnpj: "390.675.360-32",
    producerName: "Flávia Luciana Farias",
    farmName: "Costa do Sol",
    city: "Recife",
    state: "Pernambuco",
    totalAcre: "85",
    arableAcre: "30",
    vegetationAcre: "25",
    plantedCrops: [
        "Soja",
        "Cana de Açucar"
    ]
}, {
    id: '4',
    cpfCnpj: "57.159.190/0001-01",
    producerName: "Levi Lucca Osvaldo Barros",
    farmName: "Toca do Sabiá",
    city: "Maringá",
    state: "Paraná",
    totalAcre: "300",
    arableAcre: "200",
    vegetationAcre: "50",
    plantedCrops: [
        "Algodão",
        "Milho",
        "Café"
    ]
}]

export const simulateEndpoint = async (): Promise<boolean> => new Promise(resolve => { setTimeout(() => resolve(true), 1000) })

type Graph = { label: string, qtd: number }[]
export interface DashboardInfos {
    totalFarm: number;
    totalHectare: string;
    farmPerState: Graph;
    cropsQtd: Graph;
    acreUtilization: {
        label: string;
        qtd: number;
    }[];
}

export const generateDashboardInfos = (data: ProducerFormValuesWithId[]) => {
    let totalAcre = 0;
    let farmPerState: Graph = []
    let cropsQtd: Graph = []
    let acreUtilizationObj = { arableAcre: 0, vegetationAcre: 0 }

    data.map(farm => {
        totalAcre += Number(farm.totalAcre)

        const farmPerStateFound = farmPerState.find(graph => graph.label === farm.state)
        if (farmPerStateFound) farmPerStateFound.qtd++
        else farmPerState.push({ label: farm.state, qtd: 1 })

        for (const plantedCrops of farm.plantedCrops) {
            const cropsQtdFound = cropsQtd.find(graph => graph.label === plantedCrops)
            if (cropsQtdFound) cropsQtdFound.qtd++
            else cropsQtd.push({ label: plantedCrops, qtd: 1 })
        }

        acreUtilizationObj.arableAcre += Number(farm.arableAcre);
        acreUtilizationObj.vegetationAcre += Number(farm.vegetationAcre);
    })

    return {
        totalFarm: data.length,
        totalHectare: (totalAcre / 2.4711).toFixed(2),
        farmPerState,
        cropsQtd,
        acreUtilization: [
            { label: 'Agricultável', qtd: acreUtilizationObj.arableAcre },
            { label: 'Vegetação', qtd: acreUtilizationObj.vegetationAcre }
        ]
    }
}