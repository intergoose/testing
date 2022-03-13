import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
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

const Expense = ({ reachedTheEnd, deleteExpense, updateExpense, expense}) => {

    const expenseIcons = [
        {
            id: 23,
            value: <Avatar style={{backgroundColor: '#e3f3ef', color: '#8cccbc'}} ><UmbrellaIcon /></Avatar>
        },
        {
            id: 24,
            value: <Avatar style={{backgroundColor: '#e3f3ef', color: '#2c5c4f'}} ><UmbrellaIcon /></Avatar>
            

        },
        {
            id: 22,
            value: <Avatar style={{backgroundColor: '#d5d4eb', color: '#b93135'}} ><GamesIcon /></Avatar>
        },
        {
            id: 40,
            value: <Avatar style={{color: '#90d3be', backgroundColor: '#e8fdf7'}} ><DinnerDiningIcon /></Avatar>
        },
        {
            id: 45,
            value: <Avatar style={{backgroundColor: '#e3f3ef', color: '#8cccbc'}} ><HealingIcon /></Avatar>
        },
        {
            id: 47,
            value: <Avatar style={{color: '#76737c', backgroundColor: '#d0bc8f'}} ><HandymanIcon /></Avatar>
        },
        {
            id: 65,
            value: <Avatar ><TapasIcon /></Avatar>
        },
    ]

    const getIcon = (id) => {
        let a = false
        expenseIcons.map((icon) => {
            if (icon.id ===parseInt(id))
                a = icon.value
            return true
        })
        if (a===false)
            return <Avatar ><PersonOutlineIcon /></Avatar>
        return a
    }

    // const [selectedIndex, setSelectedIndex] = React.useState(1);

    // const handleListItemClick = (event, index) => {
    //     setSelectedIndex(index);
    // };


    return (
        <>
            <ListItem key={expense.id}>
            <ListItemButton 
                    aria-label="update"
                    onClick={()=>updateExpense(expense)}>
                <ListItemAvatar>
                {getIcon(expense.expenseIcon)}

                </ListItemAvatar>
                <ListItemText key={expense.id} primary={<span style={{fontFamily: 'Dongle, sans-serif', fontSize:'x-large'}}>{expense.expenseTitle}</span>} secondary={<span style={{fontFamily: 'Dongle, sans-serif', fontSize:'x-large'}}>{expense.time}</span>} />
                <span style={{fontFamily: 'Dongle, sans-serif', fontSize:'x-large', color:'#304f6e'}}>
                    {expense.expenseType? "+ "+expense.expenseAmount : "- "+expense.expenseAmount}
                </span>
               
            </ListItemButton>
            </ListItem>
            {reachedTheEnd!=0&&<Divider component="li" />}
        </>
    )
}

export default Expense
