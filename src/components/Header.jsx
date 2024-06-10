import React from 'react'
import { Link } from 'react-router-dom'
import Bugs_icon from '../assets/img/icon-bugs.jpg'
import Melon_icon from '../assets/img/icon-melon.jpg'
import Apple_icon from '../assets/img/icon-apple.jpg'
import Bill_icon from '../assets/img/icon-bill.jpg'
import Genie_icon from '../assets/img/icon-genie.jpg'
import { IoMusicalNotes } from "react-icons/io5";


const Header = () => {
    return (
        <header id='header' role='banner'>
            <h1 className='logo'>
                <Link to='/'><IoMusicalNotes />PlayList</Link>
            </h1>
            <h2>Chart</h2>
            <ul>
                <li><Link to='/MelonPage'><img src={Melon_icon} alt="" />멜론 차트</Link></li>
                <li><Link to='/BugsPage'><img src={Bugs_icon} alt="" />벅스 차트</Link></li>
                <li><Link to='/ApplePage'><img src={Apple_icon} alt="" />애플 차트</Link></li>
                <li><Link to='/BillPage'><img src={Bill_icon} alt="" />빌보드 차트</Link></li>
                <li><Link to='/GeniePage'><img src={Genie_icon} alt="" />지니 차트</Link></li>
            </ul>
            <h2>Playlist</h2>
            <ul>
                <li><Link to='/Recent'>Recent</Link></li>
                <li><Link to='/Favorites'>Favorites</Link></li>
                <li><Link to='/Mymusic'>Mymusic</Link></li>
            </ul>


        </header >
    )
}

export default Header
