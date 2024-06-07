import { Bem } from "./Bem.model"
import { Local } from "./Local.model"

export interface Inventario {
  id?: number,
  nome: string,
  valorTotal: number,
  data: Date,
  dataUltimaEdicao: Date,
  local: Local,
  bens: Bem[]
}
