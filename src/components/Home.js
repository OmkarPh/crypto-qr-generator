import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { 
    Box, Container, Grid,
    FormControl, MenuItem, Fab,
    Select, InputLabel, TextField
} from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect';
import GithubCorner from 'react-github-corner';

import { QRCode } from 'react-qrcode-logo';
import { downloadCanvas } from 'download-canvas';

import { tokens, defaultToken } from '../data/tokens'
import Examples from './Examples'

import DownloadIcon from '../images/download.png';

const QRblockGrid = styled(Grid)`
    border: 7px solid green;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 769px) {
        margin-bottom: 40px!important;
        
    }
    @media (max-width: 768px) {
        margin-left: 5px!important;
        min-width: 95%;
        /* margin-bottom: 40px!important; */

    }
`;
const QRstring = styled.div`
    max-width: 270px;
    overflow-wrap: anywhere;
    text-align: left;
    margin-top: 15px;
`;
const MainContainer = styled(Container)`
    margin-top: 25px;
    background-color: #ffffff;
    @media (min-width: 768px){
        padding-top: 5px;
        box-shadow: #535857 0px 9px 15px 6px;
    }
`;

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
        // if(!token || !token.id || !address || address==="" || !token.validator.test(address))
        if(!token || !token.id || !address || address==="")
            return setQRString("Invalid QR string");

        let newString = token.id + ":" + address;

        if(address.includes(":"))
            newString = address;

        if(amount){
            newString += "?amount=" + amount;
            if(message)
                newString += "&message="+message;
        }else if(message){
            newString += "?message=" + message;
        }

        setQRString(newString);

    }, [token, address, amount, message, setQRString]);
  
    function downloadQR(){
        if(!token.id)
            return;

        downloadCanvas('react-qrcode-logo', {
            name: token.id + "QRCode",
            type: 'png',
            quality: 1
        });
    }

    return (
        <MainContainer>
            <h2>
                <center>
                        Crypto transaction QR code generator
                </center>
            </h2>
            <br/>
            <Grid container spacing={2}>
                <GithubCorner
                    href={"https://github.com/OmkarPh/crypto-qr-generator"}
                    bannerColor="#151513"
                    octoColor="#fff"
                    size={80}
                    ariaLabel="Source code"
                    direction="left"
                    target="_blank"
                />
                <Grid item md={8}>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { mb: 2, width: '25ch' },
                        }}
                    >
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>
                                Token
                            </InputLabel>
                            <Select
                                value={token}
                                label="Token"
                                onChange={changeToken}
                            >
                                {
                                    tokens.map(token => (
                                        <MenuItem value={token} key={token.name}>
                                            { token.name }
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            label="Amount"
                            value={amount}
                            type="number"
                            onChange={e => setAmount(Number(e.target.value))}
                            style={{marginLeft: "15px"}}
                        /><br/>
                        <TextField
                            required
                            style={{width:"370px"}}
                            error={!token.validator.test(address)}
                            label="Recipient address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        /><br/>
                        <TextField
                            label="Message"                                
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        /><br/>
                        <BrowserView>
                            <Examples tokens={tokens} />
                        </BrowserView>
                    </Box>
                </Grid>
                <QRblockGrid item md={4}>
                    <center>
                        <QRCode 
                            size={220}
                            logoWidth={60}
                            logoImage={token.icon}
                            value={qrString} />
                            <QRstring>
                                QR code string: { qrString }
                            </QRstring>
                        <br/>
                        <Fab variant="extended" color="primary" onClick={downloadQR}>
                            <img src={DownloadIcon} alt="download icon" />
                            &nbsp;&nbsp;
                            Download
                        </Fab>
                    </center>
                </QRblockGrid>
                <MobileView>
                    <Examples tokens={tokens} sm/>
                </MobileView>
            </Grid>
        </MainContainer>
    )
}

export default Home;
