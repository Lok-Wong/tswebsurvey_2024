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
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import LinearProgresss from '@/app/utils/progress';

function App() {
    const router = useRouter();
    const blanksurvey = {
        startTime: new Date(),
        pickup: 999,
        otherOfPickup: 999,
        TimeStartFromHome: "",
        portForShcool: 999,
        otherOfpPortForShcool: 999,
        TimeEndToMacau: "",
        commonTransirtation: 999,
        otherOfCommonTransirtation: 999,
        arrivalTimeToSchool: "",
    }

    const blankHelpText = {}

    const [helpText, setHelpText] = React.useState(blankHelpText)
    const handleHelpText = (eventName, errorText) => {
        const objectName = eventName
        setHelpText((prevState) => (
            {
                ...prevState,
                [objectName]: errorText
            }
        ))
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
            const local_storage_value_str = sessionStorage.getItem(_studentNum + 'crossRd');
            // If there is a value stored in localStorage, use that
            if (local_storage_value_str) {
                return JSON.parse(local_storage_value_str);
            }
        }
        // Otherwise use initial_value that was passed to the function
        return blanksurvey;
    }, []);

    const _initial_pathListe = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_path_list = sessionStorage.getItem('pathList') ? sessionStorage.getItem('pathList').split(",") : null;
            // If there is a value stored in localStorage, use that
            if (local_storage_path_list) {
                return (local_storage_path_list);
            }
        }
    }, []);

    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)

    const [survey, setSurvey] = React.useState(_initial_value)

    const [progressBarValue, setProgressBarValue] = React.useState(30)


    const handleChange = (event) => {
        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                [objectName]: event.target.value
            }
        )

        )
    };

    const handleTimeChange = (event, name) => {
        setSurvey((prevState) => ({
            ...prevState,
            [name]: event.$d
        })
        )
    };

    const handleNextButton = (event) => {
        if (survey.pickup == 999) {
            handleHelpText("pickup", "請選擇一個選項")
            return
        }
        if (survey.TimeStartFromHome == "") {
            handleHelpText("TimeStartFromHome", "請選擇時間")
            return
        }
        if (survey.portForShcool == 999) {
            handleHelpText("portForShcool", "請選擇一個選項")
            return
        }
        if (survey.TimeEndToMacau == "") {
            handleHelpText("TimeEndToMacau", "請選擇時間")
            return
        }
        if (survey.commonTransirtation == 999) {
            handleHelpText("commonTransirtation", "請選擇一個選項")
            return
        }
        if (survey.arrivalTimeToSchool == "") {
            handleHelpText("arrivalTimeToSchool", "請選擇時間")
            return
        }
        if (JSON.stringify(survey.TimeStartFromHome) == JSON.stringify(survey.TimeEndToMacau)) {
            handleHelpText("TimeStartFromHome", "時間不能相同")
            handleHelpText("TimeEndToMacau", "時間不能相同")
            return
        }

        if (survey.TimeStartFromHome > survey.TimeEndToMacau) {
            handleHelpText("TimeStartFromHome", "時間不能大於到達時間")
            handleHelpText("TimeEndToMacau", "時間不能小於出發時間")
            return
        }

        if (survey.TimeStartFromHome > survey.arrivalTimeToSchool) {
            handleHelpText("TimeStartFromHome", "時間不能大於到達時間")
            handleHelpText("arrivalTimeToSchool", "時間不能小於出發時間")
            return
        }

        if (survey.TimeEndToMacau > survey.arrivalTimeToSchool) {
            handleHelpText("TimeEndToMacau", "時間不能大於到達時間")
            handleHelpText("arrivalTimeToSchool", "時間不能小於出發時間")
            return
        }

        if (survey.TimeStartFromHome == survey.arrivalTimeToSchool) {
            handleHelpText("TimeStartFromHome", "時間不能相同")
            handleHelpText("arrivalTimeToSchool", "時間不能相同")
            return
        }

        if (survey.TimeEndToMacau == survey.arrivalTimeToSchool) {
            handleHelpText("TimeStartFromHome", "時間不能相同")
            handleHelpText("arrivalTimeToSchool", "時間不能相同")
            return
        }
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/surveyCrossRd2')
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem(_studentNum + 'crossRd', JSON.stringify(survey))
        setHelpText(blankHelpText)
    }, [survey])

    React.useEffect(() => {
        if (survey.pickup != "其他監護人") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfPickup: 999
                }
            ))
        }

        if (survey.commonTransirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfCommonTransirtation: 999
                }
            ))
        }

        if (survey.otherOfpPortForShcool != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfpPortForShcool: 999
                }
            ))
        }


    }, [survey.pickup,
    survey.commonTransirtation,
    survey.otherOfpPortForShcool])

    React.useEffect(() => {
        if (storedPathList != null) {
            setStoredPathList([...storedPathList, window.location.pathname])
        }
    }, [])

    React.useEffect(() => {
        if (sessionStorage.getItem('pathList') === null) {
            router.replace("./")
            return
        }
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveystudentinfo") {
            router.replace("./")
        }
    }, [])

    const [finishStatus, setfinishStatus] = React.useState(false);

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        //   if (!finishStatus) {
        //   if (window.confirm("Do you want to go back ?")) {
        //     setfinishStatus(true)
        const copyArr = [...storedPathList]
        const prevPath = copyArr[copyArr.length - 1]
        copyArr.splice(-1)
        sessionStorage.setItem('pathList', copyArr)
        router.back()
        //   } else {
        //       window.history.pushState(null, null, window.location.pathname);
        //       setfinishStatus(false)
        //   }
        //   }
    }

    React.useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        console.log('i fire once');
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);

    React.useEffect(() => {
        if (survey.arrivalTimeToSchool != "") {
            setProgressBarValue(40)
            return
        } else {
            setProgressBarValue(30)
        }
    }, [survey]);



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div>
                        <h1 style={{ color: "#000000" }}>
                            四、跨境上學及放學出行情況
                        </h1>
                        <h2 style={{ color: "#000000" }}>
                            4.1 一般情況下，學生早上上學的情況
                        </h2>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>1)    學生早上上學有無人送：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行上學" control={<Radio />} label="學生自行上學" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他（如︰監護人、親戚等）" />
                                    {survey.pickup === "其他" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                inputProps={{ maxLength: 10 }}
                                                name='otherOfPickup'
                                                id="pickup-other-textfill"
                                                label="其他"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.otherOfPickup == 999 ? null : survey.otherOfPickup}
                                            />
                                        </Box>
                                        :
                                        null
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.pickup}</FormHelperText>

                            </FormControl>
                        </div>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="TimeStartFromHome-label"><h3>2) 從家出發的時間(24 小時制)：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker

                                            ampm={false}
                                            value={dayjs(survey.TimeStartFromHome)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                }
                                                handleTimeChange(event, "TimeStartFromHome")
                                            }
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.TimeStartFromHome}</FormHelperText>

                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="portForShcool-label"><h3>3) 前往學校的通關口岸：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForShcool-label"
                                    name="portForShcool"
                                    value={survey.portForShcool}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="關閘" control={<Radio />} label="關閘" />
                                    <FormControlLabel sx={{ color: "black" }} value="青茂口岸" control={<Radio />} label="青茂口岸" />
                                    <FormControlLabel sx={{ color: "black" }} value="港珠澳大橋澳門口岸" control={<Radio />} label="港珠澳大橋澳門口岸" />
                                    <FormControlLabel sx={{ color: "black" }} value="橫琴口岸澳門口岸區" control={<Radio />} label="橫琴口岸澳門口岸區" />
                                    <FormControlLabel sx={{ color: "black" }} value="內港客運碼頭" control={<Radio />} label="內港客運碼頭" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />

                                    {survey.portForShcool === "其他" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                inputProps={{ maxLength: 10 }}
                                                name='otherOfPickup'
                                                id="pickup-other-textfill"
                                                label="其他"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.portForShcool == 999 ? null : survey.portForShcool}
                                            />
                                        </Box>
                                        :
                                        null
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.portForShcool}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="TimeEndToMacau-label"><h3>4)過關後,由澳門口岸出發前往學校的時間(24 小時制)：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.TimeEndToMacau)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                };
                                                handleTimeChange(event, "TimeEndToMacau")
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.TimeEndToMacau}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl
                                variant="standard"
                            >
                                <FormLabel component="commonTransiration"><h3>5)	過關後，前往學校的主要交通方式：</h3></FormLabel>
                                <RadioGroup
                                    name='commonTransirtation'
                                    value={survey.commonTransirtation}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        control={
                                            <Radio value="步行" />
                                        }
                                        label="步行"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="公共巴士" />
                                        }
                                        label="公共巴士"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="私家車" />
                                        }
                                        label="私家車"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        sx={{ color: "black" }}
                                        control={
                                            <Radio value="電單車" />
                                        }
                                        label="電單車"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="輕軌" />
                                        }
                                        label="輕軌"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="校車" />
                                        }
                                        label="校車"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="的士" />
                                        }
                                        label="的士"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="復康巴士" />
                                        }
                                        label="復康巴士"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="其他" />
                                        }
                                        label="其他"
                                        sx={{ color: "black" }}
                                    />
                                    {survey.commonTransirtation === "其他" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                inputProps={{ maxLength: 10 }}
                                                id="commonTransiration-other-textfill"
                                                label="其他"
                                                variant="filled"
                                                name='otherOfCommonTransirtation'
                                                onChange={handleChange}
                                                value={survey.otherOfCommonTransirtation == 999 ? null : survey.otherOfCommonTransirtation}
                                            />
                                        </Box>
                                        :
                                        null
                                    }

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.commonTransirtation}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="arrivalTimeToSchool-label"><h3>6)	到達學校時間（24小時制）</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.arrivalTimeToSchool)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                }
                                                handleTimeChange(event, "arrivalTimeToSchool")
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.arrivalTimeToSchool}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    :
                    null
            }
            <div className={styles.buttonGroup}>
                <LinearProgresss values={progressBarValue} />
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>

                    <Button className={styles.buttonStyle} onClick={() => router.back()}>
                        上一頁
                    </Button>
                    <Button className={styles.buttonStyle} onClick={handleNextButton}>
                        下一頁
                    </Button>
                </div>
            </div>
        </main>
    )

}
export default App;
