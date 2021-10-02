import React from 'react'
import CopyButton from './CopyButton';

function copyTextToClipboard(text){
    if(!text)   
        return;
    if(typeof text !== 'string')    
    	return;
    window && window.navigator.clipboard.writeText(text);
}

const Examples = ({tokens}) => {
    return (
        <>
            <h2>
                Example addresses:
            </h2>
            {
                tokens.map(token => (
                    <div className="m-0">
                        <b>
                            { token.name }: 
                        </b>
                        &nbsp;
                        { token.example }
                        <CopyButton 
                            onClick={e => copyTextToClipboard(token.example)}/>
                    </div>
                ))
            }
        </>
    )
}

export default Examples
