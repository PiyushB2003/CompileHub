import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
    KeyboardArrowDownIcon,
    KeyboardArrowUpIcon,
    MenuIcon
} from '../utils/Icons';
import { NavLink } from 'react-router-dom';
import { Context } from '../context/Context';
import { Boilerplates } from '../utils/BoilerplateCode';
import CustomizedSwitches from './CustomizedSwitches';



const Languages = [
    {
        language_code: "cpp",
        language_name: "C++"
    },
    {
        language_code: "java",
        language_name: "Java"
    },
    {
        language_code: "python",
        language_name: "Python"
    },
    {
        language_code: "javascript",
        language_name: "JavaScript"
    },
    {
        language_code: "c",
        language_name: "C"
    },
];

export default function TemporaryDrawer() {
    const [open, setOpen] = React.useState(false);
    const [isClick, setIsClick] = React.useState(false);
    const { setCode, setLanguage, isDarkMode } = React.useContext(Context);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <NavLink to="/compiler">
                    <ListItem disablePadding className='hover:bg-zinc-200 dark:hover:bg-[#322e39] dark:text-white'>
                        <ListItemButton>
                            <ListItemText primary="Compiler" />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon className='text-black dark:text-white' />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <div className='flex flex-col justify-between h-full dark:bg-[#28252E]'>
                    <div>
                        {DrawerList}
                        <List>
                            <span onClick={() => {
                                setIsClick(prev => !prev)
                            }}>
                                <ListItem disablePadding className='hover:bg-zinc-200 dark:hover:bg-[#322e39] dark:text-white'>
                                    <ListItemButton>
                                        <ListItemText primary="Languages" />
                                        {
                                            isClick ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                                        }
                                    </ListItemButton>
                                </ListItem>
                            </span>
                            {
                                isClick && (
                                    Languages.map((obj, index) => (
                                        <NavLink to="/compiler" className="dark:text-white" key={index} onClick={() => {
                                            setLanguage(obj.language_code)
                                            setCode(Boilerplates[obj.language_code])
                                        }}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary={obj.language_name} />
                                                </ListItemButton>
                                            </ListItem>
                                        </NavLink>
                                    ))
                                )
                            }
                        </List>
                    </div>
                    <div className='w-full flex items-center justify-between bg-zinc-300 dark:bg-[#322e39] dark:text-white py-5'>
                        <span className='text-lg pl-5'>
                            {
                                isDarkMode ? "Dark Theme" : "Light Theme"
                            }
                        </span>
                        <span>
                            <CustomizedSwitches />
                        </span>
                    </div>

                </div>
            </Drawer>
        </div>
    );
}
