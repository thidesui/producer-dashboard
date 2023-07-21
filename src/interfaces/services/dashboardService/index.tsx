export type Graph = { label: string, qtd: number }[]

export interface DashboardInfos {
    totalFarm: number;
    totalHectare: string;
    farmPerState: Graph;
    cropsQtd: Graph;
    hectareUtilization: {
        label: string;
        qtd: number;
    }[];
}