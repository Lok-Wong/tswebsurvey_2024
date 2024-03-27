'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import 'survey-core/defaultV2.min.css';
import { useRouter } from 'next/navigation';


function App() {
    const router = useRouter();
    const [stillHaveChild, setStillHaveChild] = React.useState('有');

 return(
    <main className={styles.main}>
        <div>
            <h1>
                最後確認
            </h1>
            <FormControl>
                <div  className={styles.question} >
                    <FormLabel id="still-have-other-child-label">還有其他學生家庭成員未填寫本調查問卷嗎?</FormLabel>
                        <RadioGroup
                            defaultValue={stillHaveChild}
                            row
                            aria-labelledby="still-have-other-child-label"
                            name="still-have-other-child-group"
                            value={stillHaveChild}
                            onChange={(event) => {setStillHaveChild(event.target.value)}}
                            >
                            <FormControlLabel value="有" control={<Radio />} label="有" />
                            <FormControlLabel value="没有" control={<Radio />} label="没有" />
                        </RadioGroup>
                </div>

            </FormControl>
            <div className={styles.question}>
                <Button  variant="contained" onClick={() => router.back()}>
                    上一頁
                </Button>
                <Button  variant="contained" href={stillHaveChild == "有" ? "/surveystudentinfo" : "/surveyfinished"}>
                    {
                        stillHaveChild == "有" ? "下一頁" : "完成"
                    }
                </Button>
            </div>
        </div>

    </main>

)}

export default App;
