import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Bugs_icon from '../assets/img/icon-bugs.jpg';
import Melon_icon from '../assets/img/icon-melon.jpg';
import Apple_icon from '../assets/img/icon-apple.jpg';
import Bill_icon from '../assets/img/icon-bill.jpg';
import Genie_icon from '../assets/img/icon-genie.jpg';
import { IoMusicalNotes } from "react-icons/io5";
import { FcPlus } from 'react-icons/fc';

const Header = () => {
    const [showInput, setShowInput] = useState(false);
    const [newItem, setNewItem] = useState('');
    const [playlistCount, setPlaylistCount] = useState(0);
    const [playlists, setPlaylists] = useState([]);
    const [editingPlaylist, setEditingPlaylist] = useState(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        const count = localStorage.getItem('playlistCount') || 0;
        setPlaylistCount(Number(count));

        const loadedPlaylists = [];
        for (let i = 1; i <= count; i++) {
            const playlist = localStorage.getItem(`playlist${i}`);
            if (playlist) {
                loadedPlaylists.push(JSON.parse(playlist));
            }
        }
        setPlaylists(loadedPlaylists);
    }, []);

    const handleAddClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (e) => {
        setNewItem(e.target.value);
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            const newCount = playlistCount + 1;
            const playlistKey = `playlist${newCount}`;
            const newPlaylist = {
                id: playlistKey,
                name: newItem,
                items: []
            };

            localStorage.setItem(playlistKey, JSON.stringify(newPlaylist));
            localStorage.setItem('playlistCount', newCount.toString());
            setPlaylistCount(newCount);
            setPlaylists([...playlists, newPlaylist]);
            setNewItem('');
            setShowInput(false);
        }
    };

    const handleEditClick = (playlist) => {
        setEditingPlaylist(playlist.id);
        setEditingName(playlist.name);
    };

    const handleEditingChange = (e) => {
        setEditingName(e.target.value);
    };

    const handleUpdateItem = () => {
        if (editingName.trim() !== '') {
            const updatedPlaylists = playlists.map(playlist => 
                playlist.id === editingPlaylist ? { ...playlist, name: editingName } : playlist
            );
            setPlaylists(updatedPlaylists);
            localStorage.setItem(editingPlaylist, JSON.stringify(updatedPlaylists.find(playlist => playlist.id === editingPlaylist)));
            setEditingPlaylist(null);
            setEditingName('');
            alert('수정이 완료되었습니다'); // 수정 완료 알림
        }
    };

    const handleDeleteClick = (playlistId) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            const updatedPlaylists = playlists.filter(playlist => playlist.id !== playlistId);
            setPlaylists(updatedPlaylists);
            localStorage.removeItem(playlistId);
            localStorage.setItem('playlistCount', (playlistCount - 1).toString());
            setPlaylistCount(playlistCount - 1);
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
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        {editingPlaylist === playlist.id ? (
                            <div>
                                <input 
                                    type='text' 
                                    className='edit-input'
                                    value={editingName}
                                    onChange={handleEditingChange}
                                />
                                <button className='add-button' onClick={handleUpdateItem}>Update</button>
                            </div>
                        ) : (
                            <div>
                                <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                                <button className='add-button' onClick={() => handleEditClick(playlist)}>Edit</button>
                                <button className='add-button' onClick={() => handleDeleteClick(playlist.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
                <li>
                    {showInput ? (
                        <div>
                            <input 
                                type='text' 
                                value={newItem}
                                onChange={handleInputChange}
                            />
                            <button className='add-button' onClick={handleAddItem}>Add</button>
                        </div>
                    ) : (
                        <Link to='#' onClick={handleAddClick}><span className='icon2'><FcPlus /></span>create</Link>
                    )}
                </li>
            </ul>
        </header>
    )
}

export default Header;
