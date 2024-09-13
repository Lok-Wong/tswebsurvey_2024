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
            setVCodeError("7) 請選擇離校時間")
            handleHelpText("leaveShcoolTime", "請選擇離校時間")
            return
        }
        if (dayjs(survey.leaveShcoolTime) < dayjs(prevEndTime)) {
            handleAlertBarOpen()
            setVCodeError("7) 時間不能比上一頁的到校時間早")
            handleHelpText("leaveShcoolTime", "7) 時間不能比上一頁的到校時間早")
            return
        }
        if (JSON.stringify(dayjs(survey.leaveShcoolTime)) === JSON.stringify(dayjs(prevEndTime))) {
            handleAlertBarOpen()
            setVCodeError("7) 時間不能與上一頁的到校時間相同")
            handleHelpText("leaveShcoolTime", "7) 時間不能與上一頁的到校時間相同")
            return
        }
        
        if (survey.pickup == 999) {
            handleAlertBarOpen()
            setVCodeError("8) 請選擇是否有人接送")
            handleHelpText("pickup", "請選擇是否有人接送")
            return
        }

        if (survey.pickup == "其他") {
            if (survey.otherOfPickup == "999" || survey.otherOfPickup == "") {
                handleAlertBarOpen()
                setVCodeError("8) 請填寫其他監護人")
                handleHelpText("pickup", "請填寫其他監護人")
                return
            }
        }

        if (survey.portForHome == 999) {
            handleAlertBarOpen()
            setVCodeError("9) 請選擇回家使用的通關口岸")
            handleHelpText("portForHome", "請選擇回家使用的通關口岸")
            return
        }

        if (survey.portForHome == "其他") {
            if (survey.otherOfportForHome == 999 || survey.otherOfportForHome == "") {
                handleAlertBarOpen()
                setVCodeError("9) 請填寫其他通關口岸")
                handleHelpText("portForHome", "請填寫其他通關口岸")
                return
            }
        }

        if (survey.directToPort == 999) {
            handleAlertBarOpen()
            setVCodeError("10) 請選擇是否直接前往通關口岸")
            handleHelpText("directToPort", "請選擇是否直接前往通關口岸")
            return
        }


        if (survey.directToPort == "是") {
            if (survey.directToPortYes.arrivalTime == "") {
                handleAlertBarOpen()
                setVCodeError("請選擇到達時間")
                handleHelpText("arrivalPortTime", "請選擇到達時間")
                return
            }
            if (dayjs(survey.directToPortYes.arrivalTime) < dayjs(survey.leaveShcoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`時間不能比" 7) 離校時間"早`)
                handleHelpText("arrivalPortTime", `時間不能比" 7) 離校時間"早`)
                return
            }
            if (JSON.stringify(survey.directToPortYes.arrivalTime) == JSON.stringify(survey.leaveShcoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`時間不能與" 7) 離校時間"相同`)
                handleHelpText("arrivalPortTime", `時間不能與" 7) 離校時間"相同`)
                return
            }

            if (survey.directToPortYes.transirtation == 999) {
                handleAlertBarOpen()
                setVCodeError("請選擇交通方式")
                handleHelpText("transirtation", "請選擇交通方式")
                return
            }
            if (survey.directToPortYes.transirtation == "其他") {
                if (survey.directToPortYes.othertransirtation == 999 || survey.directToPortYes.othertransirtation == "") {
                    handleAlertBarOpen()
                    setVCodeError("請填寫其他交通方式")
                    handleHelpText("transirtation", "請填寫其他交通方式")
                    return
                }
            }

        }

        if (survey.directToPort == "否") {
            if (!survey.directToPortNo.address.method) {
                handleAlertBarOpen()
                setVCodeError("請填寫地址及按下確定按鈕")
                handleHelpText("address", "請填寫地址及按下確定按鈕")
                return
            }
            if (survey.directToPortNo.address == 999) {
                handleAlertBarOpen()
                setVCodeError("請填寫地址及按下確定按鈕")
                handleHelpText("address", "請填寫地址及按下確定按鈕")
                return
            }

            if (!survey.directToPortNo.arrivalTime) {
                handleAlertBarOpen()
                setVCodeError("請選擇到達時間")
                handleHelpText("arrivalPortTime", "請選擇到達時間")
                return
            }
            if (JSON.stringify(survey.directToPortNo.arrivalTime) == JSON.stringify(survey.leaveShcoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`時間不能與" 7) 離校時間"相同`)
                handleHelpText("arrivalPortTime", `時間不能與" 7) 離校時間"相同`)
                return
            }
            if (dayjs(survey.directToPortNo.arrivalTime) < dayjs(survey.leaveShcoolTime)) {
                handleAlertBarOpen()
                setVCodeError(`時間不能比" 7) 離校時間"早`)
                handleHelpText("arrivalPortTime", `時間不能比" 7) 離校時間"早`)
                return
            }

            if (survey.directToPortNo.transirtation == 999) {
                handleAlertBarOpen()
                setVCodeError("請選擇交通方式")
                handleHelpText("transirtation", "請選擇交通方式")
                return
            }
            if (survey.directToPortNo.transirtation == "其他") {
                if (survey.directToPortNo.othertransirtation == 999 || survey.directToPortNo.othertransirtation == "") {
                    handleAlertBarOpen()
                    setVCodeError("請填寫其他交通方式")
                    handleHelpText("transirtation", "請填寫其他交通方式")
                    return
                }
            }

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
                                <FormLabel id="pickup-label"><h3>8)    學生下午放學有無人接：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-label"
                                    name="pickup"
                                    value={survey.pickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行離校" control={<Radio />} label="學生自行離校" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="補習社/託管中心" control={<Radio />} label="補習社/託管中心" />
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
                            <FormControl>
                                <FormLabel id="portForHome-label"><h3>9)	回家使用的通關口岸：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="portForHome-label"
                                    name="portForHome"
                                    value={survey.portForHome}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="關閘" control={<Radio />} label="關閘" />
                                    <FormControlLabel sx={{ color: "black" }} value="青茂口岸" control={<Radio />} label="青茂口岸" />
                                    <FormControlLabel sx={{ color: "black" }} value="港珠澳大橋澳門口岸" control={<Radio />} label="港珠澳大橋澳門口岸" />
                                    <FormControlLabel sx={{ color: "black" }} value="橫琴口岸澳門口岸區" control={<Radio />} label="橫琴口岸澳門口岸區" />
                                    <FormControlLabel sx={{ color: "black" }} value="內港客運碼頭" control={<Radio />} label="內港客運碼頭" />
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
                                                inputProps={{ maxLength: 10 }}
                                                name='otherOfportForHome'
                                                id="otherOfportForHome-textfill"
                                                label="其他"
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
                                <FormLabel id="directToPort-label"><h3>10)	放學是否直接前往通關口岸？</h3></FormLabel>
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

                        {
                            survey.directToPort == "是" ?
                                <div>
                                    <div className={styles.question}>
                                        <FormControl className={styles.inlineQuestion}>
                                            <FormLabel id="arrivalPortTime-label"><h3>	到達口岸的時間（24小時制）</h3></FormLabel>
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
                                                component="transirtation"><h3>	前往口岸的主要交通方式：</h3></FormLabel>
                                            <p className={styles.remind}>*(如過程中需要使用兩種或以上的交通工具時，請選擇你認為較為主要的交通工具)</p>
                                            <RadioGroup
                                                name='transirtation'
                                                value={survey.directToPortYes.transirtation}
                                                onChange={handleChangedirectPort}
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
                                                            label="其他"
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
                                                <FormLabel id="address-label"><h3>	放學後去了哪裏（地標）：</h3></FormLabel>
                                                <Box>
                                                    <div className={styles.mapHitText}>
                                                        {
                                                            getMapSelectedText() ? "已選擇地址： " + getMapSelectedText() : <p style={{ color: "#666666" }}>*請在以下地圖點選目的地或輸入相關地址後按下確定<br />**例子：八角亭</p>
                                                        }
                                                    </div>


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
                                                <FormLabel id="directToPortNoarrivalTime-label"><h3>	到達時間（24小時制）</h3></FormLabel>
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
                                                <FormLabel
                                                    component="transirtation"><h3>	主要交通方式：</h3></FormLabel>
                                                <p className={styles.remind}>*(如過程中需要使用兩種或以上的交通工具時，請選擇你認為較為主要的交通工具)</p>
                                                <RadioGroup
                                                    name='transirtation'
                                                    value={survey.directToPortNo.transirtation}
                                                    onChange={handleChangedirectPort}
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
                                                                label="其他"
                                                                variant="filled"
                                                                name='othertransirtation'
                                                                onChange={handleChangedirectPort}
                                                                value={survey.directToPortNo.othertransirtation == 999 ? null : survey.directToPortNo.othertransirtation}
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
