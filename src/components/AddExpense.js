import {useState, useEffect} from 'react'

import {Fab} from '@mui/material'
import { Icon } from '@mui/material'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import HandymanIcon from '@mui/icons-material/Handyman';
import TapasIcon from '@mui/icons-material/Tapas';
import HealingIcon from '@mui/icons-material/Healing';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import GamesIcon from '@mui/icons-material/Games';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';


/*
 * small react projects
 * github: intergoose
*/

const AddExpense = ({addExpense, controlEdit, controlTitle, controlAmount, controlType, controlId, controlCategory, controlNotes, controlIcon, controlShowAddDialog, deleteExpense}) => {

    const [formError, setFormError] = useState(false)
    const [formErrorAm, setFormErrorAm] = useState(false)

    const closeAddDialog = () => {
        controlTitle('clear')
        controlAmount('clear')
        controlId('clear')
        controlCategory('clear')
        controlIcon('clear')
        controlNotes('clear')
        setFormError(false)
        setFormErrorAm(false)
        controlType('clear')
        controlShowAddDialog('clear')
    }
    

    const expenseTypes = [
        {
            id: 1,
            label: 'In',
            value: true
        },
        {
            id: 2,
            label: 'Out',
            value: false
        }
    ]

    const expenseCategory = [
        {
            id: 74,
            label: '',
            value: 74
        },
        {
            id: 1,
            label: 'Activities',
            value: 1
        },
        {
            id: 2,
            label: 'Books',
            value: 2
        },
        {
            id: 3,
            label: 'Celebrations (e.g. Wedding)',
            value: 3
        },
        {
            id: 4,
            label: 'Consumer Electrics',
            value: 4
        },
        {
            id: 5,
            label: 'Cultural Items (e.g. Art)',
            value: 5
        },
        {
            id: 6,
            label: 'Donations',
            value: 6
        },
        {
            id: 7,
            label: 'Entertainment',
            value: 7
        },
        {
            id: 8,
            label: 'Events (e.g. Concert)',
            value: 8
        },
        {
            id: 9,
            label: 'Home Decor',
            value: 9
        },
        {
            id: 23,
            label: 'Health insurance',
            value: 23,
            icon: <Avatar style={{backgroundColor: '#e3f3ef', color: '#8cccbc'}} ><UmbrellaIcon /></Avatar>
        },
        {
            id: 24,
            label: 'Insurance',
            value: 24,
            icon: <Avatar style={{backgroundColor: '#e3f3ef', color: '#2c5c4f'}} ><UmbrellaIcon /></Avatar>
            

        },
        {
            id: 10,
            label: 'Leisure Equipment',
            value: 10
        },
        {
            id: 11,
            label: 'Luxury Products',
            value: 11
        },
        {
            id: 12,
            label: 'Luxury Services',
            value: 12
        },
        {
            id: 13,
            label: 'Magazines & Newspapers',
            value: 13
        },
        {
            id: 14,
            label: 'Memberships',
            value: 14
        },
        {
            id: 15,
            label: 'Pet Supplies & Services',
            value: 15
        },
        {
            id: 16,
            label: 'Private Lessons & Tutoring',
            value: 16
        },
        {
            id: 25,
            label: 'Shopping',
            value: 25
        },
        {
            id: 17,
            label: 'Sporting Equipment',
            value: 17
        },
        {
            id: 18,
            label: 'Steaming Media',
            value: 18
        },
        {
            id: 26,
            label: 'Subscriptions',
            value: 26
        },
        {
            id: 20,
            label: 'Toys',
            value: 20
        },
        {
            id: 21,
            label: 'Vacations',
            value: 21
        },
        {
            id: 22,
            label: 'Video Games',
            value: 22,
            icon: <Avatar style={{backgroundColor: '#d5d4eb', color: '#b93135'}} ><GamesIcon /></Avatar>
        },
        {
            id: 28,
            label: 'Administration Fees',
            value: 28
        },
        {
            id: 27,
            label: 'Benefit Payments',
            value: 27
        },
        {
            id: 29,
            label: 'Child Care',
            value: 29
        },
        {
            id: 30,
            label: 'Child Support & Alimony',
            value: 30
        },
        {
            id: 31,
            label: 'Cleaning Supplies',
            value: 31
        },
        {
            id: 32,
            label: 'Clothing',
            value: 32
        },
        {
            id: 33,
            label: 'Communication Fees',
            value: 33
        },
        {
            id: 34,
            label: 'Credit Card Fees',
            value: 34
        },
        {
            id: 35,
            label: 'Dental',
            value: 35
        },
        {
            id: 36,
            label: 'Education Materials',
            value: 36
        },
        {
            id: 37,
            label: 'Emergency Preparedness',
            value: 37
        },
        {
            id: 38,
            label: 'Energy & Fuel',
            value: 38
        },
        {
            id: 39,
            label: 'Eye Care',
            value: 39
        },
        {
            id: 40,
            label: 'Food',
            value: 40,
            icon: <Avatar style={{color: '#90d3be', backgroundColor: '#e8fdf7'}} ><DinnerDiningIcon /></Avatar>
        },
        {
            id: 41,
            label: 'Furniture & Bedding',
            value: 41
        },
        {
            id: 42,
            label: 'Garbage Disposable',
            value: 42
        },
        {
            id: 43,
            label: 'Gifts',
            value: 43
        },
        {
            id: 44,
            label: 'Hair Care',
            value: 44
        },
        {
            id: 45,
            label: 'Healthcare',
            value: 45,
            icon: <Avatar style={{backgroundColor: '#e3f3ef', color: '#8cccbc'}} ><HealingIcon /></Avatar>
        },
        {
            id: 46,
            label: 'Home Appliances',
            value: 46
        },
        {
            id: 47,
            label: 'Household Consumables',
            value: 47,
            icon: "<Avatar style={{color: '#76737c', backgroundColor: '#d0bc8f'}} ><HandymanIcon /></Avatar>"
        },
        {
            id: 48,
            label: 'Interest Fees',
            value: 48
        },
        {
            id: 49,
            label: 'Internet',
            value: 49
        },
        {
            id: 50,
            label: 'Job-related Expenses',
            value: 50
        },
        {
            id: 51,
            label: 'Legal Fees',
            value: 51
        },
        {
            id: 52,
            label: 'Maintenance',
            value: 52
        },
        {
            id: 53,
            label: 'Medical Devices',
            value: 53
        },
        {
            id: 54,
            label: 'Medication',
            value: 54
        },
        {
            id: 55,
            label: 'Mobile Devices',
            value: 55
        },
        {
            id: 56,
            label: 'Parking',
            value: 56
        },
        {
            id: 57,
            label: 'Pension Contributions',
            value: 57
        },
        {
            id: 58,
            label: 'Personal Supplies',
            value: 58
        },
        {
            id: 59,
            label: 'Professional Dues',
            value: 59
        },
        {
            id: 60,
            label: 'Registration Fees',
            value: 60
        },
        {
            id: 61,
            label: 'Rent',
            value: 61
        },
        {
            id: 62,
            label: 'Repair',
            value: 62
        },
        {
            id: 63,
            label: 'Senior Care',
            value: 63
        },
        {
            id: 64,
            label: 'Shoes',
            value: 64
        },
        {
            id: 65,
            label: 'Snacks & Beverages',
            value: 65,
            icon: <Avatar ><TapasIcon /></Avatar>
        },
        {
            id: 66,
            label: 'Taxes',
            value: 66
        },
        {
            id: 67,
            label: 'Toiletries',
            value: 67
        },
        {
            id: 68,
            label: 'Transportation Fees',
            value: 68
        },
        {
            id: 69,
            label: 'Tuition',
            value: 69
        },
        {
            id: 70,
            label: 'Uniforms',
            value: 70
        },
        {
            id: 71,
            label: 'Utilities',
            value: 71
        },
        {
            id: 72,
            label: 'Vehicle Lease',
            value: 72
        },
        {
            id: 73,
            label: 'Other',
            value: 73
        },
    ]

    const onSubmit = () => {
        if (controlTitle() === '') {
            setFormError(true)
            return
        }
        try {
            if (isNaN(parseFloat(controlAmount())) || controlAmount() <= 0) {
                setFormErrorAm(true)
                return
            }

        } catch(e) {
            setFormErrorAm(true)
            return
        }
        
        if (controlEdit()) {
            addExpense({
                expenseTitle: controlTitle(),
                expenseAmount: controlAmount(),
                expenseType: controlType(),
                expenseCategory: controlCategory(),
                expenseIcon: controlIcon(),
                expenseNotes: controlNotes(),
                id: controlId()
            }, true)
        } else {
            addExpense({
                expenseTitle: controlTitle(),
                expenseAmount: controlAmount(),
                expenseType: controlType(),
                expenseCategory: controlCategory(),
                expenseIcon: controlIcon(),
                expenseNotes: controlNotes(),
            })
        }
        closeAddDialog()

    }

    
    return (
        <div>
            <Fab
            id="addButton"
            style={{
              position: 'fixed',
              bottom: '15px',
              right: '15px',
              zIndex: '10000',
            }}
            color="primary" aria-label="add" onClick={()=>controlShowAddDialog(true)}>
                <Icon>add</Icon>
            </Fab>

            <Dialog open={controlShowAddDialog()} onClose={()=>closeAddDialog(true)}>
                <form>
                    <DialogTitle>Add expense</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        To add expense, please fill the form
                        </DialogContentText>
                        {formError ? 
                            <TextField fullWidth required error   label="Title" variant="outlined" margin='normal'  value={controlTitle()} onChange={(e) => e.target.value === ''?controlTitle('clear'): controlTitle(e.target.value)} />
                            : <TextField fullWidth required   label="Title" variant="outlined" margin='normal'  value={controlTitle()} onChange={(e) => e.target.value === ''?controlTitle('clear'): controlTitle(e.target.value)} />
                        }

                        {formErrorAm ? 
                            <TextField fullWidth required error inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  label="Amount" variant="outlined" margin='normal'  value={controlAmount()} onChange={(e) => e.target.value === ''?controlAmount('clear'): controlAmount(e.target.value)} />
                            : <TextField fullWidth required inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  label="Amount" variant="outlined" margin='normal'  value={controlAmount()} onChange={(e) => e.target.value === ''?controlAmount('clear'): controlAmount(e.target.value)} />
                        }

                        <Autocomplete
                            margin='normal'
                            disablePortal
                            id="combo-box-demo"
                            options={expenseCategory}
                            fullWidth
                            value={controlCategory()}
                            isOptionEqualToValue = {(option, value) => {
                                return option.label===value
                            }}
                            onChange={(e) => {
                                if (e.target.dataset.label === '') {
                                    controlCategory('clear')
                                    controlIcon('clear')
                                }else {
                                    controlCategory(e.target.dataset.label)
                                    controlIcon(e.target.dataset.icon)
                                }
                            }}
                            renderOption={(props, option) => {
                                return <Box component="li" {...props} data-label={option.label} data-icon={option.id} >{option.label}</Box>
                            }}
                            renderInput={(params) => {
                                return <TextField label="Category" {...params}
                                        onChange={(e) => {
                                                if (e.target.value === '') {
                                                    controlCategory('clear')
                                                    controlIcon('clear')
                                                }else {
                                                    controlCategory(e.target.value)
                                                    controlIcon('0')
                                                }
                                            }
                                        } />
                                }
                            }
                        />
                            
                        
                        <TextField
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Type"
                            margin='normal'
                            value={controlType()}
                            onChange={(e) => controlType(e.target.value)}
                            >
                                {expenseTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                        </TextField>
                        <TextField
                            style={{width:'100%'}}
                            label="Notes"
                            multiline
                            rows={2}
                            value={controlNotes()}
                            onChange={(e) => e.target.value === ''?controlNotes('clear'): controlNotes(e.target.value)}
                            />
                     
                        
                    </DialogContent>
                    <DialogActions>
                        <div style={{textAlign:'left', width:'100%'}}>
                            <Button color="error"
                                onClick={()=>{
                                closeAddDialog()
                                deleteExpense(controlId())
                            }}>Delete</Button>
                        </div>
                        <Button onClick={closeAddDialog}>Cancel</Button>
                        <Button onClick={onSubmit}>Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
        
    )
}

export default AddExpense
