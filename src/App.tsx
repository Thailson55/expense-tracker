import { useEffect, useState } from 'react'
import * as C from './App.styles' 
import { Item } from './types/Item'
import { Category } from './types/Category'
import { items } from './data/items'
import { categories } from './data/categories'
import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter'
import TableArea from './components/TableArea'
import InfoArea from './components/InfoArea'
import InputArea from './components/InputArea'

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

  const handleAddItem = (item: Item) => {
    let newList = [...list]
    newList.push(item)
    setList(newList)
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

      <InputArea onAdd={handleAddItem} />

      <TableArea list={filteresList}/>

     </C.Body>
    </C.Container>
  )
}

export default App

