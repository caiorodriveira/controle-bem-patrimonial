import { Bem } from "./Bem.model"

export interface Manutencao {
  id?: number,
  motivo: string,
  valor: number,
  bem: Bem,
  estado: string,
  data: Date,
  notaFiscal: string
}
