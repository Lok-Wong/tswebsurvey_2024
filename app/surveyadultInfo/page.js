'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useRouter } from 'next/navigation';



function App() {
    const [stillHaveFamily, setStillHaveFamily] = React.useState("没有");

    return(
        <main className={styles.main}>
            <div>
                <h1>
                    3.	學生家庭成員個人資料
                </h1>
            </div>
            <div className={styles.question}>
                <FormControl>
                    <FormLabel id="still-have-family-label">1)    您是否已參加了入戶／線上居民出行調查，或學生家庭成員出行調查？</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="still-have-family-label"
                        name="still-have-family-group"
                        value={stillHaveFamily}
                        onChange={(event) => setStillHaveFamily(event.target.value)}
                        >
                        <FormControlLabel value="有" control={<Radio />} label="有" />
                        <FormControlLabel value="没有" control={<Radio />} label="没有" />
                    </RadioGroup>
                </FormControl>
            </div>
            { stillHaveFamily == "有"?
                null
                :
                <div  className={styles.question} >
                    <FormControl>
                        <FormLabel id="class-level-label">1)  就讀年級：</FormLabel>
                        <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '95%' },
                        }}
                        noValidate
                        >
                        <TextField id="class-level" label="年級" variant="outlined" />
                        </Box>
                    </FormControl>

                    <FormControl sx={{width:'50%'}}>
                        <FormLabel id="school-name-label">2)  學校名稱：</FormLabel>
                        <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '95%' },
                        }}
                        noValidate
                        >
                        <TextField id="school-name" label="學校" variant="outlined" />
                        </Box>
                    </FormControl>
                </div>
            }

            <div className={styles.buttonGroupStyle}>
                <Button variant="contained">
                    {
                        stillHaveFamily == "有"? "完成" : "下一頁"
                    }
                </Button>
            </div>

        </main>
    )
}
export default App