import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AutoAwesomeIcon } from '../utils/Icons';
import { Context } from '../context/Context';
import { Comment } from "react-loader-spinner"

export default function BasicPopover() {
    const { GetOptimisedCode, optimiseText, preLoader, setPreLoader } = React.useContext(Context);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        GetOptimisedCode();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="outlined" className='font-semibold flex items-center capitalize text-[16px]' onClick={handleClick}>
                <span className='font-semibold flex items-center capitalize text-[16px]'> <span><AutoAwesomeIcon /> <span className='ml-1'>Optimisation <span className=' lowercase'>tips with</span> AI</span> </span> </span>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: {
                        maxHeight: '60vh',
                        maxWidth: '50vw',
                        overflowY: 'auto',
                    },
                }}
            >
                <Typography sx={{ p: 2 }}>
                    {
                        preLoader ? (<Comment
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="comment-loading"
                            wrapperStyle={{}}
                            wrapperClass="comment-wrapper"
                            color="#fff"
                            backgroundColor="#F4442E"
                        />) : optimiseText
                    }
                </Typography>
            </Popover>

        </div>
    );
}
