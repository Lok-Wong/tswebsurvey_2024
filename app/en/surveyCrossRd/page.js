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
            handleHelpText("pickup", "Please select an option")
            return
        }

        if (survey.pickup == "其他") {
            if (survey.otherOfPickup == 999) {
                handleHelpText("pickup", "Please fill in Other")
                return
            }
        }

        if (survey.TimeStartFromHome == "Invalid Date") {
            handleHelpText("TimeStartFromHome", "Please select a new time")
            return
        }

        if (survey.TimeStartFromHome == "") {
            handleHelpText("TimeStartFromHome", "Please select a time")
            return
        }
        if (survey.portForShcool == 999) {
            handleHelpText("portForShcool", "Please select an option")
            return
        }
        if (survey.TimeEndToMacau == "Invalid Date") {
            handleHelpText("TimeEndToMacau", "Please select a new time")
            return
        }
        if (survey.TimeEndToMacau == "") {
            handleHelpText("TimeEndToMacau", "Please select a time")
            return
        }
        if (survey.commonTransirtation == 999) {
            handleHelpText("commonTransirtation", "Please select an option")
            return
        }
        if (survey.arrivalTimeToSchool == "Invalid Date") {
            handleHelpText("arrivalTimeToSchool", "Please select a new time")
            return
        }

        if (survey.arrivalTimeToSchool == "") {
            handleHelpText("arrivalTimeToSchool", "Please select a time")
            return
        }
        if (JSON.stringify(survey.TimeStartFromHome) == JSON.stringify(survey.TimeEndToMacau)) {
            handleHelpText("TimeEndToMacau", `The time should not be the same as "2) Departure time from home"`)
            return
        }

        if (dayjs(survey.TimeStartFromHome) > dayjs(survey.TimeEndToMacau)) {
            handleHelpText("TimeEndToMacau", `The time should not be earlier than "2) Departure time from home"`)
            return
        }

        if (dayjs(survey.TimeStartFromHome) > dayjs(survey.arrivalTimeToSchool)) {
            handleHelpText("arrivalTimeToSchool", `The time should not be earlier than "4) Departure time from the Border Checkpoint to School"`)
            return
        }

        if (dayjs(survey.TimeEndToMacau) > dayjs(survey.arrivalTimeToSchool)) {
            handleHelpText("arrivalTimeToSchool", `The time should not be earlier than "4) Departure time from the Border Checkpoint to School"`)
            return
        }

        if (JSON.stringify(survey.TimeEndToMacau) == JSON.stringify(survey.arrivalTimeToSchool)) {
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
    },[])



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div>
                        <h1 style={{ color: "#000000" }}>
                        IV. Cross-border traveling to and from school
                        </h1>
                        <h2 style={{ color: "#000000" }}>
                        4.1 Under normal circumstances, the situation of going to school in the morning
                        </h2>

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
                                        label="Private"
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
        </main>
    )

}
export default App;
