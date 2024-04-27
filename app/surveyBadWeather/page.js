'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';

function App() {
    const router = useRouter();

    const blanksurvey = {
        bedWeather : {
            startTime : new Date(),
            badWeatherPickup: 999,
            badWeatherransition:999,
            comment:999,
          }
        }

    const _totalStudentNum = React.useMemo(() => {
        const local_storage_studentNum = sessionStorage.getItem('studentNum');
        if (local_storage_studentNum){
            return local_storage_studentNum
        }
        return 0;
    },[])
    
    const _studentNum = React.useMemo(() => {
        const local_storage_studentNum = sessionStorage.getItem('studentNum');
        if (local_storage_studentNum){
            return local_storage_studentNum
        }
        return 0;
    },[])

    const _initial_value = React.useMemo(() => {
        const local_storage_value_str = sessionStorage.getItem((_studentNum + 'bedWeather'));
        // If there is a value stored in localStorage, use that
        if(local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
        } 
        // Otherwise use initial_value that was passed to the function
        return blanksurvey;
        }, []);

    const [survey, setSurvey] = React.useState(_initial_value)
    
    const handleTimeChange = (event,name) => {
    setSurvey((prevState) => ({
        ...prevState,
        surveyNormalRd2:{
            ...prevState.surveyNormalRd2,
            [name] : event.$d
        }
    })
    )
    };

    // const handleNextButton = () => {
    //     sessionStorage.getItem("totalStudentNum",_studentNum)
    // }

    React.useEffect(()=>{
    survey && sessionStorage.setItem((_studentNum + 'bedWeather'),JSON.stringify(survey))
    console.log(survey)
    },[survey])


    // React.useEffect(()=>{
   
    // },[])



    return(
        <main className={styles.main}>
            <div style={{minWidth:"100%"}}>
                <h1 style={{color:"#ffffff"}}>

                </h1>
                <h1 style={{color:"#ffffff"}}>
                    5.	惡劣天氣情況下，學生上學及放學出行情況
                </h1>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="arrival-home-transition-label">1) 有沒有人接送：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="arrival-home-transition-label"
                            name="badWeatherPickUp"
                            >
                            <FormControlLabel value="學生自行上（放）學 " control={<Radio />} label="學生自行上（放）學 " />
                            <FormControlLabel value="父母" control={<Radio />} label="父母" />
                            <FormControlLabel value="工人" control={<Radio />} label="工人" />
                            <FormControlLabel value="其他監護人" control={<Radio />} label="其他監護人" />
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField 
                                        id="arrival-home-transition-other-textfill" 
                                        label="其他" 
                                        variant="filled" 
                                        name = "otherarivalHomeTransition"
                                    />
                                </Box>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="arrival-home-transition-label">2) 主要使用的交通工具:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="arrival-home-transition-label"
                            name="badWeatherTransition"
                            >
                            <FormControlLabel value="電單車（乘客）" control={<Radio />} label="電單車（乘客）" />
                            <FormControlLabel value="私家車（乘客）" control={<Radio />} label="私家車（乘客）" />
                            <FormControlLabel value="校車" control={<Radio />} label="校車" />
                            <FormControlLabel value="巴士" control={<Radio />} label="巴士" />
                            <FormControlLabel value="輕軌" control={<Radio />} label="輕軌" />
                            <FormControlLabel value="一般的士" control={<Radio />} label="一般的士" />
                            <FormControlLabel value="電召的士" control={<Radio />} label="電召的士" />
                            <FormControlLabel value="步行" control={<Radio />} label="步行" />
                            <FormControlLabel value="其他" control={<Radio />} label="其他" />
                            
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField 
                                        id="arrival-home-transition-other-textfill" 
                                        label="其他" 
                                        variant="filled" 
                                        name = "otherarivalHomeTransition"
                                    />
                                </Box>
                                
                              
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl sx={{
                        m:1, width:"100%"
                    }}>
                        <FormLabel id="student-suggestion-label">13)	爲了更好服務學生，您對上下學出行有何意見或建議？（選填）：</FormLabel>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '80%'},
                            }}
                            noValidate
                            >
                            <TextField 
                                id="student-suggestion-text" 
                                label="請輸入您的意見" 
                                variant="outlined" 
                                name='comment'
                                multiline
                            />
                        </Box>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <Button onClick={() => router.back()}>
                        back
                    </Button>
                    <Button href={'/surveyStudentFinised'}>
                        next
                    </Button>
            
                </div>
                
            </div>         
        </main>
    )

}
export default App;
