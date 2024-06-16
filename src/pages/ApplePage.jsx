import React, { useState } from 'react'
import useFetchData from '../hook/useFetchData';
import { ClipLoader } from 'react-spinners';
import Chart from '../components/Chart';

const ApplePage = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const [selectedDate, setSelectedDate] = useState(yesterday);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const { data, loading } = useFetchData(`https://raw.githubusercontent.com/webs9919/music-best/main/apple/apple100_${formattedDate}.json`);

    return (
        <>
            {loading ? (
                <div className='loading'>
                    <ClipLoader size={50} color={"#7D57FF"} loading={loading} />
                </div>
            ) : (
                <Chart
                    title="😜 감미로운 애플 챠트 Top100"
                    musicList={data}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    minDate={new Date('2024-05-01')}
                    maxDate={yesterday}
                />
            )}
        </>
    )
}

export default ApplePage