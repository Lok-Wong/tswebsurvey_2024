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
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import FormHelperText from '@mui/material/FormHelperText';

function App() {
    const router = useRouter();
    const blanksurvey = {
        startTime: new Date(),
        leaveShcoolTime: "",
        pickup: 999,
        otherOfPickup: 999,
        directToPort: 999,
        portForHome: 999,
        otherOfportForHome: 999,
        commonTransirtation: 999,
        otherOfCommonTransirtation: 999,
        arrivalPortTime: "",
        arrivalHomeTime: "",
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

            const local_storage_value_str = sessionStorage.getItem(_studentNum + 'crossRd2');
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
        if (survey.leaveShcoolTime == "") {
            handleHelpText("leaveShcoolTime", "請選擇離校時間")
            return
        }
        if (survey.pickup == 999) {
            handleHelpText("pickup", "請選擇是否有人接送")
            return
        }
        if (survey.pickup == "其他監護人" && survey.otherOfPickup == 999) {
            handleHelpText("pickup", "請填寫其他監護人")
            return
        }
        if (survey.directToPort == 999) {
            handleHelpText("directToPort", "請選擇是否直接前往通關口岸")
            return
        }
        if (survey.portForHome == 999) {
            handleHelpText("portForHome", "請選擇回家使用的通關口岸")
            return
        }
        if (survey.portForHome == "其他" && survey.otherOfportForHome == 999) {
            handleHelpText("portForHome", "請填寫其他通關口岸")
            return
        }
        if (survey.commonTransirtation == 999) {
            handleHelpText("commonTransirtation", "請選擇過關後，前往學校的主要交通方式")
            return
        }
        if (survey.commonTransirtation == "其他" && survey.otherOfCommonTransirtation == 999) {
            handleHelpText("commonTransirtation", "請填寫其他交通方式")
            return
        }
        if (survey.arrivalPortTime == "") {
            handleHelpText("TimeEndToMacau", "請選擇到達口岸的時間")
            return
        }
        if (survey.arrivalHomeTime == "") {
            handleHelpText("arrivalHomeTime", "請選擇回到家的時間")
            return
        }
        if (survey.leaveShcoolTime == survey.arrivalPortTime) {
            handleHelpText("leaveShcoolTime", "離校時間與到達口岸時間不可相同")
            handleHelpText("arrivalPortTime", "到達口岸時間與離校時間不可相同")
            return
        }
        if (survey.arrivalPortTime == survey.arrivalHomeTime) {
            handleHelpText("arrivalPortTime", "到達口岸時間與回到家時間不可相同")
            handleHelpText("arrivalHomeTime", "回到家時間與到達口岸時間不可相同")
            return
        }
        if (survey.leaveShcoolTime > survey.arrivalPortTime) {
            handleHelpText("leaveShcoolTime", "離校時間不可晚於到達口岸時間")
            handleHelpText("arrivalPortTime", "到達口岸時間不可早於離校時間")
            return
        }
        if (survey.leaveShcoolTime > survey.arrivalHomeTime) {
            handleHelpText("leaveShcoolTime", "離校時間不可晚於到達家時間")
            handleHelpText("arrivalHomeTime", "回到家時間不可早於離校時間")
            return
        }
        if (survey.arrivalPortTime > survey.arrivalHomeTime) {
            handleHelpText("arrivalPortTime", "到達口岸時間不可晚於回到家時間")
            handleHelpText("arrivalHomeTime", "回到家時間不可早於離校時間")
            return
        }
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/surveyBadWeather')
    }



    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem(_studentNum + 'crossRd2', JSON.stringify(survey))
        setHelpText(blankHelpText)
        console.log(survey)
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

        if (survey.otherOfportForHome != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfportForHome: 999
                }
            ))
        }


    }, [survey.pickup,
    survey.commonTransirtation,
    survey.otherOfportForHome])

    React.useEffect(() => {
        if (storedPathList != null) {
            console.log("storedPathList12", storedPathList)
            setStoredPathList([...storedPathList, window.location.pathname])
        }
    }, [])

    React.useEffect(() => {
        if (sessionStorage.getItem('pathList') === null) {
            router.replace("./")
            return
        }
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyCrossRd") {
            router.replace("./")
        }
    }, [])

    const [finishStatus, setfinishStatus] = React.useState(false);

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        //   if (!finishStatus) {
        //       if (window.confirm("Do you want to go back ?")) {
        //         setfinishStatus(true)
        const copyArr = [...storedPathList]
        const prevPath = copyArr[copyArr.length - 1]
        copyArr.splice(-1)
        sessionStorage.setItem('pathList', copyArr)
        router.back()
        //       } else {
        //           window.history.pushState(null, null, window.location.pathname);
        //           setfinishStatus(false)
        //       }
        //   }
    }

    React.useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, []);



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div>
                        <h2 style={{ color: "#000000" }}>
                            4.2	一般情況下，學生下午放學的情況
                        </h2>

                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="leaveShcoolTime-label"><h3>7)	離校時間（24小時制）：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.leaveShcoolTime)}
                                            onChange={(event) => handleTimeChange(event, "leaveShcoolTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.leaveShcoolTime}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>8)    有沒有人接送：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行離校" control={<Radio />} label="學生自行上學" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="補習社" control={<Radio />} label="補習社" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他監護人" control={<Radio />} label="其他監護人" />
                                    {survey.pickup === "其他監護人" ?
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
                            <FormControl>
                                <FormLabel id="directToPort-label"><h3>9)	放學是否直接前往通關口岸？</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="directToPort-label"
                                    name="directToPort"
                                    value={survey.directToPort}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="是" />
                                    <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="否" />

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.directToPort}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="portForHome-label"><h3>10)	回家使用的通關口岸：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForHome-label"
                                    name="portForHome"
                                    value={survey.portForHome}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="關閘" control={<Radio />} label="關閘" />
                                    <FormControlLabel sx={{ color: "black" }} value="青茂" control={<Radio />} label="青茂" />
                                    <FormControlLabel sx={{ color: "black" }} value="港珠澳" control={<Radio />} label="港珠澳" />
                                    <FormControlLabel sx={{ color: "black" }} value="橫琴" control={<Radio />} label="橫琴" />
                                    <FormControlLabel sx={{ color: "black" }} value="內港" control={<Radio />} label="內港" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />

                                    {survey.portForHome === "其他" ?
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 0.5, width: '10rem' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField
                                                name='otherOfportForHome'
                                                id="otherOfportForHome-textfill"
                                                label="其他"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.portForHome == 999 ? null : survey.portForHome}
                                            />
                                        </Box>
                                        :
                                        null
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.portForHome}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl
                            >
                                <FormLabel
                                    component="commonTransiration"><h3>11)	過關後，前往學校的主要交通方式：</h3></FormLabel>
                                <RadioGroup
                                    name='commonTransirtation'
                                    value={survey.commonTransirtation}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        control={
                                            <Radio value="電單車（乘客）" />
                                        }
                                        label="電單車（乘客）"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="私家車（乘客）" />
                                        }
                                        label="私家車（乘客）"
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
                                            <Radio value="巴士" />
                                        }
                                        label="巴士"
                                        sx={{ color: "black" }}
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
                                            <Radio value="一般的士" />
                                        }
                                        label="一般的士"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="電召的士" />
                                        }
                                        label="電召的士"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="步行" />
                                        }
                                        label="步行"
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
                                <FormLabel id="arrivalPortTime-label"><h3>12)	到達口岸的時間（24小時制）</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.arrivalPortTime)}
                                            onChange={(event) => handleTimeChange(event, "arrivalPortTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.arrivalPortTime}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="arrivalHomeTime-label"><h3>13)	回到家的時間（24小時制）：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.arrivalHomeTime)}
                                            onChange={(event) => handleTimeChange(event, "arrivalHomeTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.arrivalHomeTime}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    : null
            }
            <div className={styles.buttonGroup}>
                <Button className={styles.buttonStyle} onClick={() => router.back()}>
                    上一頁
                </Button>
                <Button className={styles.buttonStyle} onClick={handleNextButton}>
                    下一頁
                </Button>
            </div>
        </main>
    )

}
export default App;
