import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Expense from './Expense';

/*
 * small react projects
 * github: intergoose
*/

const History = ({updateExpense, deleteExpense, expenses, getUniqueDate, specificMonth=false}) => {

  
    const getImprovedDate = (uniqueDate) => {
        let poppedDate = uniqueDate.split(' ')[0]
        let d = new Date()
        let today = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
        if(today === poppedDate)
            return 'Today'
        let [poppedDay, poppedMonth, poppedYear] = poppedDate.split('/')
        let [poppedDay1, poppedMonth1, poppedYear1] = today.split('/')
        if(poppedMonth === poppedMonth1 && poppedYear===poppedYear1) {
            if (parseInt(poppedDay1) === parseInt(poppedDay) + 1)
                return 'Yesterday'
        }
        return poppedDate
    }
    const lastOneIndex = (m, exps) => {
        if(exps.length==0)
          return 0
        let res = exps.reduce((pv, cv, i) => {
            let j = -1
            if(i == 1) {
              if(pv.time.split(' ')[0].search('/'+m) != -1) {
                j = 0
              }
            }
            if(cv.time.split(' ')[0].search('/'+m) != -1) {
              j = i
            }
            
            return j==-1 ? pv: j
        })
        if(typeof res == 'number')
          return res
        return 0
      }
    
    return (
        <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
                >
                {specificMonth != false ?
                    <li key={`section-${specificMonth}`}>
                        <ul style={{listStyleType: 'none', padding:'0'}}>
                            <ListSubheader>{specificMonth}</ListSubheader>
                            {expenses.map((expense, index) => 
                                expense.time.split(' ')[0].search('/'+specificMonth) != -1 &&
                                <Expense reachedTheEnd={lastOneIndex(specificMonth, expenses)-index} key={expense.id} expense={expense} deleteExpense={deleteExpense} updateExpense={updateExpense} />
                            )}
                        </ul>
                    </li>
                 :
                
                    getUniqueDate().map((uniqueDate) => {
                       return <li key={`section-${uniqueDate}`}>
                                <ul style={{listStyleType: 'none', padding:'0'}}>
                                    <ListSubheader>{getImprovedDate(uniqueDate)}</ListSubheader>
                                    {expenses.map((expense, index) => 
                                        expense.time.split(' ')[0] === uniqueDate &&
                                        <Expense reachedTheEnd={expenses.length-index-1} key={expense.id} expense={expense} deleteExpense={deleteExpense} updateExpense={updateExpense} />
                                    )}
                                </ul>
                            </li>
                    })
                }
            </List>
    )
}

export default History
