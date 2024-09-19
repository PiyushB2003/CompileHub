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
import { MenuIcon } from '../utils/Icons';
import { NavLink } from 'react-router-dom';
import { Context } from '../context/Context';
import { Boilerplates } from '../utils/BoilerplateCode';



const LanguageData = [
    {
        language_name: "C++",
        language_code: "cpp",
        language_img_url: "/images/cpp_white.png",
        language_link: "/compiler"
    },
    {
        language_name: "Java",
        language_code: "java",
        language_img_url: "/images/java_white.png",
        language_link: "/compiler"
    },
    {
        language_name: "Python",
        language_code: "python",
        language_img_url: "/images/python_white.png",
        language_link: "/compiler"
    },
    {
        language_name: "JS",
        language_code: "javascript",
        language_img_url: "/images/js_white.png",
        language_link: "/compiler"
    },
    {
        language_name: "C",
        language_code: "c",
        language_img_url: "/images/c_white.png",
        language_link: "/compiler"
    }
]

export default function TemporaryDrawerCompiler() {
    const [open, setOpen] = React.useState(false);
    const { setCode, setLanguage } = React.useContext(Context);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <NavLink to="/" className='flex items-center'>
                        <div className='flex items-center pl-3'>
                            <img src="/images/logo.png" alt="Logo" className='size-8' />
                            <span className='text-xl font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span>
                        </div>
                    </NavLink>
                </ListItem>
            </List>
            <Divider />
            <List>
                {LanguageData.map((obj, index) => (
                    <NavLink key={index} to="/compiler" onClick={() => {
                        setLanguage(obj.language_code)
                        setCode(Boilerplates[obj.language_code])
                    }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <span className=" border border-zinc-300 dark:border-zinc-600 w-9 h-9 flex items-center justify-center">
                                        <img src={obj.language_img_url} alt={obj.language_name} className="w-6 h-6 object-contain grayscale-[100%] brightness-[60%]" />
                                    </span>
                                </ListItemIcon>
                                <ListItemText className='text-sm' primary={`${obj.language_name} Programming`} />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <MenuIcon className='text-black dark:text-white' />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <div className='dark:bg-[#28252E] h-full dark:text-white'>
                    {DrawerList}
                </div>
            </Drawer>
        </div>
    );
}
