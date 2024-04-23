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
        surveyNormalRd2 : {
            startTime : new Date(),
            leaveSchoolTime: 999,
            otherleavePickUp:999,
            leavePickUp:999,
            directToHomeState: 999,
            directToHomeYes:{
                arivalHomeTime:999,
                arivalHomeTransition:999,
                otherarivalHomeTransition:999
            },
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
    const _studentNum = React.useMemo(() => {
        const local_storage_studentNum = localStorage.getItem('studentNum');
        if (local_storage_studentNum){
            return local_storage_studentNum
        }
        return 0;
    },[])

    const _initial_value = React.useMemo(() => {
        const local_storage_value_str = localStorage.getItem(('normalRd2'+_studentNum));
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
    survey && localStorage.setItem(('normalRd2'+_studentNum),JSON.stringify(survey))
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
                    3.2	一般情況下，學生下午放學的情況
                </h1>
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="evening-leave-school-time-label">10) 離校時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={dayjs(survey.surveyNormalRd2.leaveSchoolTime)}
                                        onChange={(event) => handleTimeChange(event,"leaveSchoolTime")}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>
                </div>
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="pickup-leave-school-way-label">11)	有沒有人接送:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="pickup-leave-school-way-label"
                            name="leavePickUp"
                            value={survey.surveyNormalRd2.leavePickUp}
                            onChange={handleChange}
                            >
                            <FormControlLabel value="學生自行離校" control={<Radio />} label="學生自行離校" />
                            <FormControlLabel value="父母" control={<Radio />} label="父母" />
                            <FormControlLabel value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
                            <FormControlLabel value="工人" control={<Radio />} label="工人" />
                            <FormControlLabel value="補習社" control={<Radio />} label="補習社" />
                            <FormControlLabel value="其他" control={<Radio />} label="其他" />
                            { survey.surveyNormalRd2.leavePickUp == "其他" ?
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField 
                                        id="pickup-leave-school-way-other-textfill" 
                                        label="其他" 
                                        variant="filled"
                                        onChange={handleChange} 
                                        name = "otherleavePickUp"
                                        value={survey.surveyNormalRd2.otherleavePickUp == 999 ? "" : survey.surveyNormalRd2.otherleavePickUp}
                                    />
                                </Box>
                                :
                                null
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="back-home-dircetly-label">12)	放學是否直接回家？</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="back-home-dircetly-label"
                            name="directToHomeState"
                            onChange={handleChange}
                            value={survey.surveyNormalRd2.directToHomeState}
                            >
                            <FormControlLabel value="是" control={<Radio />} label="是" />
                            <FormControlLabel value="否" control={<Radio />} label="否" />
                        </RadioGroup>
                    </FormControl>
                </div>

                {
                survey.surveyNormalRd2.directToHomeState == "是" ?
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="arrival-home-time-label">到達家時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={dayjs(survey.surveyNormalRd2.directToHomeYes.arivalHomeTime)}
                                        onChange={(event) => handleChangeBackHomeTime(event,"arivalHomeTime")}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="arrival-home-transition-label">回家主要的交通方式：</FormLabel>
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
                :
                <div className={styles.question}>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="leave-shcool-arrival-destination-label">放學後去了哪裏:</FormLabel>
                          <p>choose loaction</p>
                          <Button>
                            touch and choose loaction
                          </Button>
                        </FormControl>
                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="leave-shcool-arrival-destination-time-label">到達目的地時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={dayjs(survey.surveyNormalRd2.directToHomeNo.leaveDestinationTime)}
                                        onChange={(event) => handleChangeBackHomeTime(event,"leaveDestinationTime")}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="leave-shcool-arrival-destination-transition-label">回家主要的交通方式：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="leave-shcool-arrival-destination-transition-label"
                            name="leaveDestinationTransition"
                            onChange={handleChangeBackHome}
                            value={survey.surveyNormalRd2.directToHomeNo.leaveDestinationTransition}
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
                                survey.surveyNormalRd2.directToHomeNo.leaveDestinationTransition == "其他" ?
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField 
                                        id="leave-shcool-arrival-destination-transition-other-textfill" 
                                        label="其他" 
                                        variant="filled"
                                        onChange={handleChangeBackHome}
                                        name = "otherLeaveDestinationTransition"
                                        value={survey.surveyNormalRd2.directToHomeNo.otherLeaveDestinationTransition == 999 ? "" : survey.surveyNormalRd2.directToHomeNo.otherLeaveDestinationTransition} 
                                    />
                                </Box>
                                :
                                null
                            }
                        </RadioGroup>
                    </FormControl>

                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="leave-shcool-arrival-destination-time-label">從上述地方出發回家的時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={dayjs(survey.surveyNormalRd2.directToHomeNo.destinationBackHomeStartTime)}
                                        onChange={(event) => handleChangeBackHomeTime(event,"destinationBackHomeStartTime")}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>

                    <FormControl className={styles.inlineQuestion}>
                        <FormLabel id="leave-shcool-arrival-destination-time-label">到達家時間（24小時制）:</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <TimePicker
                                        ampm={false}
                                        value={dayjs(survey.surveyNormalRd2.directToHomeNo.destinationBackHomeEndTime)}
                                        onChange={(event) => {handleChangeBackHomeTime(event,"destinationBackHomeEndTime")}}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                    </FormControl>

                                
                    <FormControl>
                        <FormLabel id="leave-shcool-and-back-home-transition-label">前目的地回家主要的交通方式：</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="leave-shcool-and-back-home-transition-label"
                            name="leaveDestinationBackHomeTransition"
                            value={survey.surveyNormalRd2.directToHomeNo.leaveDestinationBackHomeTransition}
                            onChange={handleChangeBackHome}
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
                                survey.surveyNormalRd2.directToHomeNo.leaveDestinationBackHomeTransition == "其他" ?
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField 
                                        id="leave-shcool-and-back-home-transition-other-textfill" 
                                        label="其他" 
                                        variant="filled" 
                                        value={survey.surveyNormalRd2.directToHomeNo.otherLeaveDestinationBackHomeTransition == 999 ? "" : survey.surveyNormalRd2.directToHomeNo.otherLeaveDestinationBackHomeTransition}
                                        name='otherLeaveDestinationBackHomeTransition'
                                        onChange={handleChangeBackHome}
                                    />
                                </Box>
                                :
                                null
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
                }



                {/* <h1>
                    2.4 學生出行意見和建議
                </h1>

                <div className={styles.question}>
                    <FormControl sx={{
                        m:1, width:"100%"
                    }}>
                        <FormLabel id="student-suggestion-label">13)	爲了更好服務學生，您對上下學出行有何意見或建議？（選填）：</FormLabel>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '60%' },
                            }}
                            noValidate
                            >
                            <TextField 
                                id="student-suggestion-text" 
                                label="年級" 
                                variant="outlined" 
                                multiline
                            />
                        </Box>
                    </FormControl>
                </div> */}

                <div className={styles.question}>
                    <Button onClick={() => router.back()}>
                        previous *need check which is previous page
                    </Button>
                    <Button href={'/surveyBadWeather'}>
                        next
                    </Button>
            
                </div>
                
            </div>         
        </main>
    )

}
export default App;
