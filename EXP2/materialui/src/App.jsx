import { Button, TextField, Card, CardContent } from '@mui/material';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MaterialUI() {
  return (
    <Card style={{ width: 300, margin: '20px auto' }}>
      <CardContent>
        <h3>Material UI Form</h3>
        <TextField label="Name" fullWidth margin="normal" />
        <Button variant="contained" fullWidth>Submit</Button>
      </CardContent>
    </Card>
);
}
export default MaterialUI;