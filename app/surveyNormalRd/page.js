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
import { useCookies } from "react-cookie";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
    const router = useRouter();

    const blanksurvey = {
        startTime: new Date(),
        pickup: 999,
        otherOfPickup: 999,
        pickupTimeStart: "",
        pickupTimeEnd: "",
        commonTransirtation: 999,
        otherOfCommonTransirtation: 999,
    }

    const blankHelpText = {
        pickup: null,
        otherOfPickup: null,
        pickupTimeStart: null,
        pickupTimeEnd: null,
        commonTransirtation: null,
        otherOfCommonTransirtation: null,
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

            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'normalRd'));
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
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)
    const [startTime, setStartTime] = React.useState()
    const [endTime, setEndTime] = React.useState()
    const [progressBarValue, setProgressBarValue] = React.useState(30)
    const [cookies, setCookie, removeCookie] = useCookies(['toSchoolTime']);
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

    const setToSchoolTimeCookie = () => {
        setCookie('toSchoolTime', survey.pickupTimeEnd, { path: '/' })
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

    const handleNextButton = () => {

        if (survey.pickup == "999") {
            handleAlertBarOpen()
            setVCodeError("1) 請選擇一個選項")
            handleHelpText("pickup", "請選擇一個選項")
            return
        }
        if (survey.pickup == "其他") {
            if (survey.otherOfPickup == "999" || survey.otherOfPickup == "") {
                handleAlertBarOpen()
                setVCodeError("1) 未填寫其他內容")
                handleHelpText("pickup", "請填寫其他")
                return
            }
        }

        if (survey.pickupTimeStart == "" || survey.pickupTimeStart == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("2) 請選擇出發時間")
            handleHelpText("pickupTimeStart", "請選擇出發時間")
            return
        }

        if (survey.pickupTimeEnd == "" || survey.pickupTimeEnd == "Invalid Date") {
            handleAlertBarOpen()
            setVCodeError("3) 請選擇到達時間")
            handleHelpText("pickupTimeEnd", "請選擇到達時間")
            return
        }
        if ((survey.pickupTimeStart > survey.pickupTimeEnd) || (survey.pickupTimeEnd < survey.pickupTimeStart)) {
            handleAlertBarOpen()
            setVCodeError(`3) 時間不能比" 2) 出發時間"早`)
            handleHelpText("pickupTimeEnd", `時間不能比" 2) 出發時間"早`)
            return
        }
        if (JSON.stringify(survey.pickupTimeStart) === JSON.stringify(survey.pickupTimeEnd)) {
            handleAlertBarOpen()
            setVCodeError(`3) 時間不能與" 2) 出發時間"相等`)
            handleHelpText("pickupTimeEnd", `時間不能與" 2) 出發時間"相等`)
            return
        }

        if (survey.commonTransirtation == "999") {
            handleAlertBarOpen()
            setVCodeError(`4) 請選擇一個選項`)
            handleHelpText("commonTransirtation", "請選擇一個選項")
            return
        }
        if (survey.commonTransirtation == "其他") {
            if (survey.otherOfCommonTransirtation == "999" || survey.otherOfCommonTransirtation == "") {
                handleAlertBarOpen()
                setVCodeError(`4) 未填寫其他內容`)
                handleHelpText("commonTransirtation", "請填寫其他")
                return
            }
        }
        setToSchoolTimeCookie()
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/surveyNormalRd2')
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + "normalRd"), JSON.stringify(survey))
        setHelpText(blankHelpText)
        // console.log(survey)
    }, [survey])

    React.useEffect(() => {
        if (storedPathList != null) {
            // console.log("storedPathList12", storedPathList)
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

    React.useEffect(() => {
        sessionStorage.setItem('checkschoolName', null)
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
        if (survey.pickup != "其他") {
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


    }, [survey.pickup, survey.commonTransirtation])

    React.useEffect(() => {
        if (survey.pickup != "999" && survey.pickupTimeStart != "" && survey.pickupTimeEnd != "" && survey.commonTransirtation != "999") {
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
                            三、一般情況上學及放學出行情況
                        </h1>
                        <h2 style={{ color: "#000000" }}>
                            3.1  一般情況下,學生早上上學的情況
                        </h2>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="pickup-label"><h3>1)   學生早上上學有無人送：</h3></FormLabel>
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
                                <FormLabel id="pickup-time-start-label"><h3>2)     出發時間（24 小時制）：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.pickupTimeStart)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                }
                                                handleTimeChange(event, "pickupTimeStart"),
                                                    setStartTime(event.$d)
                                                    // console.log("event", event.$d)
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.pickupTimeStart}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className={styles.question}>

                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="pickup-time-end-label"><h3>3)     到達時間（24 小時制）：</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.pickupTimeEnd)}
                                            onChange={(event) => {
                                                if (!event) {
                                                    return
                                                }
                                                handleTimeChange(event, "pickupTimeEnd"),
                                                    setEndTime(event.$d)
                                            }}
                                        />
                                    </DemoContainer>
                                    <FormHelperText sx={{ color: 'red' }}>{helpText.pickupTimeEnd}</FormHelperText>
                                </LocalizationProvider>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <FormControl
                                variant="standard"
                            >
                                <FormLabel component="commonTransiration"><h3>4)	主要的交通方式：</h3></FormLabel>
                                <p className={styles.remind}>*(如過程中需要使用兩種或以上的交通工具時，請選擇你認為較為主要的交通工具)</p>

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
