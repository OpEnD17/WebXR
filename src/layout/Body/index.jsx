import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import FlipClock from '../../component/flipclock';
import Func from '../../component/func';

import './index.css';

const Body = () => {
    return (
        <div>

            <div className='time-wrapper'>
                <div>
                    <Calendar className={'calender'} />
                </div>
                <div className='clock-wrapper'>
                    <FlipClock />
                </div>
            </div>
            <Func />
        </div>
    )
}

export default Body;
