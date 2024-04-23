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
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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
    const _studentNum = React.useMemo(() => {
        const local_storage_studentNum = localStorage.getItem('studentNum');
        if (local_storage_studentNum){
            return local_storage_studentNum
        }
        return 0;
    },[])

    const _initial_value = React.useMemo(() => {
        const local_storage_value_str = localStorage.getItem(('bedWeather'+_studentNum));
        // If there is a value stored in localStorage, use that
        if(local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
        } 
        // Otherwise use initial_value that was passed to the function
        return blanksurvey;
        }, []);

    const [survey, setSurvey] = React.useState(_initial_value)
    
    const handleChangeBackHomeTime = (event,name) => {
        if (survey.surveyNormalRd2.directToHomeState == "是"){
            setSurvey((prevState) => (
                {
                ...prevState,
                surveyNormalRd2:{
                    ...prevState.surveyNormalRd2,
                    directToHomeYes:{
                        ...prevState.surveyNormalRd2.directToHomeYes,
                        [name] : event.$d
                    }
                }
                }
            )
            )
        };

        if (survey.surveyNormalRd2.directToHomeState == "否"){
            setSurvey((prevState) => (
                {
                ...prevState,
                surveyNormalRd2:{
                    ...prevState.surveyNormalRd2,
                    directToHomeNo:{
                        ...prevState.surveyNormalRd2.directToHomeNo,
                        [name] : event.$d
                        }
                    }
                }
                )
                )
        };
    }
    
    const handleChangeBackHome = (event) => {
        if (survey.surveyNormalRd2.directToHomeState == "是"){
            setSurvey((prevState) => (
                {
                ...prevState,
                surveyNormalRd2:{
                    ...prevState.surveyNormalRd2,
                    directToHomeYes:{
                        ...prevState.surveyNormalRd2.directToHomeYes,
                        [event.target.name] : event.target.value
                    }
                }
                }
            )
            )
        };

        if (survey.surveyNormalRd2.directToHomeState == "否"){
            setSurvey((prevState) => (
                {
                ...prevState,
                surveyNormalRd2:{
                    ...prevState.surveyNormalRd2,
                    directToHomeNo:{
                        ...prevState.surveyNormalRd2.directToHomeNo,
                        [event.target.name] : event.target.value
                        }
                    }
                }
                )
                )
        };
    }

    const handleChange = (event) => {
    const objectName = event.target.name
    setSurvey((prevState) => (
        {
        ...prevState,
        surveyNormalRd2:{
            ...prevState.surveyNormalRd2,
            [objectName] : event.target.value
        }
        }
    )
    
    )
    };

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

    const clearbackHomeData = () => {
        if (survey.surveyNormalRd2.directToHomeState == "否"){
            setSurvey((prevState) => (
                {
                ...prevState,
                surveyNormalRd2:{
                    ...prevState.surveyNormalRd2,
                    directToHomeYes:{
                        arivalHomeTime:999,
                        arivalHomeTransition:999,
                        otherarivalHomeTransition:999
                    }
                }
                }
            )
            )
        };

        if (survey.surveyNormalRd2.directToHomeState == "是"){
            setSurvey((prevState) => (
                {
                ...prevState,
                surveyNormalRd2:{
                    ...prevState.surveyNormalRd2,
                    directToHomeNo:{
                        leaveDestination:999,
                        leaveDestinationTime:999,
                        leaveDestinationTransition:999,
                        otherLeaveDestinationTransition:999,
                        destinationBackHomeStartTime:999,
                        destinationBackHomeEndTime:999,
                        leaveDestinationBackHomeTransition:999,
                        otherLeaveDestinationBackHomeTransition:999
                    }
                }
                }
            )
            )
        }
    }

    React.useEffect(()=>{
    survey && localStorage.setItem(('bedWeather'+_studentNum),JSON.stringify(survey))
    console.log(survey)
    },[survey])

    React.useEffect(()=>{
        clearbackHomeData()
    },[survey.surveyNormalRd2.directToHomeState])

    React.useEffect(()=>{
    if (survey.surveyNormalRd2.leavePickUp != "其他"){
        setSurvey((prevState) => (
        {
            ...prevState,
            surveyNormalRd2:{
            ...prevState.surveyNormalRd2,
            otherleavePickUp : 999
            }
        }
        ))
    };

    if (survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition != "其他"){
        setSurvey((prevState) => (
        {
            ...prevState,
            surveyNormalRd2:{
            ...prevState.surveyNormalRd2,
            directToHomeYes:{
                ...prevState.surveyNormalRd2.directToHomeYes,
                otherarivalHomeTransition : 999
            }
            }
        }
        ))
    };

    if (survey.surveyNormalRd2.directToHomeNo.leaveDestinationTransition != "其他"){
        setSurvey((prevState) => (
        {
            ...prevState,
            surveyNormalRd2:{
            ...prevState.surveyNormalRd2,
            directToHomeNo:{
                ...prevState.surveyNormalRd2.directToHomeNo,
                otherLeaveDestinationTransition : 999
            }
            }
        }
        ))
    };

    if (survey.surveyNormalRd2.directToHomeNo.leaveDestinationBackHomeTransition != "其他"){
        setSurvey((prevState) => (
        {
            ...prevState,
            surveyNormalRd2:{
            ...prevState.surveyNormalRd2,
            directToHomeNo:{
                ...prevState.surveyNormalRd2.directToHomeNo,
                otherLeaveDestinationBackHomeTransition : 999
            }
            }
        }
        ))
    };
    },[survey.surveyNormalRd2.leavePickUp,survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition,survey.surveyNormalRd2.directToHomeNo.leaveDestinationTransition,survey.surveyNormalRd2.directToHomeNo.leaveDestinationBackHomeTransition])



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
                            onChange={handleChangeBackHome}
                            value={survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition}
                            >
                            <FormControlLabel value="學生自行上（放）學 " control={<Radio />} label="學生自行上（放）學 " />
                            <FormControlLabel value="父母" control={<Radio />} label="父母" />
                            <FormControlLabel value="工人" control={<Radio />} label="工人" />
                            <FormControlLabel value="其他監護人" control={<Radio />} label="其他監護人" />
                            {
                                survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition == "其他監護人" ?
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
                                        onChange={handleChangeBackHome}
                                        name = "otherarivalHomeTransition"
                                        value={survey.surveyNormalRd2.directToHomeYes.otherarivalHomeTransition == 999 ? "" : survey.surveyNormalRd2.directToHomeYes.otherarivalHomeTransition}
                                    />
                                </Box>
                                :
                                null
                             }
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl>
                        <FormLabel id="arrival-home-transition-label">2) 主要使用的交通工具:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="arrival-home-transition-label"
                            name="arivalHomeTransition"
                            onChange={handleChangeBackHome}
                            value={survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition}
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
                            {
                                survey.surveyNormalRd2.directToHomeYes.arivalHomeTransition == "其他" ?
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
                                        onChange={handleChangeBackHome}
                                        name = "otherarivalHomeTransition"
                                        value={survey.surveyNormalRd2.directToHomeYes.otherarivalHomeTransition == 999 ? "" : survey.surveyNormalRd2.directToHomeYes.otherarivalHomeTransition}
                                    />
                                </Box>
                                :
                                null
                             }
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
                                multiline
                            />
                        </Box>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <Button onClick={() => router.back()}>
                        previous *need check which is previous page
                    </Button>
                    <Button href={'/surveystudentconfirmfinshed'}>
                        next
                    </Button>
            
                </div>
                
            </div>         
        </main>
    )

}
export default App;
