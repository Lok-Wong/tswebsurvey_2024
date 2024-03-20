'use client'
import styles from "./page.module.css";
import Link from "next/link";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';// import RadioGroup from "@mui/material";
import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {
    return(
        <main className={styles.main}>
            <FormControl>
                <div className={styles.question}>
                    <p>
                        a
                    </p>
                </div>
            </FormControl>
            </main>
    )

}
export default App;
