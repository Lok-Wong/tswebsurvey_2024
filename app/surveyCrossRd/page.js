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
        surveyCrossRd: {
            startTime: new Date(),
            pickup: 999,
            otherOfPickup: 999,
            TimeStartFromHome: 999,
            portForShcool: 999,
            otherOfpPortForShcool: 999,
            TimeEndToMacau: 999,
            commonTransirtation: 999,
            otherOfCommonTransirtation: 999,
            arrivalTimeToSchool: 999,
        }
    }

    const _studentNum = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_studentNum = sessionStorage.getItem('studentNum');
            if (local_storage_studentNum) {
                return local_storage_studentNum
            }
        }

        return 0;
    }, [])

    const _initial_value = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_value_str = sessionStorage.getItem(_studentNum + 'crossRd1');
            // If there is a value stored in localStorage, use that
            if (local_storage_value_str) {
                return JSON.parse(local_storage_value_str);
            }
        }
        // Otherwise use initial_value that was passed to the function
        return blanksurvey;
    }, []);

    const [survey, setSurvey] = React.useState(_initial_value)


    const handleChange = (event) => {
        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                surveyCrossRd: {
                    ...prevState.surveyCrossRd,
                    [objectName]: event.target.value
                }
            }
        )

        )
    };

    const handleTimeChange = (event, name) => {
        setSurvey((prevState) => ({
            ...prevState,
            surveyCrossRd: {
                ...prevState.surveyCrossRd,
                [name]: event.$d
            }
        })
        )
    };

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem(_studentNum + 'crossRd1', JSON.stringify(survey))
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        if (survey.surveyCrossRd.pickup != "其他監護人") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyCrossRd: {
                        ...prevState.surveyCrossRd,
                        otherOfPickup: 999
                    }
                }
            ))
        }

        if (survey.surveyCrossRd.commonTransirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyCrossRd: {
                        ...prevState.surveyCrossRd,
                        otherOfCommonTransirtation: 999
                    }
                }
            ))
        }

        if (survey.surveyCrossRd.otherOfpPortForShcool != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    surveyCrossRd: {
                        ...prevState.surveyCrossRd,
                        otherOfpPortForShcool: 999
                    }
                }
            ))
        }


    }, [survey.surveyCrossRd.pickup,
    survey.surveyCrossRd.commonTransirtation,
    survey.surveyCrossRd.otherOfpPortForShcool])



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div style={{ minWidth: "100%" }}>
                        <h1 style={{ color: "#000000" }}>
                            四、跨境上學及放學出行
                        </h1>
                        <h2 style={{ color: "#000000" }}>
                            a)一般情況下，學生早上上學的情況
                        </h2>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>1.    有沒有人接送：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.surveyCrossRd.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="學生自行上學" control={<Radio />} label="學生自行上學" />
                                    <FormControlLabel value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel value="其他監護人" control={<Radio />} label="其他監護人" />
                                    {survey.surveyCrossRd.pickup === "其他監護人" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                name='otherOfPickup'
                                                id="pickup-other-textfill"
                                                label="其他"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.surveyCrossRd.otherOfPickup == 999 ? null : survey.surveyCrossRd.otherOfPickup}
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
                                <FormLabel id="TimeStartFromHome-label"><h3>2) 從家出發時間：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyCrossRd.TimeStartFromHome)}
                                            onChange={(event) => handleTimeChange(event, "TimeStartFromHome")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="portForShcool-label"><h3>3) 前往學校的通關口岸：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForShcool-label"
                                    name="portForShcool"
                                    value={survey.surveyCrossRd.portForShcool}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="關閘" control={<Radio />} label="關閘" />
                                    <FormControlLabel value="青茂" control={<Radio />} label="青茂" />
                                    <FormControlLabel value="港珠澳" control={<Radio />} label="港珠澳" />
                                    <FormControlLabel value="橫琴" control={<Radio />} label="橫琴" />
                                    <FormControlLabel value="內港" control={<Radio />} label="內港" />
                                    <FormControlLabel value="其他" control={<Radio />} label="其他" />

                                    {survey.surveyCrossRd.portForShcool === "其他" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                name='otherOfPickup'
                                                id="pickup-other-textfill"
                                                label="其他"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.surveyCrossRd.portForShcool == 999 ? null : survey.surveyCrossRd.portForShcool}
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
                                <FormLabel id="TimeEndToMacau-label"><h3>4)過關後，到達澳門時間：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyCrossRd.TimeEndToMacau)}
                                            onChange={(event) => handleTimeChange(event, "TimeEndToMacau")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl
                                variant="standard"
                            >
                                <FormLabel component="commonTransiration"><h3>5)	過關後，前往學校的主要交通方式：</h3></FormLabel>
                                <RadioGroup
                                    name='commonTransirtation'
                                    value={survey.surveyCrossRd.commonTransirtation}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        control={
                                            <Radio value="電單車（乘客）" />
                                        }
                                        label="電單車（乘客）"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="私家車（乘客）" />
                                        }
                                        label="私家車（乘客）"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="校車" />
                                        }
                                        label="校車"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="巴士" />
                                        }
                                        label="巴士"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="輕軌" />
                                        }
                                        label="輕軌"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="一般的士" />
                                        }
                                        label="一般的士"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="電召的士" />
                                        }
                                        label="電召的士"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="步行" />
                                        }
                                        label="步行"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="其他" />
                                        }
                                        label="其他"
                                    />
                                    {survey.surveyCrossRd.commonTransirtation === "其他" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                id="commonTransiration-other-textfill"
                                                label="其他"
                                                variant="filled"
                                                name='otherOfCommonTransirtation'
                                                onChange={handleChange}
                                                value={survey.surveyCrossRd.otherOfCommonTransirtation == 999 ? null : survey.surveyCrossRd.otherOfCommonTransirtation}
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
                                <FormLabel id="arrivalTimeToSchool-label"><h3>6)	到達學校時間（24小時制）</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <TimePicker
                                            ampm={false}
                                            value={dayjs(survey.surveyCrossRd.arrivalTimeToSchool)}
                                            onChange={(event) => handleTimeChange(event, "arrivalTimeToSchool")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </div>
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
                                back
                            </Button>
                            <Button href={'/surveyCrossRd2'}>
                                next
                            </Button>
                        </div>

                    </div>
                    :
                    null
            }
        </main>
    )

}
export default App;
