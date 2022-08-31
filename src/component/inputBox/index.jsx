import Button from '../button';
import Input from '../input';

import "./index.css"

const InputBox = () => {
    return (
        <>
            <div className='inputBox-container'>
                <Input 
                    height={40}
                    width={350}
                    prompt="Enter meeting name..."
                />
                <Button
                    height="40px" 
                    width="120px"
                    prompt="Start meeting"
                />
            </div>
        </>
    )
};

export default InputBox;
