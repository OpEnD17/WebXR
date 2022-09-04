import { useState } from 'react';
import Button from '../button';
import Input from '../input';

import "./index.css"

const InputBox = () => {

    const [value, setValue] = useState();


    return (
        <>
            <div className='inputBox-container'>
                <Input
                    height={40}
                    width={350}
                    prompt="Enter meeting name..."
                    setValue = {setValue}
                />
                <Button
                    height="40px"
                    width="120px"
                    prompt="Start meeting"
                    value = {value}
                />
            </div>
        </>
    )
};

export default InputBox;
