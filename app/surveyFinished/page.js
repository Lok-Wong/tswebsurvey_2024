'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRouter } from 'next/navigation';


function App() {
    const router = useRouter();
    const [stillHaveChild, setStillHaveChild] = React.useState('有');
    const _studentNum = React.useMemo(() => {
        const local_storage_studentNum = sessionStorage.getItem('studentNum');
        if (local_storage_studentNum){
            return local_storage_studentNum
        }
        return 0;
    },[])

    const handleNextButton = () => {
        sessionStorage.setItem("studentNum",(parseInt(_studentNum)+1))
    };

    React.useEffect(()=>{
        const items = {...sessionStorage}
        console.log("sessionKey",Object.keys(items))
    },[])

 return(
    <main className={styles.main}>
        <div>
            <h1 style={{color:"#ffffff"}}>
                完成問卷
            </h1>
        </div>

    </main>

)}

export default App;