import React, { useContext, useRef, useState, useEffect } from 'react';
import { IoMusicalNotes, IoPlaySkipForward, IoPlaySkipBack, IoPlay, IoPause, IoRepeat, IoShuffleOutline } from 'react-icons/io5';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import ReactPlayer from 'react-player';

const Aside = () => {
    const { musicData } = useContext(MusicPlayerContext);   // 노래 데이터
    const [currentIndex, setCurrentIndex] = useState(0);    // 현재 노래 정보(0)
    const [isPlaying, setIsPlaying] = useState(false);      // 현재 플레이 상태(시작/정지)
    const [played, setPlayed] = useState(0);                // 현재 노래 진행바
    const [duration, setDuration] = useState(0);            // 현재 노래 작동시간
    const [isRepeat, setIsRepeat] = useState(false);        // 반복 재생 상태
    const [isShuffle, setIsShuffle] = useState(false);      // 셔플 상태
    const [shuffledIndexes, setShuffledIndexes] = useState([]); // 셔플된 인덱스
    const [volume, setVolume] = useState(0.8);              // 볼륨 상태
    const playerRef = useRef(null);                         // 현재 노래 레퍼런스

    const currentTrack = musicData.length > 0 ? musicData[currentIndex] : null;

    useEffect(() => {
        if (isShuffle) {
            const indexes = [...Array(musicData.length).keys()];
            for (let i = indexes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
            }
            setShuffledIndexes(indexes);
        } else {
            setShuffledIndexes([]);
        }
    }, [isShuffle, musicData.length]);

    // 노래 플레이 상태
    const playTrack = (index) => {
        setCurrentIndex(index);
        setIsPlaying(true);
        setPlayed(0);
    };

    // 노래 정지
    const pauseTrack = () => {
        setIsPlaying(false);
    };

    // 노래 작동 시간
    const handleDuration = (duration) => {
        setDuration(duration);
    };

    // 노래 진행 바 컨트롤
    const handleSeekChange = (e) => {
        const newPlayed = parseFloat(e.target.value);
        setPlayed(newPlayed);
        playerRef.current.seekTo(newPlayed);
    };

    // 노래 진행 상태 업데이트
    const handleProgress = (state) => {
        setPlayed(state.played);
    };

    // 노래 다음 곡
    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = isShuffle ? shuffledIndexes[(shuffledIndexes.indexOf(prevIndex) + 1) % musicData.length] : (prevIndex + 1) % musicData.length;
            return nextIndex;
        });
        setPlayed(0);
    };

    // 노래 이전 곡
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const prevIndexAdjusted = isShuffle ? shuffledIndexes[(shuffledIndexes.indexOf(prevIndex) - 1 + musicData.length) % musicData.length] : (prevIndex - 1 + musicData.length) % musicData.length;
            return prevIndexAdjusted;
        });
        setPlayed(0);
    };

    // 반복 재생 토글
    const toggleRepeat = () => {
        setIsRepeat(!isRepeat);
    };

    // 셔플 토글
    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    // 노래 종료 시 반복 재생 처리
    const handleEnded = () => {
        if (isRepeat) {
            setPlayed(0);
            playerRef.current.seekTo(0);
            setIsPlaying(true);
        } else {
            handleNext();
        }
    };

    // 볼륨 조절 핸들러
    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value) / 100);
    };

    // 노래 시간 포맷
    const formatTime = (seconds) => {
        if (!seconds) return '00:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <aside id='aside'>
            <div className='play-now'>
                <h2><IoMusicalNotes /> Now Playing</h2>
                <div className='thumb'>
                    <div className='img'>
                        {currentTrack && (
                            <ReactPlayer
                                ref={playerRef}
                                url={`https://www.youtube.com/watch?v=${currentTrack.videoID}`}
                                playing={isPlaying}
                                controls={false}
                                width="100%"
                                height="100%"
                                volume={volume}
                                onDuration={handleDuration}
                                onProgress={handleProgress}
                                onEnded={handleEnded}
                            />
                        )}
                    </div>
                    <span className='title'>{currentTrack?.title || '선택된 노래가 없습니다.'}</span>
                    <span className='artist'>{currentTrack?.artist || '😝 노래 클릭'}</span>
                </div>
                <div className='progress'>
                    <div className='progress-bar'>
                        <input
                            type='range'
                            min='0'
                            max='1'
                            step='0.01'
                            value={played}
                            onChange={handleSeekChange}
                        />
                    </div>
                    <div className='times'>
                        <span className='current'>{formatTime(played * duration)}</span>
                        <span className='total'>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className='controls'>
                    <span className={`shuffle ${isShuffle ? 'active' : ''}`} onClick={toggleShuffle}><IoShuffleOutline /></span>
                    <span className='prev' onClick={handlePrev}><IoPlaySkipBack /></span>
                    {isPlaying ? (
                        <span className='play bg' onClick={pauseTrack}><IoPause /></span>
                    ) : (
                        <span className='play bg' onClick={() => setIsPlaying(true)}><IoPlay /></span>
                    )}
                    <span className='next' onClick={handleNext}><IoPlaySkipForward /></span>
                    <span className={`repeat ${isRepeat ? 'active' : ''}`} onClick={toggleRepeat}><IoRepeat /></span>
                </div>
                <div className='volume'>
                    <input
                        type='range'
                        min='0'
                        max='100'
                        step='1'
                        value={volume * 100}
                        onChange={handleVolumeChange}
                    />
                    <span className='volume-value'>{Math.round(volume * 100)}</span>
                </div>
            </div>

            <div className='play-list'>
                <h3><IoMusicalNotes /> Play list</h3>
                <ul>
                    {musicData.map((track, index) => (
                        <li
                            key={index}
                            onClick={() => playTrack(index)}
                            className={`play-list-item ${index === currentIndex ? 'current-track active' : ''}`}
                        >
                            <span className='img' style={{ backgroundImage: `url(${track.imageURL})` }}></span>
                            <span className='title'>{track.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Aside;
