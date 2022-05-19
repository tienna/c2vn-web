import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './dapps-connector.module.css';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { createIcon } from "@download/blockies"
import { textPartFromWalletChecksumImagePart } from "@emurgo/cip4-js"
// import * as CardanoWasm from "@minswap/cardano-serialization-lib-browser"

// import { bytesToHex, hexToBytes } from './coreUtils';
const Buffer = require('buffer/').Buffer;

let accessGranted = false
let cardanoApi
let returnType = 'cbor'

function DAppsPage() {
    const [isLoading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [alert, setAlert] = useState('');
    const [alertStatus, setAlertStatus] = useState('');
    const [connectedTo, setConnectedTo] = useState('');

    useEffect(() => {
        if (typeof window.cardano === "undefined") {
            console.log('Cardano error')
        } else {
            console.log("Cardano API detected, checking connection status");
            cardano.yoroi.enable({ requestIdentification: true, onlySilent: true }).then(
            api => {
                console.log('successful silent reconnection')
                onApiConnected(api);
            },
            err => {
                if (String(err).includes('onlySilent:fail')) {
                console.log('no silent re-connection available');
                } else {
                console.error('Silent reconnection failed for unknown reason!', err);
                }
            }
            );
        }
    }, []);

    function isCBOR() {
        return returnType === 'cbor';
    }

    const handleCheckBoxChange = (event) => {
        return setIsChecked(event.target.checked);
    }

    const handleRequestClick = () => {
        setLoading(true);
        cardano.yoroi.enable({
            requestIdentification: isChecked
        }).then(
            function (api) {
                console.log('GGG', api)
                onApiConnected(api);
                setLoading(false);
            },
            function (err) {
                setLoading(false)
                setAlertStatus("error")
                setAlert(`Error: ${err}`)
            },
        );
    }

    // function createBlockiesIcon(seed) {
    //     const colorIdx = hexToBytes(seed)[0] % COLORS.length;
    //     const color = COLORS[colorIdx];
    //     return createIcon({
    //         seed,
    //         size: 7,
    //         scale: 5,
    //         bgcolor: color.primary,
    //         color: color.secondary,
    //         spotcolor: color.spots,
    //     })
    // }

    function bytesToHex(bytes) {
        return Buffer.from(bytes).toString('hex');
    }
    function hexToBytes(hex) {
      return Buffer.from(hex, 'hex');
    }

    function onApiConnected(api) {
        let walletDisplay = 'an anonymous Yoroi Wallet';
        api.experimental.setReturnType(returnType);
        const auth = api.experimental.auth && api.experimental.auth();
        const authEnabled = auth && auth.isEnabled();
    
        if (authEnabled) {
            const walletId = auth.getWalletId();
            const pubkey = auth.getWalletPubkey();
            console.log('Auth acquired successfully: ',
                JSON.stringify({
                    walletId,
                    pubkey
                }));
            const walletPlate = textPartFromWalletChecksumImagePart(walletId);
            walletDisplay = `Yoroi Wallet ${walletPlate}`;
            // walletIconSpan.appendChild(createBlockiesIcon(walletId));
        }
    
        setAlertStatus("success");
        setConnectedTo(walletDisplay);
        setAlert(`You have access to ${walletDisplay} now`);
    
        accessGranted = true;
        window.cardanoApi = cardanoApi = api;
    
        api.experimental.onDisconnect(() => {
            alertWarrning(`Disconnected from ${walletDisplay}`);
            toggleConnectionUI('button');
            walletPlateSpan.innerHTML = '';
            walletIconSpan.innerHTML = '';
        });
    
        if (authEnabled) {
            console.log('Testing auth signatures')
            const messageJson = JSON.stringify({
                type: 'this is a random test message object',
                rndValue: Math.random(),
            });
            const messageHex = bytesToHex(messageJson);
            console.log('Signing randomized message: ', JSON.stringify({
                messageJson,
                messageHex,
            }))
            const start = performance.now();
            auth.signHexPayload(messageHex).then(sig => {
                const elapsed = performance.now() - start;
                console.log(`Signature created in ${elapsed} ms`);
                console.log('Signature received: ', sig);
                console.log('Verifying signature against the message');
                auth.checkHexPayload(messageHex, sig).then(r => {
                    console.log('Signature matches message: ', r);
                }, e => {
                    console.error('Sig check failed', e);
                });
            }, err => {
                console.error('Sig failed', err);
            });
        }
    }

    const handleCheckConnection = async () => {
        const isEnabled = await window.cardano.yoroi.isEnabled();
        return setAlert(`Is Yoroi connection enabled: ${isEnabled}`);
    }

    // const handleGetAccountBalance = async () => {
    //     if(!accessGranted) {
    //         setAlertStatus("error");
    //         setAlert('Should request access first');
    //     } else {
    //         setLoading(true)  
    //         const tokenId = '*';
    //         cardanoApi.getBalance(tokenId).then(function(balance) {
    //         console.log('[getBalance]', balance);
    //         setLoading(false)
    //         let balanceJson = balance;
    //         if (isCBOR()) {
    //             if (tokenId !== '*') {
    //             alertSuccess(`Asset Balance: ${balance} (asset: ${tokenId})`)
    //             return;
    //             }
    //             const value = CardanoWasm.Value.from_bytes(hexToBytes(balance));
    //             console.log(value);
    //             balanceJson = { default: value.coin().to_str() };
    //             balanceJson.assets = reduceWasmMultiasset(value.multiasset(), (res, asset) => {
    //             res[asset.assetId] = asset.amount;
    //             return res;
    //             }, {});
    //         }
    //         setAlert(`Account Balance: ${JSON.stringify(balanceJson, null, 2)}`)
    //       });
    //     }
    // }
    
    const {siteConfig} = useDocusaurusContext();
    return (
        <div className={clsx("container", styles.container)}>
            <h2 className={clsx("header", styles.header)}>Cardano DApps Connection Example</h2>
            <a href="docs/integrate-cardano/dapps-connector" >Hướng dẫn xem tại đây</a>
            { connectedTo !== '' && <p style={{textAlign: 'center'}}>
                Connected to: <strong>{connectedTo}</strong
            ></p> }
            { ['', 'error'].includes(alertStatus) && <div className={clsx("action-row", styles.action)}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={handleCheckBoxChange} />} label="Request identification" />    
                </FormGroup>
                <Button variant="contained" color="primary" onClick={handleRequestClick}>Request access to Yoroi</Button>
                { isLoading && <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> }
            </div> }

            <Grid container spacing={2} style={{ marginTop: '15px', marginBottom: '15px'}}>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} onClick={handleCheckConnection}>is Enabled</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>get Account Balance</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>get Unused Addresses</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>get Used Addresses</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>get Change Addresses</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>get Reward Addresses</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>get Utxos</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>[Experimental] create Tx</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>sign Tx</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>submit Tx</Button>
                </Grid>
            </Grid>    

            { alertStatus !== '' && <Alert variant="filled" severity={alertStatus}>
                {alert}
            </Alert> }
        </div>
    );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
        return (
            <Layout
                title={`dApps Connector Example`}
                description="Mang Cardano về Việt Nam">
                <DAppsPage />
            </Layout>
    );
}