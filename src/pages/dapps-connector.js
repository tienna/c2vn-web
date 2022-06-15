import React, { useEffect, useState } from 'react';
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
// import * as CardanoWasm from "@emurgo/cardano-serialization-lib-browser";

const Buffer = require('buffer/').Buffer;

let accessGranted = false
let cardanoApi
let returnType = 'cbor'
let unUsedAddresses
let usedAddresses
let changeAddress

function DAppsPage() {
    const [isLoading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [alert, setAlert] = useState('');
    const [alertStatus, setAlertStatus] = useState('');
    const [connectedTo, setConnectedTo] = useState('');

    useEffect(() => {
        if (typeof window.cardano === "undefined") {
            console.log('Cardano API not found');
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
        try {
            setLoading(true);

            cardano.yoroi.enable({
                requestIdentification: isChecked
            }).then(
                function (api) {
                    onApiConnected(api);
                    setLoading(false);
                },
                function (err) {
                    setLoading(false)
                    setAlertStatus("error")
                    setAlert(`Error: ${err}`)
                },
            );
        } catch(error) {
            console.error(error);
            setLoading(false);
            setAlertStatus("error");
            setAlert('Cardano API not found. Please install yoroi wallet extension before take this action.');
        }
    }

    function bytesToHex(bytes) {
        return Buffer.from(bytes).toString('hex');
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
        if(!window.cardano) {
            setAlertStatus("error");
            return setAlert('Please install yoroi wallet extension before take this action.');
        }
        const isEnabled = await window.cardano.yoroi.isEnabled();
        return setAlert(`Is Yoroi connection enabled: ${isEnabled}`);
    }

    const handleGetAccountBalance = async () => {
        if(!accessGranted) {
            setAlertStatus("error");
            setAlert('Should request access first');
        } else {
            setLoading(true)
            const tokenId = '*';
            cardanoApi.getBalance(tokenId).then(function(balance) {
                setLoading(false)
                setAlertStatus("success");
                return setAlert(`Your Account Balance has: ${balance} ADA`);
            // let balanceJson = balance;
            // if (isCBOR()) {
            //     if (tokenId !== '*') {
            //         alertSuccess(`Asset Balance: ${balance} (asset: ${tokenId})`)
            //         return;
            //     }
            //     const value = CardanoWasm.Value.from_bytes(hexToBytes(balance));
            //     console.log(value);
            //     balanceJson = { default: value.coin().to_str() };
            //     balanceJson.assets = reduceWasmMultiasset(value.multiasset(), (res, asset) => {
            //     res[asset.assetId] = asset.amount;
            //     return res;
            //     }, {});
            // }
            // setAlert(`Account Balance: ${JSON.stringify(balanceJson, null, 2)}`)
            }).catch(error => {
                console.error('Get account balance error:', error);
                setLoading(false);
                setAlertStatus("error");
                return setAlert('Error, Get account balance failed. Please try again later !');
            })
        }
    }

    const getUnUsedAddresses = () => {
        if(!accessGranted) {
            setAlertStatus("error");
            setAlert('Should request access first');
        } else {
            setLoading(true)
            cardanoApi.getUnusedAddresses().then(function(addresses) {
                setLoading(false)

                if (addresses.length === 0) {
                    setAlertStatus("warning");
                    return setAlert('Empty unused addresses.');
                }
                // addresses = addressesFromCborIfNeeded(addresses)
                unUsedAddresses = addresses
                // alertSuccess(`Address: `)
                // alertEl.innerHTML = '<h2>Unused addresses:</h2><pre>' + JSON.stringify(addresses, undefined, 2) + '</pre>'
                setAlertStatus("success");
                return setAlert(`Unused addresses: ${addresses.join('\n')}`);
            }).catch(error => {
                console.error('Get unused address error: ', error);
                setLoading(false);
                setAlertStatus("error");
                return setAlert('Error, Get unused address failed. Please try again later !');
            })
        }
    }

    const getUsedAddresses = () => {
        if(!accessGranted) {
            setAlertStatus("error");
            setAlert('Should request access first');
        } else {
            setLoading(true)
            cardanoApi.getUsedAddresses().then(function(addresses) {
                setLoading(false)
                if (addresses.length === 0) {
                    setAlertStatus("warning");
                    return setAlert('Empty used addresses.');
                }
                usedAddresses = addresses
                // alertSuccess(`Address: ${usedAddresses.concat(',')}`)
                // alertEl.innerHTML = '<h2>Used addresses:</h2><pre>' + JSON.stringify(usedAddresses, undefined, 2) + '</pre>'
                setAlertStatus("success");
                return setAlert(`Unused addresses: ${addresses.join('\n')}`);
            }).catch(error => {
                console.error('Get used address error:', error);
                setLoading(false);
                setAlertStatus("error");
                return setAlert('Error, Get used address failed. Please try again later !');
            })
        }
    }

    const getChangeAddress = () => {
        if(!accessGranted) {
            setAlertStatus("error");
            setAlert('Should request access first');
        } else {
            setLoading(true)
            cardanoApi.getChangeAddress().then(function(address) {
                setLoading(false)
                if (address.length === 0) {
                    setAlertStatus("warning");
                    return setAlert('Empty change addresses.');
                }
                changeAddress = Array.isArray(address) ? address[0] : address;

                setAlertStatus("success");
                return setAlert(`Change addresses: ${Array.isArray(address) ? addresses.join('\n') : address}`);
                // alertEl.innerHTML = '<h2>Change address:</h2><pre>' + JSON.stringify(address, undefined, 2) + '</pre>'
            }).catch(error => {
                console.error('Get change address error:', error);
                setLoading(false);
                setAlertStatus("error");
                return setAlert('Error, Get change address failed. Please try again later !');
            })
        }
    }

    const getRewardAddresses = () => {
        if(!accessGranted) {
            setAlertStatus("error");
            setAlert('Should request access first');
        } else {
            setLoading(true)
            cardanoApi.getRewardAddresses().then(function(addresses) {
                setLoading(false)
                if (addresses.length === 0) {
                    setAlertStatus("warning");
                    return setAlert('Empty reward addresses.');
                }
                setAlertStatus("success");
                return setAlert(`Reward addresses: ${addresses.join('\n')}`);
            }).catch(error => {
                console.error('Get reward address error:', error);
                setLoading(false);
                setAlertStatus("error");
                return setAlert('Error, Get reward address failed. Please try again later !');
            })
        }
    }
    
    const {siteConfig} = useDocusaurusContext();
    return (
        <div className={clsx("container", styles.container)}>
            <h2 className={clsx("header", styles.header)}>Cardano DApps Connection Example</h2>
            <a href="docs/integrate-cardano/dapps-connector" >Hướng dẫn xem tại đây</a>
            {
                connectedTo !== '' && <p style={{textAlign: 'center'}}>
                    Connected to: <strong>{connectedTo}</strong>
                </p>
            }
            {
                ['', 'error'].includes(alertStatus) && 
                <div className={clsx("action-row", styles.action)}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={handleCheckBoxChange} />} label="Request identification" />    
                    </FormGroup>
                    <Button variant="contained" color="primary" onClick={handleRequestClick}>Request access to Yoroi</Button>
                </div>
            }
            {
                isLoading && <Box sx={{ display: 'flex', marginTop: '15px', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
            <Grid container spacing={2} style={{ marginTop: '15px', marginBottom: '15px'}}>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} onClick={handleCheckConnection}>
                        is Enabled
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} onClick={handleGetAccountBalance}
                        disabled={isLoading}>
                        get Account Balance
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={isLoading}
                        onClick={getUnUsedAddresses} >
                        get Unused Addresses
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={isLoading}
                        onClick={getUsedAddresses}>
                        get Used Addresses
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={isLoading}
                        onClick={getChangeAddress}>
                        get Change Addresses
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={isLoading}
                        onClick={getRewardAddresses}>
                        get Reward Addresses
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>
                        get Utxos
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>
                        [Experimental] create Tx
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>
                        sign Tx
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button style={{ textTransform: 'none' }} variant="outlined" fullWidth={true} disabled={true}>
                        submit Tx
                    </Button>
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