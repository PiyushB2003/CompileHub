import * as React from 'react';
import Markdown from "react-markdown";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AutoAwesomeIcon } from '../utils/Icons';
import { Context } from '../context/Context';
import { Comment } from "react-loader-spinner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Icon for copy button

// Function to extract code and text blocks
const ExtractCodeFromString = (message) => {
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(message)) !== null) {
        if (match.index > lastIndex) {
            result.push({
                type: 'text',
                content: message.slice(lastIndex, match.index)
            });
        }

        result.push({
            type: 'code',
            language: match[1] || 'javascript',
            content: match[2]
        });

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < message.length) {
        result.push({
            type: 'text',
            content: message.slice(lastIndex)
        });
    }

    return result;
};

export default function BasicPopover() {
    const { GetOptimisedCode, optimiseText, preLoader, isDarkMode } = React.useContext(Context);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [copySuccess, setCopySuccess] = React.useState(null); // Track the copied status

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        GetOptimisedCode();
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCopySuccess(null); // Reset copy status when closing popover
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const contentBlocks = ExtractCodeFromString(optimiseText);

    const handleCopyCode = async (code, index) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopySuccess(index); // Set which code block was copied
            setTimeout(() => setCopySuccess(null), 2000); // Reset after 2 seconds
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };

    return (
        <div className='pr-5'>
            <Button aria-describedby={id} variant="outlined" className='font-semibold flex items-center capitalize md:text-[16px]' onClick={handleClick}>
                <span className='font-semibold flex items-center capitalize text-xs md:text-[16px]'>
                    <AutoAwesomeIcon />
                    <span className='ml-1'>Optimisation <span className=' lowercase'>tips with</span> AI</span>
                </span>
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{
                    style: {
                        maxHeight: '60vh',
                        maxWidth: window.innerWidth < 400 ? '90vw' : window.innerWidth < 640 ? '70vw' : '50vw',
                        overflowY: 'auto',
                        backgroundColor: isDarkMode ? "#28252E" : "#ffffff",
                        color: "white"
                    },
                }}
            >
                <Typography sx={{ p: 2 }}>
                    {
                        preLoader ? (
                            <Comment
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="comment-loading"
                                wrapperStyle={{}}
                                wrapperClass="comment-wrapper"
                                color="#fff"
                                backgroundColor="#F4442E"
                            />
                        ) : (
                            <div>
                                {contentBlocks.map((block, index) => (
                                    <React.Fragment key={index}>
                                        {block.type === 'text' ? (
                                            <Markdown className="result break-words">
                                                {block.content}
                                            </Markdown>
                                        ) : (
                                            <div className="overflow-x-auto w-full relative">
                                                {/* Syntax Highlighter for code blocks */}
                                                <SyntaxHighlighter
                                                    className="break-words rounded-xl"
                                                    style={dracula}
                                                    language={block.language}
                                                >
                                                    {block.content}
                                                </SyntaxHighlighter>

                                                {/* Copy button at the top-right corner */}
                                                <Button
                                                    className="absolute top-2 right-2 bg-white flex items-center justify-center flex-row hover:bg-gray-200 text-black"
                                                    size="small"
                                                    onClick={() => handleCopyCode(block.content, index)}
                                                    startIcon={<ContentCopyIcon />}
                                                    sx={{
                                                        zIndex: 10,
                                                        padding: '4px 8px',
                                                        fontSize: '12px',
                                                    }}
                                                >
                                                    {copySuccess === index ? <span className="capitalize">Copied!</span> : <span className="capitalize">Copy</span>}
                                                </Button>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        )
                    }
                </Typography>
            </Popover>
        </div>
    );
}
