import { Local } from "./Local.model"

export interface Bem {
  id?: number,
  codigo: string,
  descricao: string,
  valorInicial: number,
  valorAtual: number,
  local: Local
  estadoBem: string,
  alugado: boolean,
  valorAluguel: number
}
