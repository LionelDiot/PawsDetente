import React from 'react'
import { Grid } from '@mui/material'
import Divider from '../Divider/Divider'
import SelectQuantity from "../Buttons/SelectQuantity"

function Cart() {

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>VOTRE PANIER</h2>
            <Divider />
            <Grid container spacing={5}>
                <Grid item xs={3}>
                    <p>PRODUIT</p>
                </Grid>
                <Grid item xs={3}>
                    <p>PRIX</p>
                    <p>45€</p>
                </Grid>
                <Grid item xs={3}>
                    <p>QUANTITÉ</p>
                    <SelectQuantity />
                </Grid>
                <Grid item xs={3}>
                    <p>TOTAL</p>
                </Grid>
            </Grid>
        </>
    )
}

export default Cart