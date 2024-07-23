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
import { useCookies } from "react-cookie";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
    const router = useRouter();

    const blanksurvey = {
        startTime: new Date(),
        leaveSchoolTime: "",
        otherleavePickUp: 999,
        leavePickUp: 999,
        directToHomeState: 999,
        directToHomeYes: {
            arivalHomeTime: "",
            arivalHomeTransition: 999,
            otherarivalHomeTransition: 999
        },
        directToHomeNo: {
            address: 999,
            leaveDestinationTime: "",
            leaveDestinationTransition: 999,
            otherLeaveDestinationTransition: 999,
        }
    }

    const blankHelpText = {}
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [progressBarValue, setProgressBarValue] = React.useState(40)

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

            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'normalRd2'));
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

    const [survey, setSurvey] = React.useState(_initial_value)
    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)
    const [key, setKey] = React.useState(0)
    const [seed, setSeed] = React.useState(1);
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

    React.useEffect(() => {
        reset()
    }, [survey.directToHomeState])

    const handleHelpText = (eventName, errorText) => {
        const objectName = eventName
        setHelpText((prevState) => (
            {
                ...prevState,
                [objectName]: errorText
            }
        ))
    }

    const handleChangeBackHomeTime = (event, name) => {
        if (survey.directToHomeState == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToHomeYes: {
                        ...prevState.directToHomeYes,
                        [name]: event.$d
                    }
                }
            )
            )
        };

        if (survey.directToHomeState == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToHomeNo: {
                        ...prevState.directToHomeNo,
                        [name]: event.$d
                    }
                }
            )
            )
        };
    }

    const handleChangeBackHome = (event) => {
        if (survey.directToHomeState == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToHomeYes: {
                        ...prevState.directToHomeYes,
                        [event.target.name]: event.target.value
                    }
                }
            )
            )
        };

        if (survey.directToHomeState == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToHomeNo: {
                        ...prevState.directToHomeNo,
                        [event.target.name]: event.target.value
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

    const handleCustomAddress = (address, type) => {
        setSurvey((prevState) => ({
            ...prevState,
            directToHomeNo: {
                ...prevState.directToHomeNo,
                address: null
            }
        }))

        if (type == "geolocation") {
            setSurvey((prevState) => ({
                ...prevState,
                directToHomeNo: {
                    ...prevState.directToHomeNo,
                    address: {
                        ...prevState.directToHomeNo.address,
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
                directToHomeNo: {
                    ...prevState.directToHomeNo,
                    address: {
                        ...prevState.directToHomeNo.address,
                        name: address,
                        method: type
                    }
                }
            }))
            return
        }

        setSurvey((prevState) => ({
            ...prevState,
            directToHomeNo: {
                ...prevState.directToHomeNo,
                address: address,
            }
        }))

        setSurvey((prevState) => ({
            ...prevState,
            directToHomeNo: {
                ...prevState.directToHomeNo,
                address: {
                    ...prevState.directToHomeNo.address,
                    method: type
                }
            }
        }))
    }

    const getMapSelectedText = () => {
        if (typeof (survey.directToHomeNo.address) === "undefined" || survey.directToHomeNo.address === 999) {
            return null
        }

        if (survey.directToHomeNo.address.method == "input") {
            return (
                survey.directToHomeNo.address.name
            )
        }

        if (survey.directToHomeNo.address.method == "click") {
            return (
                survey.directToHomeNo.address.regeocode.formattedAddress
            )
        }

        if (survey.directToHomeNo.address.method == "autoComplete") {
            return (
                survey.directToHomeNo.address.poi.name
            )
        }

        if (survey.directToHomeNo.address.method == "geolocation") {
            return (
                survey.directToHomeNo.address.name.formattedAddress
            )
        }

        return null
    }

    const handleNextButton = () => {

        if (survey.leaveSchoolTime == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("5) 請重新填寫離校時間")
            handleHelpText("leaveSchoolTime", "請重新填寫離校時間")
            return
        }

        if (survey.leaveSchoolTime == "") {
            handleAlertBarOpen()
            setVCodeError("5) 請填寫離校時間")
            handleHelpText("leaveSchoolTime", "請填寫離校時間")
            return
        }


        if (survey.leavePickUp == 999) {
            handleAlertBarOpen()
            setVCodeError("6) 請選擇接送人")
            handleHelpText("leavePickUp", "請選擇接送人")
            return
        }

        if (survey.leavePickUp == "其他") {
            if (survey.otherleavePickUp == 999 || survey.otherleavePickUp == "") {
                handleAlertBarOpen()
                setVCodeError("6) 請填寫其他接送人")
                handleHelpText("leavePickUp", "請填寫其他接送人")
                return
            }
        }

        if (survey.directToHomeState == 999) {
            handleAlertBarOpen()
            setVCodeError("7) 請填寫其他接送人")
            handleHelpText("directToHomeState", "請選擇是否直接回家")
            return
        }

        if (survey.directToHomeState == "是") {
            if (survey.directToHomeYes.arivalHomeTime == "Invalid Date") {
                handleAlertBarOpen()
                setVCodeError("請填寫到達家時間")
                handleHelpText("leaveSchoolTime", "請填寫到達家時間")
                return
            }

            if (survey.directToHomeYes.arivalHomeTime == "") {
                handleAlertBarOpen()
                setVCodeError("請填寫到達家時間")
                handleHelpText("arivalHomeTime", "請填寫到達家時間")
                return
            }

            if (dayjs(survey.leaveSchoolTime) > dayjs(survey.directToHomeYes.arivalHomeTime)) {
                handleAlertBarOpen()
                setVCodeError(`到達家的時間不能比 "5) 離校時間"早`)
                handleHelpText("arivalHomeTime", `時間不能比 "5) 離校時間"早`)
                return
            }

            if (survey.directToHomeYes.arivalHomeTransition == 999) {
                handleAlertBarOpen()
                setVCodeError("請選擇回家主要的交通方式")
                handleHelpText("arivalHomeTransition", "請選擇回家主要的交通方式")
                return
            }

            if (survey.directToHomeYes.arivalHomeTransition == "其他") {
                if (survey.directToHomeYes.otherarivalHomeTransition == 999 || survey.directToHomeYes.otherarivalHomeTransition == "") {
                    handleAlertBarOpen()
                    setVCodeError("請填寫其家回家的方式")
                    handleHelpText("arivalHomeTransition", "請填寫其家回家的方式")
                    return
                }
            }

            if (JSON.stringify(survey.directToHomeYes.arivalHomeTime) === JSON.stringify(survey.leaveSchoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`到達家的時間不能與" 5) 離校時間"相等`)
                handleHelpText("arivalHomeTime", `時間不能與" 5) 離校時間"相等`)
                return
            }
        }

        if (survey.directToHomeState == "否") {
            if (!survey.directToHomeNo.address.method) {
                handleAlertBarOpen()
                setVCodeError(`請填寫地址及按下確定按鈕`)
                handleHelpText("address", "請填寫地址及按下確定按鈕")
                return
            }

            if (survey.directToHomeNo.address == 999) {
                handleAlertBarOpen()
                setVCodeError(`請填寫地址及按下確定按鈕`)
                handleHelpText("address", "請填寫地址及按下確定按鈕")
                return
            }

            if (survey.directToHomeNo.leaveDestinationTime == "") {
                handleAlertBarOpen()
                setVCodeError(`請填寫到達目的地時間`)
                handleHelpText("leaveDestinationTime", "請填寫到達目的地時間")
                return
            }

            if (survey.directToHomeNo.leaveDestinationTransition == 999) {
                handleAlertBarOpen()
                setVCodeError(`請選擇回家主要的交通方式`)
                handleHelpText("leaveDestinationTransition", "請選擇回家主要的交通方式")
                return
            }

            if (survey.directToHomeNo.leaveDestinationTransition == "其他") {
                if (survey.directToHomeNo.otherLeaveDestinationTransition == 999 || survey.directToHomeNo.otherLeaveDestinationTransition == "") {
                    handleAlertBarOpen()
                    setVCodeError(`請填寫其他回家主要的交通方式`)
                    handleHelpText("leaveDestinationTransition", "請填寫其他回家主要的交通方式")
                    return
                }
            }

            if (survey.directToHomeNo.destinationBackHomeStartTime == "") {
                handleAlertBarOpen()
                setVCodeError(`請填寫從上述地方出發回家的時間`)
                handleHelpText("destinationBackHomeStartTime", "請填寫從上述地方出發回家的時間")
                return
            }

            if (dayjs(survey.directToHomeNo.leaveDestinationTime) < dayjs(survey.leaveSchoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`到達時間不能比 "5) 離校時間"早`)
                handleHelpText("leaveDestinationTime", `時間不能比 "5) 離校時間"早`)
                return
            }

            if (JSON.stringify(survey.directToHomeNo.leaveDestinationTime) === JSON.stringify(survey.leaveSchoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`到達時間不能比 "5) 離校時間"相同`)
                handleHelpText("leaveDestinationTime", `時間不能與" 5) 離校時間"相同`)
                return
            }

        }
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/surveyBadWeather')
    }

    const clearbackHomeData = () => {
        if (survey.directToHomeState == "否") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToHomeYes: {
                        arivalHomeTime: "",
                        leaveDestinationTime: "",
                        arivalHomeTransition: 999,
                        otherarivalHomeTransition: 999
                    }
                }
            )
            )
        };

        if (survey.directToHomeState == "是") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToHomeNo: {
                        address: 999,
                        leaveDestinationTime: "",
                        leaveDestinationTransition: 999,
                        otherLeaveDestinationTransition: 999,
                        // destinationBackHomeStartTime: "",
                        // destinationBackHomeEndTime: "",
                        // leaveDestinationBackHomeTransition: 999,
                        // otherLeaveDestinationBackHomeTransition: 999
                    }
                }
            )
            )
        }
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + 'normalRd2'), JSON.stringify(survey))
        setHelpText(blankHelpText)
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        clearbackHomeData()
    }, [survey.directToHomeState])

    React.useEffect(() => {
        if (survey.leavePickUp != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    otherleavePickUp: 999
                }
            ))
        };

        if (survey.directToHomeYes.arivalHomeTransition != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToHomeYes: {
                        ...prevState.directToHomeYes,
                        otherarivalHomeTransition: 999
                    }
                }
            ))
        };

        if (survey.directToHomeNo.leaveDestinationTransition != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    directToHomeNo: {
                        ...prevState.directToHomeNo,
                        otherLeaveDestinationTransition: 999
                    }
                }
            ))
        };

        // if (survey.directToHomeNo.leaveDestinationBackHomeTransition != "其他") {
        //     setSurvey((prevState) => (
        //         {
        //             ...prevState,
        //             directToHomeNo: {
        //                 ...prevState.directToHomeNo,
        //                 otherLeaveDestinationTransition: 999
        //             }
        //         }
        //     ))
        // };
    }, [survey.leavePickUp, survey.directToHomeYes.arivalHomeTransition, survey.directToHomeNo.leaveDestinationTransition])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyNormalRd") {
            router.replace("./")
        }
    }, [])

    React.useEffect(() => {
        setKey((k) => k + 1)
    }, [])


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
    }, [survey.directToHomeState]);

    React.useEffect(() => {
        if (survey.leaveSchoolTime != "" && survey.leavePickUp != 999 && survey.directToHomeState != 999) {
            if (survey.directToHomeNo.leaveDestinationTransition && survey.leaveSchoolTime != "" && survey.leavePickUp != 999 && survey.directToHomeState != 999) {
                setProgressBarValue(80)
                return
            }
            if (survey.directToHomeYes.leaveDestinationTransition && survey.leaveSchoolTime != "" && survey.leavePickUp != 999 && survey.directToHomeState != 999) {
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
                        <h1 style={{ color: "#000000" }}>
                            3.2	一般情況下,學生下午放學的情況
                        </h1>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="evening-leave-school-time-label"><h3>5) 離校時間（24小時制）:</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.leaveSchoolTime)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                } handleTimeChange(event, "leaveSchoolTime")
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.leaveSchoolTime}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="pickup-leave-school-way-label"><h3>6)	學生下午放學有無人接:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-leave-school-way-label"
                                    name="leavePickUp"
                                    value={survey.leavePickUp}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行離校" control={<Radio />} label="學生自行離校" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="補習社/託管中心" control={<Radio />} label="補習社/託管中心" />
                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />
                                    {survey.leavePickUp == "其他" ?
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
                                                id="pickup-leave-school-way-other-textfill"
                                                label="其他"
                                                variant="filled"
                                                onChange={handleChange}
                                                name="otherleavePickUp"
                                                value={survey.otherleavePickUp == 999 ? "" : survey.otherleavePickUp}
                                            />
                                        </Box>
                                        :
                                        null
                                    }
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.leavePickUp}</FormHelperText>

                            </FormControl>
                        </div>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="back-home-dircetly-label"><h3>7)	放學是否直接回家？</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="back-home-dircetly-label"
                                    name="directToHomeState"
                                    onChange={handleChange}
                                    value={survey.directToHomeState}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="是" />
                                    <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="否" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.directToHomeState}</FormHelperText>
                            </FormControl>

                        </div>

                        {
                            survey.directToHomeState == "是" ?
                                <div>
                                    <div className={styles.question}>
                                        <FormControl className={styles.inlineQuestion}>
                                            <FormLabel id="arrival-home-time-label"><h3>到達家時間（24小時制）:</h3></FormLabel>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                                    <DesktopTimePicker
                                                        ampm={false}
                                                        value={dayjs(survey.directToHomeYes.arivalHomeTime)}
                                                        onChange={(event) => {
                                                            if (!event) {
                                                                return
                                                            }
                                                            handleChangeBackHomeTime(event, "arivalHomeTime")
                                                        }}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.arivalHomeTime}</FormHelperText>
                                        </FormControl>

                                    </div>
                                    <div className={styles.question}>
                                        <FormControl>
                                            <FormLabel id="arrival-home-transition-label"><h3>回家主要的交通方式：</h3></FormLabel>
                                            <RadioGroup
                                                aria-labelledby="arrival-home-transition-label"
                                                name="arivalHomeTransition"
                                                onChange={handleChangeBackHome}
                                                value={survey.directToHomeYes.arivalHomeTransition}
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
                                                {
                                                    survey.directToHomeYes.arivalHomeTransition == "其他" ?
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
                                                                id="arrival-home-transition-other-textfill"
                                                                label="其他"
                                                                variant="filled"
                                                                onChange={handleChangeBackHome}
                                                                name="otherarivalHomeTransition"
                                                                value={survey.directToHomeYes.otherarivalHomeTransition == 999 ? "" : survey.directToHomeYes.otherarivalHomeTransition}
                                                            />
                                                        </Box>
                                                        :
                                                        null
                                                }
                                            </RadioGroup>
                                            <FormHelperText sx={{ color: 'red' }}>{helpText.arivalHomeTransition}</FormHelperText>
                                        </FormControl>

                                    </div>
                                </div>
                                :
                                survey.directToHomeState == "否" ?
                                    <div key={key}>
                                        <div className={styles.question} style={{ justifyContent: "center" }}>
                                            <FormControl sx={{ display: 'flex', flex: 1 }}>
                                                <FormLabel id="address-label"><h3>	放學後去了哪裏（地標）：</h3></FormLabel>
                                                <Box>
                                                    <p className={styles.mapHitText}>
                                                        {
                                                            getMapSelectedText() ? "已選擇地址： " + getMapSelectedText() : <p style={{ color: "#666666" }}>*請在以下地圖點選目的地或輸入相關地址後按下確定<br />**例子：八角亭</p>
                                                        }
                                                    </p>


                                                </Box>
                                                {/* <Button onClick={() => { setKey((k) => k + 1) }}>
                                                    按下打開地圖
                                                </Button> */}
                                                <div style={{ zIndex: 1 }} >

                                                    <MapComponent key={seed} handleCustomAddress={handleCustomAddress} />
                                                </div>

                                                <FormHelperText sx={{ color: 'red' }}>{helpText.address}</FormHelperText>
                                            </FormControl>
                                        </div>
                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="leave-shcool-arrival-destination-time-label"><h3>到達時間（24 小時制）:</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <DesktopTimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.directToHomeNo.leaveDestinationTime)}
                                                            onChange={(event) => {
                                                                if (!event) {
                                                                    return
                                                                }
                                                                handleChangeBackHomeTime(event, "leaveDestinationTime")
                                                            }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.leaveDestinationTime}</FormHelperText>
                                            </FormControl>

                                        </div>
                                        <div className={styles.question}>
                                            <FormControl>
                                                <FormLabel id="leave-shcool-arrival-destination-transition-label"><h3>回家主要的交通方式：</h3></FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="leave-shcool-arrival-destination-transition-label"
                                                    name="leaveDestinationTransition"
                                                    onChange={handleChangeBackHome}
                                                    value={survey.directToHomeNo.leaveDestinationTransition}
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
                                                    {
                                                        survey.directToHomeNo.leaveDestinationTransition == "其他" ?
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
                                                                    id="leave-shcool-arrival-destination-transition-other-textfill"
                                                                    label="其他"
                                                                    variant="filled"
                                                                    onChange={handleChangeBackHome}
                                                                    name="otherLeaveDestinationTransition"
                                                                    value={survey.directToHomeNo.otherLeaveDestinationTransition == 999 ? "" : survey.directToHomeNo.otherLeaveDestinationTransition}
                                                                />
                                                            </Box>
                                                            :
                                                            null
                                                    }
                                                </RadioGroup>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.leaveDestinationTransition}</FormHelperText>
                                            </FormControl>

                                        </div>
                                        {/* <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="leave-shcool-arrival-destination-time-label"><h3>從上述地方出發回家的時間（24小時制）:</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <DesktopTimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.directToHomeNo.destinationBackHomeStartTime)}
                                                            onChange={(event) => handleChangeBackHomeTime(event, "destinationBackHomeStartTime")}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.destinationBackHomeStartTime}</FormHelperText>
                                            </FormControl>

                                        </div>
                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="leave-shcool-arrival-destination-time-label"><h3>到達家時間（24小時制）:</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <DesktopTimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.directToHomeNo.destinationBackHomeEndTime)}
                                                            onChange={(event) => { handleChangeBackHomeTime(event, "destinationBackHomeEndTime") }}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.destinationBackHomeEndTime}</FormHelperText>
                                            </FormControl>

                                        </div>
                                        <div className={styles.question}>
                                            <FormControl>
                                                <FormLabel id="leave-shcool-and-back-home-transition-label"><h3>前目的地回家主要的交通方式：</h3></FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="leave-shcool-and-back-home-transition-label"
                                                    name="leaveDestinationBackHomeTransition"
                                                    value={survey.directToHomeNo.leaveDestinationBackHomeTransition}
                                                    onChange={handleChangeBackHome}
                                                >
                                                    <FormControlLabel sx={{ color: "black" }} value="電單車（乘客）" control={<Radio />} label="電單車（乘客）" />
                                                    <FormControlLabel sx={{ color: "black" }} value="私家車（乘客）" control={<Radio />} label="私家車（乘客）" />
                                                    <FormControlLabel sx={{ color: "black" }} value="校車" control={<Radio />} label="校車" />
                                                    <FormControlLabel sx={{ color: "black" }} value="巴士" control={<Radio />} label="巴士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="輕軌" control={<Radio />} label="輕軌" />
                                                    <FormControlLabel sx={{ color: "black" }} value="一般的士" control={<Radio />} label="一般的士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="電召的士" control={<Radio />} label="電召的士" />
                                                    <FormControlLabel sx={{ color: "black" }} value="步行" control={<Radio />} label="步行" />
                                                    <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio />} label="其他" />
                                                    {
                                                        survey.directToHomeNo.leaveDestinationBackHomeTransition == "其他" ?
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
                                                                    value={survey.directToHomeNo.otherLeaveDestinationBackHomeTransition == 999 ? "" : survey.directToHomeNo.otherLeaveDestinationBackHomeTransition}
                                                                    name='otherLeaveDestinationBackHomeTransition'
                                                                    onChange={handleChangeBackHome}
                                                                />
                                                            </Box>
                                                            :
                                                            null
                                                    }
                                                </RadioGroup>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.leaveDestinationBackHomeTransition}</FormHelperText>
                                            </FormControl>

                                        </div> */}
                                    </div>
                                    :
                                    null
                        }
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
