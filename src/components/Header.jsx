import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Bugs_icon from '../assets/img/icon-bugs.jpg'
import Melon_icon from '../assets/img/icon-melon.jpg'
import Apple_icon from '../assets/img/icon-apple.jpg'
import Bill_icon from '../assets/img/icon-bill.jpg'
import Genie_icon from '../assets/img/icon-genie.jpg'
import { IoMusicalNotes } from "react-icons/io5";
import { FcPlus } from 'react-icons/fc'


const Header = () => {
    const [showInput, setShowInput] = useState(false); // 입력 박스 표시 여부 상태
    const [newItem, setNewItem] = useState(''); // 새 항목의 제목 상태
    const [playlistCount, setPlaylistCount] = useState(0); // 플레이리스트 개수 상태

    useEffect(() => {
        const count = localStorage.getItem('playlistCount') || 0; // 로컬 스토리지에서 플레이리스트 개수를 가져옴
        setPlaylistCount(Number(count)); // 상태 업데이트
    }, []);

    const handleAddClick = () => {
        setShowInput(true); // 입력 박스 표시
    };

    const handleInputChange = (e) => {
        setNewItem(e.target.value); // 입력 값 업데이트
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') { // 제목이 비어있지 않은 경우
            const newCount = playlistCount + 1; // 새로운 플레이리스트 번호
            const playlistKey = `playlist${newCount}`; // 플레이리스트 키 (예: playlist1, playlist2)
            const newPlaylist = {
                id: playlistKey,
                name: newItem,
                items: [] // 초기 항목 배열
            };

            localStorage.setItem(playlistKey, JSON.stringify(newPlaylist)); // 로컬 스토리지에 저장
            localStorage.setItem('playlistCount', newCount.toString()); // 플레이리스트 개수 저장
            setPlaylistCount(newCount); // 상태 업데이트
            setNewItem(''); // 입력 값 초기화
            setShowInput(false); // 입력 박스 숨기기
        }
    };

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
                <li><Link to='/Mymusic'>Mymusic</Link></li>
                <li>
                    {showInput ? (
                        <div>
                            <input 
                                type='text' 
                                value={newItem}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleAddItem}>Add</button>
                        </div>
                    ) : (
                        <Link to='#' onClick={handleAddClick}><span className='icon2'><FcPlus /></span>create</Link>
                    )}
                </li>
            </ul>
      


        </header >
    )
}

export default Header
