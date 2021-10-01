import React, { useState, useEffect } from 'react'
import { 
    Box, Container, Grid,
    FormControl, MenuItem,
    Select, InputLabel, TextField
} from '@mui/material';

import CopyButton from './CopyButton';
import { QRCode } from 'react-qrcode-logo';

import { tokens, defaultToken } from '../data/tokens'
import CasperLogo from '../images/casperLogoCircle.png';

function copyTextToClipboard(text){
    if(!text)   
        return;
    if(typeof text !== 'string')    
    	return;
    window && window.navigator.clipboard.writeText(text);
}

const Home = () => {
  
    const [token, setToken] = useState(defaultToken);
    const changeToken = e => {
        setToken(e.target.value);
        console.log(e);
    }

    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [qrString, setQRString] = useState('Invalid QR string');

    useEffect(()=>{
        if(!token || !token.id || !address || address==="" || !token.validator.test(address)){
            setQRString("Invalid QR string");
            return;
        }

        let newString = token.id + ":" + address;

        if(address.includes(":")){
            console.log("Addr includes :", address);
            newString = address;
        }

        if(amount){
            newString += "?amount=" + amount;
            if(message)
                newString += "&message="+message;
        }else if(message){
            newString += "?message=" + message;
        }

        setQRString(newString);

    }, [token, address, amount, message, setQRString]);
  
  
    return (
        <Container>
            <h4>
                Crypto transaction QR code generator
            </h4>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { mb: 2, width: '25ch' },
                        }}
                    >
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">
                                Token
                            </InputLabel>
                            <Select
                                labelId="token-label"
                                value={token}
                                label="Token"
                                onChange={changeToken}
                            >
                                {
                                    tokens.map(token => (
                                        <MenuItem value={token} >
                                            { token.name }
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl><br/><br/>
                        <TextField
                            required
                            style={{width:"370px"}}
                            error={!token.validator.test(address)}
                            label="Recipient address"                                
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        /><br/>
                        <TextField
                            label="Amount"                                
                            value={amount}
                            type="number"
                            onChange={e => setAmount(Number(e.target.value))}
                        /><br/>
                        <TextField
                            label="Message"                                
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        /><br/>
                    </Box>
                </Grid>
                <Grid item>
                    <QRCode 
                        size={220}
                        logoWidth={60}
                        logoImage={CasperLogo}
                        value={qrString} />
                    <p>
                        QR code string: { qrString }
                    </p>
                </Grid>
            </Grid>
            
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

        </Container>
    )
}

export default Home;
