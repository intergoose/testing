import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { useState, useEffect } from 'react'
import moment from 'moment'
import Header from './components/Header'
import AddExpense from './components/AddExpense'
import Footer from './components/Footer'
import About from './components/About'
import Stats from './components/Stats'
import Balance from './components/Balance'
import Nav from './components/Nav'
import History from './components/History'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

/*
 * small react projects
 * github: intergoose
*/

function App() {

  const [appName] = useState('Money tracker')
  const [expenses, setExpenses] = useState([
    {
      expenseTitle: "PS5",
      expenseAmount: "500",
      expenseType: false,
      expenseCategory: "Video Games",
      expenseIcon: "22",
      expenseNotes: "",
      id: 202,
      time: "28/1/2022"
    },
    {
      expenseTitle: "Primark",
      expenseAmount: "140",
      expenseType: false,
      expenseCategory: "Shopping",
      expenseIcon: "25",
      expenseNotes: "",
      id: 2095,
      time: "15/1/2022"
    },
    {
      expenseTitle: "House insurance",
      expenseAmount: "25",
      expenseType: false,
      expenseCategory: "Insurance",
      expenseIcon: "24",
      expenseNotes: "",
      id: 2096,
      time: "1/1/2022"
    },
    {
      expenseTitle: "Groceries",
      expenseAmount: "55",
      expenseType: false,
      expenseCategory: "Food",
      expenseIcon: "40",
      expenseNotes: "",
      id: 2097,
      time: "2/1/2022"
    },
    {
      expenseTitle: "Groceries",
      expenseAmount: "150",
      expenseType: false,
      expenseCategory: "Food",
      expenseIcon: "40",
      expenseNotes: "",
      id: 2098,
      time: "7/1/2022"
    },
    {
      expenseTitle: "Drinks",
      expenseAmount: "62",
      expenseType: false,
      expenseCategory: "Snacks & Beverages",
      expenseIcon: "65",
      expenseNotes: "",
      id: 2100,
      time: "5/1/2022"
    },
    {
      expenseTitle: "Groceries",
      expenseAmount: "55",
      expenseType: false,
      expenseCategory: "Food",
      expenseIcon: "40",
      expenseNotes: "",
      id: 865,
      time: "1/12/2021"
    },
    {
      expenseTitle: "Nigh out",
      expenseAmount: "86",
      expenseType: false,
      expenseCategory: "Snacks & Beverages",
      expenseIcon: "65",
      expenseNotes: "",
      id: 205,
      time: "8/11/2021 11:46"
    },
    {
      expenseTitle: "House tools",
      expenseAmount: "103",
      expenseType: false,
      expenseCategory: "Household Consumables",
      expenseIcon: "47",
      expenseNotes: "",
      id: 265,
      time: "9/10/2021 11:46"
    },
    {
      expenseTitle: "Health insurance",
      expenseAmount: "35",
      expenseType: false,
      expenseCategory: "Health insurance",
      expenseIcon: "23",
      expenseNotes: "",
      id: 100,
      time: "22/1/2022"
    },
    {
      expenseTitle: "House insurance",
      expenseAmount: "25",
      expenseType: false,
      expenseCategory: "Insurance",
      expenseIcon: "24",
      expenseNotes: "",
      id: 278,
      time: "1/2/2022 15:48"
    },
    {
      expenseTitle: "Groceries",
      expenseAmount: "55",
      expenseType: false,
      expenseCategory: "Food",
      expenseIcon: "40",
      expenseNotes: "",
      id: 280,
      time: "2/2/2022"
    },
    {
      expenseTitle: "Restaurant date",
      expenseAmount: "90",
      expenseType: false,
      expenseCategory: "Snacks & Beverages",
      expenseIcon: "65",
      expenseNotes: "",
      id: 281,
      time: "5/2/2022"
    },
    {
      expenseTitle: "Groceries",
      expenseAmount: "150",
      expenseType: false,
      expenseCategory: "Food",
      expenseIcon: "40",
      expenseNotes: "",
      id: 282,
      time: "7/2/2022"
    }
])
  const [snackBarStatus, setSnackBarStatus] = useState(false)
  const [feedbackMSG, setFeedbackMSG] = useState(<Alert />)

  const [expenseTitle, setExpenseTitle] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseType, setExpenseType] = useState(true)
  const [expenseId, setExpenseId] = useState('')
  const [expenseCategory, setExpenseCategory] = useState('')
  const [expenseIcon, setExpenseIcon] = useState('0')
  const [expenseNotes, setExpenseNotes] = useState('')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [edit, setEdit] = useState(false)

  const [selectedChip, setSelectedShip] = useState(0)

  useEffect(() => {
    // getExpenses()
    setExpenses(sortData(expenses))
  }, [])
  
  const getExpenses = async () => {
    const expensesFromServer = await fetchExpenses()
    setExpenses(sortData(expensesFromServer))
  }

  const sortData = (diti) => {
    let sortedData = []
    while (true) {
        let max = maxData(diti)
        sortedData.push(diti[max])
        diti.splice(max, 1)
        if(diti.length == 0)
            break
    }
    return sortedData
  }

  const maxData = (diti) => {
    let max = 0
    for (var i = 0; i < diti.length; i++) {
      let [d1, m1, y1] = diti[i].time.split(' ')[0].split('/')
      let [d2, m2, y2] = diti[max].time.split(' ')[0].split('/')
      d1 = parseInt(d1)
      m1 = parseInt(m1)
      y1 = parseInt(y1)
      d2 = parseInt(d2)
      m2 = parseInt(m2)
      y2 = parseInt(y2)      
      if (y1 > y2) {
          max = i
      } else if(y2 == y1) {
          if(m1 > m2) {
              max = i
          } else if(m2 == m1) {
              if(d1 > d2) {
                max = i
              }
          }
      }
    }
    return max
  }
  const fetchExpenses = async () => {
    return fetch('http://localhost:5001/expenses').then((response) => {
      if(!response.ok) {
        openSnackBar('Failed to fetch expenses list, try again later', false)
        setExpenses([])
        return false
      }
      return response.json()
    }).then((response) => {
      return response
    })
  }
  
  const updateExpense = (expense) => {
    controlEdit(true)
    controlTitle(expense.expenseTitle)
    controlAmount(expense.expenseAmount)
    controlCategory(expense.expenseCategory)
    controlNotes(expense.expenseNotes)
    controlIcon(expense.expenseIcon)
    controlType(expense.expenseType)
    controlId(expense.id)
    controlShowAddDialog(true)
  }
  
  
  const controlTitle = (v = false) => {
    if(v==='clear') {
      setExpenseTitle('')
      return true
    }
    if (v) {
      setExpenseTitle(v)
      return true
    }
    return expenseTitle
  }

  const controlAmount = (v = false) => {
    if(v==='clear') {
      setExpenseAmount('')
      return true
    }
    if (v) {
      setExpenseAmount(v)
      return true
    }
    return expenseAmount
  }

  const controlId = (v = false) => {
    if(v==='clear') {
      setExpenseId('')
      return true
    }
    if (v) {
      setExpenseId(v)
      return true
    }
    return expenseId
  }

  const controlType = (v = 'value') => {
    if(v=='value') {
      return expenseType
    }
    if(v=='clear') {
      setExpenseType(true)
      return true
    }
    if (v == false) {
      setExpenseType(false)
      return true
    }
    if (v == true) {
      setExpenseType(true)
      return true
    }
    return expenseType
  }

  const controlCategory = (v = false) => {
    if(v==='clear') {
      setExpenseCategory('')
      return true
    }
    if (v) {
      setExpenseCategory(v)
      return true
    }
    return expenseCategory
  }

  const controlNotes = (v = false) => {
    if(v==='clear') {
      setExpenseNotes('')
      return true
    }
    if (v) {
      setExpenseNotes(v)
      return true
    }
    return expenseNotes
  }

  const controlIcon = (v = false) => {
    if(v==='clear') {
      setExpenseIcon('')
      return true
    }
    if (v) {
      setExpenseIcon(v)
      return true
    }
    return expenseIcon
  }

  
  const controlShowAddDialog = (v = 'value') => {
    if(v=='value') {
      return showAddDialog
    }
    if(v=='clear') {
      setShowAddDialog(false)
      return true
    }
    if (v == false) {
      setShowAddDialog(false)
      return true
    }
    if (v == true) {
      setShowAddDialog(true)
      return true
    }
    return expenseType
  }

  const controlEdit = (v = 'value') => {
    if(v=='value') {
      return edit
    }
    if(v=='clear') {
      setEdit(false)
      return true
    }
    if (v == false) {
      setEdit(false)
      return true
    }
    if (v == true) {
      setEdit(true)
      return true
    }
    return edit
  }
  
  
  const addExpense = async (expense, update=false) => {
    let d = new Date()
    if(update) {
      controlEdit(false)
      let a = expenses.filter(e => e.id!=expense.id)
      expense.time = expenses.filter(e => e.id==expense.id)[0].time
      setExpenses(sortData([...a, expense]))
      openSnackBar('Sucess, expense registered', true)
      return
    }
    const id = Math.floor(Math.random() * 10000)+1
    expense['id'] = id
    expense.time = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    setExpenses(sortData([...expenses, expense]))
    openSnackBar('Sucess, expense registered', true)
    
    /*
     * Using an API
    */
    // let [url, method] = ['http://localhost:5001/expenses', 'POST']
    // let d = new Date() 
    // expense.time = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    // if (update) {
    //   [url, method] = [`http://localhost:5001/expenses/${expense.id}`, 'PUT']
    //   controlEdit(false)
    //   for (let i = 0; i < expenses.length; i++) {
    //     if (expenses[i].id === expense.id) {
    //       expense.time = expenses[i].time
    //       break
    //     }
    //   }
    // }
    // fetch(url, {
    //   method: method,
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(expense)
    // }).then((response) => {
    //   if(!response.ok) {
    //     openSnackBar('Failed, try again later', false)
    //     return
    //   }
    //   openSnackBar('Sucess, expense registered', true)openSnackBar('Sucess, expense registered', true)
    //   fetchExpenses().then((res) => setExpenses(sortData(res)))
      
    // })
  }

  const deleteExpense = (id) => {
    setExpenses([...expenses.filter(e => e.id!=id)])
    openSnackBar('Sucess, expense removed', true)
    /*
     * Using an API
    */
    // fetch(`http://localhost:5001/expenses/${id}`, {
    //   method: 'DELETE',
    // }).then((response) => {
    //   if(!response.ok) {
    //     openSnackBar('Failed to remove expense, try again later', false)
    //     return
    //   }
    //   openSnackBar('Sucess, expense removed', true)
    //   setExpenses(expenses.filter((e) => (e.id !== id)))
      
    // })
  }

  const openSnackBar = (msg, type) => {
    const severity = type ? "success": "error"
    const t = <Alert severity={severity} sx={{ width: '100%' }}>{msg}</Alert>
    setFeedbackMSG(t)
    setSnackBarStatus(true)
  }

  const closeSnackBar = () => {
    setSnackBarStatus(false)
  }

  const getUniqueDate = () => {
    let res = []
    let temp = ""
    try {
      res.push(expenses[0].time.split(' ')[0])
      temp = " " + expenses[0].time.split(' ')[0]
    }catch {}
    expenses.map((expense) => {
      let e =expense.time.split(' ')[0]
      if(temp.search(" "+e) == -1) {
        res.push(e)
        temp = temp+' '+e
      }
    })
    return res
  }

  const getUniqueMonth = () => {
    let res = []
    let temp = " "
    expenses.map((expense) => {
      let e =expense.time.split(' ')[0]
      let [d, m, y] = e.split('/')
      e = m+'/'+y
      if(temp.search(" "+e) === -1) {
        res.push(e)
        temp = temp+" "+e
      }
    })
    return res
  }

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={
        <div className="App" style={{maxWidth:'800px', margin:'10px auto 0 auto'}}>
          <Nav selectedChip={selectedChip} setSelectedShip={(a) => setSelectedShip(a)} />
          {selectedChip==0? <>
          <Balance expenses={expenses} getUniqueDate={getUniqueDate} getUniqueMonth={getUniqueMonth}/>
          <History key='1' expenses={expenses} deleteExpense={deleteExpense} updateExpense={updateExpense} getUniqueDate={getUniqueDate} />
          <AddExpense  addExpense={addExpense} controlEdit={controlEdit} controlTitle={controlTitle} controlAmount={controlAmount} controlType={controlType} controlId={controlId} controlCategory={controlCategory} controlNotes={controlNotes} controlIcon={controlIcon} controlShowAddDialog={controlShowAddDialog} deleteExpense={deleteExpense} />
          </>: <></>}
          {selectedChip==1?
          <>
            <Stats getUniqueDate={getUniqueDate} getUniqueMonth={getUniqueMonth} expenses={expenses} deleteExpense={deleteExpense} updateExpense={updateExpense}/>
            <AddExpense  addExpense={addExpense} controlEdit={controlEdit} controlTitle={controlTitle} controlAmount={controlAmount} controlType={controlType} controlId={controlId} controlCategory={controlCategory} controlNotes={controlNotes} controlIcon={controlIcon} controlShowAddDialog={controlShowAddDialog} deleteExpense={deleteExpense} />
          </>
          :<></>}
          <Snackbar
            open={snackBarStatus}
            autoHideDuration={6000}
            onClose={closeSnackBar}
          >
            {feedbackMSG}
          </Snackbar>
          <Footer />
          </div>
      }/>
      
        <Route path="/about" element={<About />} />
      </Routes>
      
    
    {/* {console.log(getChartData('pm'))} */}
    </Router>
    </>
  )
}

export default App;
