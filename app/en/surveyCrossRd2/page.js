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
import MapComponent from '@/app/mapTesting/page';
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "../englishPage.css";

function App() {
    const router = useRouter();
    const blanksurvey = {
        startTime: new Date(),
        leaveShcoolTime: "",
        pickup: 999,
        otherOfPickup: 999,
        portForHome: 999,
        otherOfportForHome: 999,
        directToPort: 999,
        directToPortYes: {
            arrivalTime: "",
            transirtation: 999,
            othertransirtation: 999,
        },
        directToPortNo: {
            address: 999,
            arrivalTime: "",
            transirtation: 999,
            othertransirtation: 999,
        },
    }

    const blankHelpText = {}
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [key, setKey] = React.useState(0)
    const [seed, setSeed] = React.useState(1);
    const [progressBarValue, setProgressBarValue] = React.useState(40)
    const [openAlertBar, setOpenAlertBar] = React.useState(false)

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

    const reset = () => {
        setSeed(Math.random());
    }

    const handleHelpText = (eventName, errorText) => {
        const objectName = eventName
        setHelpText((prevState) => (
            {
                ...prevState,
                [objectName]: errorText
            }
        ))
    }

    const getMapSelectedText = () => {

        if (survey.directToPortNo.address.method == "input") {
            return (
                survey.directToPortNo.address.name
            )
        }

        if (survey.directToPortNo.address.method == "click") {
            return (
                survey.directToPortNo.address.regeocode.formattedAddress
            )
        }

        if (survey.directToPortNo.address.method == "autoComplete") {
            return (
                survey.directToPortNo.address.poi.name
            )
        }

        if (survey.directToPortNo.address.method == "geolocation") {
            return (
                survey.directToPortNo.address.name.formattedAddress
            )
        }

        return null
    }

    const handleCustomAddress = (address, type) => {
        // console.log("address", address)
        setSurvey((prevState) => ({
            ...prevState,
            directToPortNo: {
                ...prevState.directToPortNo,
                address: null,
            }
        }))

        if (type == "geolocation") {
            setSurvey((prevState) => ({
                ...prevState,
                directToPortNo: {
                    ...prevState.directToPortNo,
                    address: {
                        ...prevState.directToPortNo.address,
                        name: address,
                        method: type
                    }
                }
            }))
            return
        }

        if (type == "input") {
            setSurvey((prevState) => ({
                ...prevState,
                directToPortNo: {
                    ...prevState.directToPortNo,
                    address: {
                        ...prevState.directToPortNo.address,
                        name: address,
                        method: type
                    }
                }

            }))
            return
        }

        setSurvey((prevState) => ({
            ...prevState,
            directToPortNo: {
                ...prevState.directToPortNo,
                address: address,
            }
        }))

        setSurvey((prevState) => ({
            ...prevState,
            directToPortNo: {
                ...prevState.directToPortNo,
                address: {
                    ...prevState.directToPortNo.address,
                    method: type
                }
            }
        }))
    }

    const clearbackHomeData = () => {
        if (survey.directToPort == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortYes: {
                        arrivalTime: "",
                        transirtation: 999,
                        othertransirtation: 999,
                    },
                }
            )
            )
        };

        if (survey.directToPort == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortNo: {
                        address: 999,
                        arrivalTime: "",
                        transirtation: 999,
                        othertransirtation: 999,
                    },
                }
            )
            )
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

    const _getPrevEndTime = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'crossRd'));
            // If there is a value stored in localStorage, use that
            if (local_storage_value_str) {
                return JSON.parse(local_storage_value_str).arrivalTimeToSchool;
            }
        }
        return null;
    }, []);

    const [prevEndTime, setPrevEndTime] = React.useState(_getPrevEndTime)

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

    const handleChangedirectPort = (event) => {
        if (survey.directToPort == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortYes: {
                        ...prevState.directToPortYes,
                        [event.target.name]: event.target.value
                    }
                }
            )
            )
        };

        if (survey.directToPort == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortNo: {
                        ...prevState.directToPortNo,
                        [event.target.name]: event.target.value
                    }
                }
            )
            )
        };
    }

    const handleTimeChange = (event, name) => {
        if (name === "arrivalTime") {
            if (survey.directToPort === "是") {
                setSurvey((prevState) => ({
                    ...prevState,
                    directToPortYes: {
                        ...prevState.directToPortYes,
                        [name]: event.$d
                    }
                }))
                return
            }

            if (survey.directToPort === "否") {
                setSurvey((prevState) => ({
                    ...prevState,
                    directToPortNo: {
                        ...prevState.directToPortNo,
                        [name]: event.$d
                    }
                }))
                return
            }
        }

        setSurvey((prevState) => ({
            ...prevState,
            [name]: event.$d
        })
        )

    };


    const handleNextButton = (event) => {
        if (survey.leaveShcoolTime == "") {
            handleAlertBarOpen()
            setVCodeError("7) Please select the departure time from school")
            handleHelpText("leaveShcoolTime", "Please select the departure time from school")
            return
        }

        if (dayjs(survey.leaveShcoolTime) < dayjs(prevEndTime)) {
            handleAlertBarOpen()
            setVCodeError("The time cannot be earlier than the arrival time on the previous page")
            handleHelpText("leaveShcoolTime", "The time cannot be earlier than the arrival time on the previous page")
            return
        }
        if (JSON.stringify(dayjs(survey.leaveShcoolTime)) === JSON.stringify(dayjs(prevEndTime))) {
            handleAlertBarOpen()
            setVCodeError("The time cannot be earlier than the arrival time on the previous page")
            handleHelpText("leaveShcoolTime", "The time cannot be earlier than the arrival time on the previous page")
            return
        }

        if (survey.pickup == 999) {
            handleAlertBarOpen()
            setVCodeError("8) Is the student picked up or dropped off")
            handleHelpText("pickup", "Is the student picked up or dropped off")
            return
        }

        if (survey.pickup == "其他") {
            if (survey.otherOfPickup == "999" || survey.otherOfPickup == "") {
                handleAlertBarOpen()
                setVCodeError("8) Please fill in other guardians")
                handleHelpText("pickup", "Please fill in other guardians")
                return
            }
        }

        if (survey.portForHome == "999") {
            handleAlertBarOpen()
            setVCodeError("9) Please select a Border Checkpoint")
            handleHelpText("portForHome", "Please select a Border Checkpoint")
            return
        }
        
        if (survey.portForHome == "其他") {
            if (survey.otherOfportForHome == 999 || survey.otherOfportForHome == "") {
                handleAlertBarOpen()
                setVCodeError("9) Please fill in the other Border Checkpoint")
                handleHelpText("portForHome", "Please fill in the other Border Checkpoint")
                return
            }
        }

        if (survey.directToPort == 999) {
            handleAlertBarOpen()
            setVCodeError("9) Does the student go directly to the Border Checkpoint ")
            handleHelpText("directToPort", "Does the student go directly to the Border Checkpoint ")
            return
        }


        if (survey.directToPort == "是") {
            if (survey.directToPortYes.arrivalTime == "") {
                handleAlertBarOpen()
                setVCodeError("Please select the arrival time")
                handleHelpText("arrivalPortTime", "Please select the arrival time")
                return
            }
            if (dayjs(survey.directToPortYes.arrivalTime) < dayjs(survey.leaveShcoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`The time should not be earlier than "7) Departure time from school"`)
                handleHelpText("arrivalPortTime", `The time should not be earlier than "7) Departure time from school"`)
                return
            }
            if (JSON.stringify(survey.directToPortYes.arrivalTime) == JSON.stringify(survey.leaveShcoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`The time should not be the same as "7) Departure time from school"`)
                handleHelpText("arrivalPortTime", `The time should not be the same as "7) Departure time from school"`)
                return
            }

            if (survey.directToPortYes.transirtation == 999) {
                handleAlertBarOpen()
                    setVCodeError("Please select the mode of transportation")
                handleHelpText("transirtation", "Please select the mode of transportation")
                return
            }

            if (survey.directToPortYes.transirtation == "其他") {
                if (survey.directToPortYes.othertransirtation == 999 || survey.directToPortYes.othertransirtation == "") {
                    handleAlertBarOpen()
                    setVCodeError("Please fill in the other modes of transportation")
                    handleHelpText("transirtation", "Please fill in the other modes of transportation")
                    return
                }
            }

        }

        if (survey.directToPort == "否") {
            if (!survey.directToPortNo.address.method) {
                handleAlertBarOpen()
                setVCodeError(`Please fill in the adress and press the "Confirm" button`)
                handleHelpText("address", `Please fill in the adress and press the "Confirm" button`)
                return
            }
            if (survey.directToPortNo.address == 999) {
                handleAlertBarOpen()
                setVCodeError(`Please fill in the adress and press the "Confirm" button`)
                handleHelpText("address", `Please fill in the adress and press the "Confirm" button`)
                return
            }

            if (survey.directToPortNo.arrivalTime == "") {
                handleAlertBarOpen()
                setVCodeError("Please select the arrival time")
                handleHelpText("arrivalPortTime", "Please select the arrival time")
                return
            }
            if (JSON.stringify(survey.directToPortNo.arrivalTime) == JSON.stringify(survey.leaveShcoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`The time should not be the same as "7) Departure time from school"`)
                handleHelpText("arrivalPortTime", `The time should not be the same as "7) Departure time from school"`)
                return
            }
            if (dayjs(survey.directToPortNo.arrivalTime) < dayjs(survey.leaveShcoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`The time should not be earlier than "7) Departure time from school"`)
                handleHelpText("arrivalPortTime", `The time should not be earlier than "7) Departure time from school"`)
                return
            }

            if (survey.directToPortNo.transirtation == 999 ) {
                handleAlertBarOpen()
                setVCodeError("Please select the mode of transportation")
                handleHelpText("transirtation", "Please select the mode of transportation")
                return
            }
            if (survey.directToPortNo.transirtation == "其他") {
                if (survey.directToPortNo.othertransirtation == 999 || survey.directToPortNo.othertransirtation == "") {
                    handleAlertBarOpen()
                    setVCodeError("Please fill in the other modes of transportation")
                    handleHelpText("transirtation", "Please fill in the other modes of transportation")
                    return
                }
            }

        }
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/en/surveyBadWeather')
    }



    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem(_studentNum + 'crossRd2', JSON.stringify(survey))
        setHelpText(blankHelpText)
        // console.log(survey)
    }, [survey])

    React.useEffect(() => {
        clearbackHomeData()
    }, [survey.directToPort])

    React.useEffect(() => {
        reset()
    }, [survey.directToPort])

    React.useEffect(() => {
        if (survey.pickup != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherOfPickup: 999
                }
            ))
        }

        if (survey.directToPortYes.transirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortYes: {
                        ...prevState.directToPortYes,
                        othertransirtation: 999
                    }
                }
            ))
        }

        if (survey.directToPortNo.transirtation != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToPortNo: {
                        ...prevState.directToPortNo,
                        othertransirtation: 999
                    }
                }
            ))
        }


    }, [survey.pickup,
    survey.directToPortNo.transirtation,
    survey.directToPortYes.transirtation])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyCrossRd") {
            router.replace("./")
        }
    }, [])

    React.useEffect(() => {
        setKey((k) => k + 1)
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

    React.useEffect(() => {
        if (survey.leaveShcoolTime != "" && survey.pickup != 999 && survey.directToPort != 999) {
            if (survey.directToPortYes.transirtation != 999 && survey.leaveShcoolTime != "" && survey.pickup != 999 && survey.directToPort != 999) {
                setProgressBarValue(80)
                return
            }
            if (survey.directToPortNo.transirtation != 999 && survey.leaveShcoolTime != "" && survey.pickup != 999 && survey.directToPort != 999) {
                setProgressBarValue(80)
                return
            }
            setProgressBarValue(60)
            return
        }

    }, [survey]);



    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div>
                        <h2 style={{ color: "#000000" }}>
                            4.2 Under normal circumstances, the situation of students leaving school in the afternoon
                        </h2>

                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="leaveShcoolTime-label"><h3>7) Departure time from school (24-Hour Clock):</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.leaveShcoolTime)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                } handleTimeChange(event, "leaveShcoolTime")
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.leaveShcoolTime}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>8) Is there anyone picking up the student after school in the afternoon?</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行離校" control={<Radio />} label="Student leaving school on his/her own" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="Parents" />
                                    <FormControlLabel sx={{ color: "black" }} value="（外）祖父母" control={<Radio />} label="Grandparents" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="Domestic Helper" />
                                    <FormControlLabel sx={{ color: "black" }} value="補習社/託管中心" control={<Radio />} label="Tutorial center / After School Care Centre" />
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
                            <FormControl>
                                <FormLabel id="portForHome-label"><h3>9) The Border Checkpoint for returning home</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForHome-label"
                                    name="portForHome"
                                    value={survey.portForHome}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="關閘" control={<Radio />} label="Border Gate" />
                                    <FormControlLabel sx={{ color: "black" }} value="青茂口岸" control={<Radio />} label="Qingmao" />
                                    <FormControlLabel sx={{ color: "black" }} value="港珠澳大橋澳門口岸" control={<Radio />} label="Hong Kong-Zhuhai-Macao Bridge Frontier Post at Macao Port" />
                                    <FormControlLabel sx={{ color: "black" }} value="橫琴口岸澳門口岸區" control={<Radio />} label="Macao Port Zone of Hengqin Port" />
                                    <FormControlLabel sx={{ color: "black" }} value="內港客運碼頭" control={<Radio />} label="Inner Harbour Ferry Terminal" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="Other" />

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
                                                inputProps={{ maxLength: 10 }}
                                                name='otherOfportForHome'
                                                id="otherOfportForHome-textfill"
                                                label="Other"
                                                variant="filled"
                                                onChange={handleChange}
                                                value={survey.otherOfportForHome == 999 ? null : survey.otherOfportForHome}
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
                            <FormControl>
                                <FormLabel id="directToPort-label"><h3>10) Do you go to the Border Checkpoint directly after school?</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="directToPort-label"
                                    name="directToPort"
                                    value={survey.directToPort}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="Yes" />
                                    <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="No" />

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.directToPort}</FormHelperText>
                            </FormControl>
                        </div>

                        {
                            survey.directToPort == "是" ?
                                <div>
                                    <div className={styles.question}>
                                        <FormControl className={styles.inlineQuestion}>
                                            <FormLabel id="arrivalPortTime-label"><h3>Arrival time to the Border Checkpoint (24-Hour Clock)</h3></FormLabel>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                                    <DesktopTimePicker
                                                        ampm={false}
                                                        value={dayjs(survey.directToPortYes.arrivalTime)}
                                                        onChange={(event) => {
                                                            if (!event) {
                                                                return
                                                            } handleTimeChange(event, "arrivalTime")
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.arrivalPortTime}</FormHelperText>
                                        </FormControl>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl
                                        >
                                            <FormLabel
                                                component="transirtation"><h3>The primary mode of transportation to the Border Checkpoint:</h3></FormLabel>
                                            <p className={styles.remind}>*(If you need to use two or more means of transportation during the process, please choose the one you think is more important.)</p>

                                            <RadioGroup
                                                name='transirtation'
                                                value={survey.directToPortYes.transirtation}
                                                onChange={handleChangedirectPort}
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
                                                    label="Public Bus"
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
                                                {survey.directToPortYes.transirtation === "其他" ?
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
                                                            name='othertransirtation'
                                                            onChange={handleChangedirectPort}
                                                            value={survey.directToPortYes.othertransirtation == 999 ? null : survey.otherOfCommonTransirtation}
                                                        />
                                                    </Box>
                                                    :
                                                    null
                                                }

                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.transirtation}</FormHelperText>
                                        </FormControl>
                                    </div>

                                </div>
                                :
                                survey.directToPort == "否" ?
                                    <div key={key}>
                                        <div className={styles.question} style={{ justifyContent: "center" }}>
                                            <FormControl sx={{ display: 'flex', flex: 1 }}>
                                                <FormLabel id="address-label"><h3>Where did you go after school (landmark):</h3></FormLabel>
                                                <Box>
                                                    <p className={styles.mapHitText}>
                                                        {
                                                            getMapSelectedText() ? "Selected Address: " + getMapSelectedText() : <p style={{ color: "#666666" }}>*Please select the destination on the map below or enter the relevant address and click OK<br />**Example: Biblioteca Pública da Associação Comercial de Macau</p>
                                                        }
                                                    </p>


                                                </Box>
                                                {/* <Button onClick={() => { setKey((k) => k + 1) }}>
                                                    按下打開地圖
                                                </Button> */}
                                                <div style={{ alignSelf: "center", zIndex: 1 }} >
                                                    <MapComponent key={seed} handleCustomAddress={handleCustomAddress} />
                                                </div>

                                                <FormHelperText sx={{ color: 'red' }}>{helpText.address}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="directToPortNoarrivalTime-label"><h3>Arrival Time (24-Hour Clock)</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <DesktopTimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.directToPortNo.arrivalTime)}
                                                            onChange={(event) => {
                                                                if (!event) {
                                                                    return
                                                                } handleTimeChange(event, "arrivalTime")
                                                            }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.arrivalPortTime}</FormHelperText>
                                            </FormControl>
                                        </div>

                                        <div className={styles.question}>
                                            <FormControl
                                            >
                                                <FormLabel component="transirtation"><h3>The primary mode of transportation to the Border Checkpoint:</h3></FormLabel>
                                                <p className={styles.remind}>*(If you need to use two or more means of transportation during the process, please choose the one you think is more important.)</p>
                                                <RadioGroup
                                                    name='transirtation'
                                                    value={survey.directToPortNo.transirtation}
                                                    onChange={handleChangedirectPort}
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
                                                        label="Public Bus"
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
                                                    {survey.directToPortNo.transirtation === "其他" ?
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
                                                                name='othertransirtation'
                                                                onChange={handleChangedirectPort}
                                                                value={survey.directToPortNo.othertransirtation == 999 ? null : survey.otherOfCommonTransirtation}
                                                            />
                                                        </Box>
                                                        :
                                                        null
                                                    }

                                                </RadioGroup>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.transirtation}</FormHelperText>
                                            </FormControl>
                                        </div>

                                    </div>
                                    :
                                    null
                        }
                    </div>
                    : null
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
