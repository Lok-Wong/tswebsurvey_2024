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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "../englishPage.css";

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
    const [openAlertBar, setOpenAlertBar] = React.useState(false)
    const [survey, setSurvey] = React.useState(_initial_value)

    const [progressBarValue, setProgressBarValue] = React.useState(30)
    const handleAlertBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlertBar(false);
    };

    const handleAlertBarOpen = () => {
        setOpenAlertBar(true);
    };

    const [vCodeError, setVCodeError] = React.useState(false)


    const handleChange = (event) => {
        console.log(event.target.value)
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
            handleAlertBarOpen()
            setVCodeError("1) Please select an option")
            handleHelpText("pickup", "Please select an option")
            return
        }

        if (survey.pickup == "其他") {
            if (survey.otherOfPickup == 999) {
                handleAlertBarOpen()
                setVCodeError("1) Please fill in Other")
                handleHelpText("pickup", "Please fill in Other")
                return
            }
        }

        if (survey.TimeStartFromHome == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("2) Please select a new time")
            handleHelpText("TimeStartFromHome", "Please select a new time")
            return
        }

        if (survey.TimeStartFromHome == "") {
            handleAlertBarOpen()
            setVCodeError("2) Please select a time")
            handleHelpText("TimeStartFromHome", "Please select a time")
            return
        }
        if (survey.portForShcool == 999) {
            handleAlertBarOpen()
            setVCodeError("3) Please select a Border Checkpoint")
            handleHelpText("portForShcool", "Please select a Border Checkpoint")
            return
        }
        if (survey.TimeEndToMacau == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("4) Please select a new time")
            handleHelpText("TimeEndToMacau", "Please select a new time")
            return
        }
        if (survey.TimeEndToMacau == "") {
            handleAlertBarOpen()
            setVCodeError("4) Please select a time")
            handleHelpText("TimeEndToMacau", "Please select a time")
            return
        }
        if (survey.commonTransirtation == 999) {
            handleAlertBarOpen()
            setVCodeError("5) Please select the primary mode of transportation")
            handleHelpText("commonTransirtation", "Please select an option")
            return
        }

        if (survey.commonTransirtation == "其他") {
            if (survey.otherOfCommonTransirtation == "" || survey.otherOfCommonTransirtation == 999) {
                handleAlertBarOpen()
                setVCodeError("5) Please fill in Other")
                handleHelpText("commonTransirtation", "Please fill in Other")
                return
            }
        }
        if (survey.arrivalTimeToSchool == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("6) Please select a new time")
            handleHelpText("arrivalTimeToSchool", "Please select a new time")
            return
        }

        if (survey.arrivalTimeToSchool == "") {
            handleAlertBarOpen()
            setVCodeError("6) Please select a time")
            handleHelpText("arrivalTimeToSchool", "Please select a time")
            return
        }
        if (JSON.stringify(survey.TimeStartFromHome) == JSON.stringify(survey.TimeEndToMacau)) {
            handleAlertBarOpen()
            setVCodeError(`4) The time should not be the same as "2) Departure time from home"`)
            handleHelpText("TimeEndToMacau", `The time should not be the same as "2) Departure time from home"`)
            return
        }

        if (dayjs(survey.TimeStartFromHome) > dayjs(survey.TimeEndToMacau)) {
            handleAlertBarOpen()
            setVCodeError(`4) The time should not be earlier than "2) Departure time from home"`)
            handleHelpText("TimeEndToMacau", `The time should not be earlier than "2) Departure time from home"`)
            return
        }

        if (dayjs(survey.TimeStartFromHome) > dayjs(survey.arrivalTimeToSchool)) {
            handleAlertBarOpen()
            setVCodeError(`6) The time should not be earlier than "4) Departure time from the Border Checkpoint to School"`)
            handleHelpText("arrivalTimeToSchool", `The time should not be earlier than "4) Departure time from the Border Checkpoint to School"`)
            return
        }

        if (dayjs(survey.TimeEndToMacau) > dayjs(survey.arrivalTimeToSchool)) {
            handleAlertBarOpen()
            setVCodeError(`6) The time should not be earlier than "4) Departure time from the Border Checkpoint to School"`)
            handleHelpText("arrivalTimeToSchool", `The time should not be earlier than "4) Departure time from the Border Checkpoint to School"`)
            return
        }

        if (JSON.stringify(survey.TimeEndToMacau) == JSON.stringify(survey.arrivalTimeToSchool)) {
            handleAlertBarOpen()
            setVCodeError(`The time should not be the same as "4) Departure time from the Border Checkpoint to School"`)
            handleHelpText("arrivalTimeToSchool", `The time should not be the same as "4) Departure time from the Border Checkpoint to School"`)
            return
        }
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/en/surveyCrossRd2')
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
        if (survey.pickup != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfPickup: 999
                }
            )
            )
            return
        }

        if (survey.commonTransirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfCommonTransirtation: 999
                }
            ))
            return
        }

        if (survey.portForShcool != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfpPortForShcool: 999
                }
            ))
            return
        }


    }, [survey.pickup,
    survey.commonTransirtation,
    survey.portForShcool])

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

    React.useEffect(() => {
        sessionStorage.setItem('checkschoolName',null)
    }, [])



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div className={styles.pageWidth}>
                        <div>
                            <h1 style={{ color: "#000000"}}>
                            IV. Cross-border traveling to/from school
                            </h1>
                            <h2 style={{ color: "#000000" }}>
                            4.1 The commuting behaviours of students to school under normal circumstances
                            </h2>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>1)  Is there anyone accompanying the student to school in the morning:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行上學" control={<Radio />} label="The student goes to school on his/her own" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="Parents" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="Domestic Helper" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="Others (e.g., Guardians, Relatives, etc.)" />
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
                                                label="Others"
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
                                <FormLabel id="TimeStartFromHome-label"><h3>2) Departure time from home (24-Hour Clock):</h3></FormLabel>
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
                                <FormLabel id="portForShcool-label"><h3>3) The Border Checkpoint for traveling to school:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForShcool-label"
                                    name="portForShcool"
                                    value={survey.portForShcool}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="關閘" control={<Radio />} label="Border Gate" />
                                    <FormControlLabel sx={{ color: "black" }} value="青茂口岸" control={<Radio />} label="Qingmao" />
                                    <FormControlLabel sx={{ color: "black" }} value="港珠澳大橋澳門口岸" control={<Radio />} label="Hong Kong-Zhuhai-Macao Bridge Frontier Post at Macao Port" />
                                    <FormControlLabel sx={{ color: "black" }} value="橫琴口岸澳門口岸區" control={<Radio />} label="Macao Port Zone of Hengqin Port" />
                                    <FormControlLabel sx={{ color: "black" }} value="內港客運碼頭" control={<Radio />} label="Inner Harbour Ferry Terminal" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="Other" />

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
                                                name='otherOfpPortForShcool'
                                                id="pickup-other-textfills"
                                                label="Other"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.otherOfpPortForShcool == 999 ? null : survey.otherOfpPortForShcool}
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
                                <FormLabel id="TimeEndToMacau-label"><h3>4) The time of departure from the Macau port to the school after crossing the border (24-hour system):</h3></FormLabel>
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
                                <FormLabel component="commonTransiration"><h3>5) The main mode of transportation to the school after crossing the border:</h3></FormLabel>
                                <p className={styles.remind}>*(If you need to use two or more means of transportation during the process, please choose the one you think is more important.)</p>
                                <RadioGroup
                                    name='commonTransirtation'
                                    value={survey.commonTransirtation}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                        control={
                                            <Radio value="步行" />
                                        }
                                        label="Walk"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="公共巴士" />
                                        }
                                        label="Bus"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="私家車" />
                                        }
                                        label="Private Car"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        sx={{ color: "black" }}
                                        control={
                                            <Radio value="電單車" />
                                        }
                                        label="Motorcycle"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="輕軌" />
                                        }
                                        label="Light Rail"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="校車" />
                                        }
                                        label="School Bus"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="的士" />
                                        }
                                        label="Taxi"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="復康巴士" />
                                        }
                                        label="Rehabus"
                                        sx={{ color: "black" }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio value="其他" />
                                        }
                                        label="Other"
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
                                                label="Other"
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
                                <FormLabel id="arrivalTimeToSchool-label"><h3>6) Arrival time at school (24-hour system):</h3></FormLabel>
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
                        Previous Page
                    </Button>
                    <Button className={styles.buttonStyle} onClick={handleNextButton}>
                        Next Page
                    </Button>
                </div>
            </div>
            <Snackbar
                open={openAlertBar}
                autoHideDuration={2000}
                onClose={handleAlertBarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    autohideduration={2000}
                    onClose={handleAlertBarClose}
                    severity="error"
                    variant="filled"
                >
                    {vCodeError}
                </Alert>
            </Snackbar>

        </main>
    )

}
export default App;
