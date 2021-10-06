import { useEffect, useState } from 'react'
import * as C from './App.styles' 
import { Item } from './types/Item'
import { Category } from './types/Category'
import { items } from './data/items'
import { categories } from './data/categories'
import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter'
import TableArea from './components/TableArea'
import InfoArea from './components/InfoArea'

const App = () => {
  const [list, setList] = useState(items);
  const [filteresList, setFilteredList] = useState<Item[]>([])
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth);
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    for(let i in filteresList) {
      if(categories[filteresList[i].category].expense) {
        expense += filteresList[i].value;
      } else {
        income += filteresList[i].value;
      }
    }

    setIncome(income)
    setExpense(expense)

  }, [filteresList])

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth)
  }

  return (
    <C.Container>
     <C.Header>
       <C.HeaderText>
         Sistema Financeiro
       </C.HeaderText>
     </C.Header>
     <C.Body>

      <InfoArea 
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
        income={income}
        expense={expense}
        />

      {/* Área de inserção de informações */}

      <TableArea list={filteresList}/>

     </C.Body>
    </C.Container>
  )
}

export default App

