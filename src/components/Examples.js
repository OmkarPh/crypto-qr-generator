import React from 'react';
import styled from 'styled-components';
import CopyButton from './CopyButton';


function copyTextToClipboard(text){
    if(!text || typeof text !== 'string')
        return;
    window && window.navigator.clipboard && window.navigator.clipboard.writeText(text);
}

const ExampleAddressSpan = styled.span`
    overflow-wrap: anywhere;
    @media (max-width: 768px) {
    }
`;

const Examples = ({tokens, sm}) => {
    return (
        <div style={{paddingLeft: "5px"}}>
            <h3>
                Example addresses:
            </h3>
            {
                tokens.map(token => (
                    <div className="m-0" key={token.name}>
                        <b>
                            { token.name }: 
                        </b>
                        { sm && <br/> }
                        &nbsp;
                        <ExampleAddressSpan>
                            { token.example }
                        </ExampleAddressSpan>
                        <CopyButton
                            onClick={e => copyTextToClipboard(token.example)} />
                    </div>
                ))
            }
        </div>
    )
}

export default Examples
