import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';
import { RiWechatChannelsLine } from "react-icons/ri";
import ThemeChanger from '../screens/widgets/ThemeChanger';


export default function Layout({ children }) {
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1000) {
                setOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='flex place-items-center flex-col w-full h-screen'>
            <div className='absolute top-0 left-0 m-5'>
                <ThemeChanger />
            </div>
            <div className="flex-1 flex justify-between w-full mt-10">
                <button
                    className={`"btn btn-square inline-flex lg:hidden transition-all duration-100"`}
                    onClick={() => setOpen(!open)}
                >
                    {open ? <HiOutlineXMark /> : <IoMenu />}
                </button>
            </div>

            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-72 bg-base-100 shadow-lg transform transition-transform duration-300 z-20
                                ${open ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
            >
                <div className="flex flex-row gap-4 p-10 h-full justify-between w-full">
                    <div className='flex flex-col gap-5'>
                        <Link data-tip="Panel de control" to="/dashboard">
                            <RxDashboard />
                        </Link>
                        <Link data-tip="Chat" to="/chat">
                            <RiWechatChannelsLine />
                        </Link>
                        <Link data-tip="Tips" to="/tips" className="btn btn-square">
                            <MdOutlineTipsAndUpdates />
                        </Link>
                    </div> 
                </div>

            </div>

            <div className="hidden lg:flex gap-4">
                <Link data-tip="Panel de control" to="/dashboard" className='transition-all duration-500 hover:-translate-y-3'>
                    <RxDashboard size={25}/>
                </Link>
                <Link data-tip="Chat" to="/chat" className='transition-all duration-500 hover:-translate-y-3'>
                    <RiWechatChannelsLine size={50} />
                </Link>
                <Link data-tip="Tips" to="/tips" className='transition-all duration-500 hover:-translate-y-3'>
                    <MdOutlineTipsAndUpdates size={25}/>
                </Link>
            </div>

            <div className='w-screen h-full overflow-y-auto scrollbar-hide'>
                {children}
            </div>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};
