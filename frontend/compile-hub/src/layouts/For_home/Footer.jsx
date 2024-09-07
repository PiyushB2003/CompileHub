import React from 'react';
import { CallIcon, EmailIcon, GitHubIcon, HomeIcon, InstagramIcon, LinkedInIcon } from '../../utils/Icons';
import { NavLink } from 'react-router-dom';

export default function Footer() {

  const languages = [
    {
      name: "C++",
      redirect: "/compiler"
    },
    {
      name: "Java",
      redirect: "/compiler"
    },
    {
      name: "Python",
      redirect: "/compiler"
    },
    {
      name: "JavaScript",
      redirect: "/compiler"
    },
    {
      name: "C",
      redirect: "/compiler"
    }
  ];

  const linkNames = [
    {
      name: "Home",
      redirect: "/"
    },
    {
      name: "Compiler",
      redirect: "/compiler"
    },
    {
      name: "Login",
      redirect: "/login"
    },
    {
      name: "Signup",
      redirect: "/signup"
    }
  ];
  const ContactData = [
    {
      icon: <HomeIcon className='scale-110' />,
      text: "Nagpur, Maharashtra, India"
    },
    {
      icon: <EmailIcon />,
      text: "piyushborkar95@gmail.com"
    },
    {
      icon: <CallIcon />,
      text: "+ 91 9764-057-350"
    },
  ]
  const SocialHandles = [
    {
      icon: <LinkedInIcon />,
      redirect: "https://www.linkedin.com/in/piyushborkar/"
    },
    {
      icon: <GitHubIcon />,
      redirect: "https://github.com/PiyushB2003"
    },
    {
      icon: <InstagramIcon />,
      redirect: "https://www.instagram.com/_piyush_borkar_"
    },
  ]
  return (
    <footer
      className="bg-neutral-100 text-center mt-60 text-neutral-600 dark:bg-[#2B324D] dark:text-neutral-200 lg:text-left">
      <div
        className="flex items-center justify-center border-b-2 border-neutral-200 py-6 dark:border-neutral-500 lg:justify-between">
        <div className="hidden lg:block pl-24">
          <span>Get connected with us on social networks:</span>
        </div>
        {/* <!-- Social network icons container --> */}
        <div className="flex justify-center pr-24">
          {
            SocialHandles.map((obj, index) => {
              return (
                <a href={obj.redirect} target='_blank' className="mr-6 text-neutral-600 dark:text-neutral-200 hover:text-[#00cd9d] " key={index}>
                  <span>
                    {obj.icon}
                  </span>
                </a>
              )
            })
          }
        </div>
      </div>

      {/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
      <div className="py-10 text-center md:text-left">
        <div className="grid-1 px-24 grid gap-20 md:grid-cols-2 lg:grid-cols-4">
          {/* <!-- TW Elements section --> */}
          <div className="">
            <a
              href='/'
              className="mb-4 flex items-center justify-center font-semibold md:justify-start">
              <img src="/images/logo.png" alt="Logo" className='size-8' />
              <span className='text-xl font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span>
            </a>
            <p>
              Harness the power of our online compilers to write, run, and debug code instantly in multiple programming languages.
            </p>
          </div>
          {/* <!-- Products section --> */}
          <div>
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Compilers
            </h6>
            {
              languages.map((obj, index) => {
                return (
                  <p className="mb-4" key={index}>
                    <NavLink to={obj.redirect} className="text-neutral-600 cursor-pointer hover:text-[#00cd9d] transition duration-300  dark:text-neutral-200"
                    >{obj.name}</NavLink>
                  </p>
                )
              })
            }
          </div>
          {/* <!-- Useful links section --> */}
          <div className="">
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful links
            </h6>
            {
              linkNames.map((obj, index) => {
                return (
                  <p className="mb-4" key={index}>
                    <NavLink to={obj.redirect} className="text-neutral-600 transition duration-300 hover:text-[#00cd9d]  dark:text-neutral-200"
                    >{obj.name}</NavLink>
                  </p>
                )
              })
            }
          </div>
          {/* <!-- Contact section --> */}
          <div>
            <h6
              className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            {
              ContactData.map((obj, index) => {
                return (
                  <p className="mb-4 flex items-center justify-center md:justify-start" key={index}>
                    <span className='mr-3'>
                      {obj.icon}
                    </span>
                    {obj.text}
                  </p>
                )
              })
            }
          </div>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="bg-neutral-200 p-6 text-center dark:bg-[#202539]">
        <span>© {new Date().getFullYear()} Copyright: </span>
        <a
          className="font-semibold text-neutral-600 dark:text-neutral-400"
          href="/"
        > <span className='font-bold text-[#00cd9d]'>Compile<span className='text-[#757171]'>Hub</span></span></a>
      </div>
    </footer>
  );
}