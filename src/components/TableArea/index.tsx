import * as C from './styles'
import {Item} from '../../types/Item'
import TableItem from '../TableItem'

type Props = {
  list: Item[]
}

const TableArea = ({list}: Props) => {
  return (
    <C.Table>
      <thead>
        <tr>
          <C.TableheadColumn width={100}>Data</C.TableheadColumn>
          <C.TableheadColumn width={130}>Categoria</C.TableheadColumn>
          <C.TableheadColumn>Título</C.TableheadColumn>
          <C.TableheadColumn width={150}>Valor</C.TableheadColumn>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <TableItem key={index} item={item} />
        ))}
      </tbody>
    </C.Table>
  )
}

export default TableArea
