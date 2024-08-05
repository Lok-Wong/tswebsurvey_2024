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
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import createMapSelections from "../mapSelection/page";

function App() {
    const router = useRouter();

    const blanksurvey = {
        startTime: new Date(),
        tripChange: {
            noChange: {
                state: false,
                value: 999
            },
            earlyOutDooring: {
                state: false,
                value: 999
            },
            transitionChange: {
                state: false,
                value: 999
            },
            parentPickUp: {
                state: false,
                value: 999
            },
            waitForNews: {
                state: false,
                value: 999
            },
            other: {
                state: false,
                value: 999
            }
        },
        comment: 999,
        routeRecord: {
            start0: 999,
            destination0: 999,
            start1: 999,
            destination1: 999,
        }
    }
    const blankHelpText = {}
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [progressBarValue, setProgressBarValue] = React.useState(80)
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
            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'badWeather'));
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

    const handleTextInputChange = (event) => {
        setSurvey((prevState) => ({
            ...prevState,
            tripChange: {
                ...prevState.tripChange,
                [event.target.name]: {
                    ...prevState.tripChange[event.target.name],
                    value: event.target.value
                }
            }
        }))
    }

    const handleCheckBoxChange = (event) => {
        if (event.target.name === "noChange") {
            setSurvey((prevState) => ({
                ...prevState,
                tripChange: {
                    noChange: {
                        state: event.target.checked,
                        value: 999
                    },
                    earlyOutDooring: {
                        state: false,
                        value: 999
                    },
                    transitionChange: {
                        state: false,
                        value: 999
                    },
                    parentPickUp: {
                        state: false,
                        value: 999
                    },
                    waitForNews: {
                        state: false,
                        value: 999
                    },
                    other: {
                        state: false,
                        value: 999
                    }, 
                },
                routeRecord: {
                    start0: 999,
                    destination0: 999,
                    start1: 999,
                    destination1: 999,
                }
            }))

            return
        }

        setSurvey((prevState) => ({
            ...prevState,
            tripChange: {
                ...prevState.tripChange,
                [event.target.name]: {
                    ...prevState.tripChange[event.target.name],
                    state: event.target.checked
                }
            }
        }))

        if (event.target.checked == false) {
            setSurvey((prevState) => ({
                ...prevState,
                tripChange: {
                    ...prevState.tripChange,
                    [event.target.name]: {
                        ...prevState.tripChange[event.target.name],
                        value: 999
                    }
                }
            }))
        }
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



    const handleNextButton = () => {
        console.log(survey);
        if (!survey.tripChange.noChange.state &&
            !survey.tripChange.earlyOutDooring.state &&
            !survey.tripChange.transitionChange.state &&
            !survey.tripChange.parentPickUp.state &&
            !survey.tripChange.waitForNews.state &&
            !survey.tripChange.other.state
        ) {
            handleAlertBarOpen()
            setVCodeError("1) 請至少選擇一個選項")
            handleHelpText("tripChange", "請至少選擇一個選項")
            return
        }

        if (survey.tripChange.earlyOutDooring.state) {
            if (survey.tripChange.earlyOutDooring.value === 999
                ||
                survey.tripChange.earlyOutDooring.value === ""
                ||
                survey.tripChange.earlyOutDooring.value === null
            ) {
                handleAlertBarOpen()
                setVCodeError("請填寫提早出門的分鐘數")
                handleHelpText("tripChange", "請填寫提早出門的分鐘數")
                return
            }
        }

        if (survey.tripChange.transitionChange.state) {
            if (survey.tripChange.transitionChange.value === 999 || survey.tripChange.transitionChange.value === "" || survey.tripChange.transitionChange.value === null
            ) {
                handleAlertBarOpen()
                setVCodeError("請填寫改變後的交通方式")
                handleHelpText("tripChange", "請填寫改變後的交通方式")
                return
            }
        }

        if (survey.tripChange.other.state) {
            if (survey.tripChange.other.value === 999 || survey.tripChange.other.value === "" || survey.tripChange.other.value === null) {
                handleAlertBarOpen()
                setVCodeError("請填寫改變後的交通方式")
                handleHelpText("tripChange", "請填寫其他")
                return
            }
        }
        sessionStorage.setItem("pathList", storedPathList)
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)

    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + 'badWeather'), JSON.stringify(survey))
        setHelpText(blankHelpText)
        console.log(survey)
    }, [survey])

    React.useEffect(() => {
        if (survey.tripChange.noChange.state != false || survey.tripChange.earlyOutDooring.state != false || survey.tripChange.transitionChange.state != false || survey.tripChange.parentPickUp.state != false || survey.tripChange.waitForNews.state != false || survey.tripChange.other.state != false) {
            setProgressBarValue(100)
        } else {
            setProgressBarValue(80)
        }

    }, [survey.tripChange])

    // React.useEffect(() => {
    //     if (survey.Pickup != "其他監護人") {
    //         setSurvey((prevState) => (
    //             {
    //                 ...prevState,
    //                 otherbadWeatherPickup: 999
    //             }
    //         ))
    //     }

    //     if (survey.Transition != "其他") {
    //         setSurvey((prevState) => (
    //             {
    //                 ...prevState,
    //                 otherbadWeatherTransition: 999
    //             }
    //         ))
    //     }


    // }, [survey.badWeatherPickup,
    // survey.badWeatherTransition])

    React.useEffect(() => {
        if (storedPathList != null) {
            setStoredPathList([...storedPathList, window.location.pathname])
        }
    }, [])

    const [finishStatus, setfinishStatus] = React.useState(false);

    const checkBoxLogict = () => {
        if (survey.tripChange.noChange.state) {
            return (true)
        }
    }

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

    // const routeRecord = {
    //     start0: 999,
    //     destination0: 999,
    //     start1: 999,
    //     destination1: 999,
    // }
    const labels = ["起點1", "目的地1", "起點2", "目的地2"];
    
    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1 style={{ color: "#000000" }}>
                            五、黃色暴雨下學生上學及放學出行情況
                        </h1>

                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="badWeatherPickup-label"><h3>1) 出行方式是否有以下變化？（多選題）</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="badWeatherPickup-label"
                                    name="badWeatherPickup"
                                    value={survey.badWeatherPickup}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="沒有變化" control={
                                        <Checkbox
                                            checked={survey.tripChange.noChange.state}
                                            onChange={handleCheckBoxChange}
                                            name='noChange' />
                                    } label="沒有變化" />
                                    <FormControlLabel sx={{ color: "black" }} value="提早出門上學" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}
                                            checked={survey.tripChange.earlyOutDooring.state}
                                            onChange={handleCheckBoxChange}
                                            name='earlyOutDooring' />
                                    }
                                        label="提早出門上學"
                                    />
                                    {
                                        survey.tripChange.earlyOutDooring.state == true ?
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                }}
                                                noValidate
                                                autoComplete="off" >
                                                <p>
                                                    提早約多少分鐘?
                                                </p>
                                                <TextField
                                                    inputProps={{ maxLength: 5 }}
                                                    id="earlyOutDooring"
                                                    label="分鐘"
                                                    variant="filled"
                                                    onChange={handleTextInputChange}
                                                    name="earlyOutDooring"
                                                    value={survey.tripChange.earlyOutDooring.value == 999 ? "" : survey.tripChange.earlyOutDooring.value}
                                                />
                                            </Box>
                                            :
                                            null
                                    }
                                    <FormControlLabel sx={{ color: "black" }} value="改變交通方式" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}
                                            checked={survey.tripChange.transitionChange.state}
                                            onChange={handleCheckBoxChange}
                                            name='transitionChange' />
                                    }
                                        label="改變交通方式"
                                    />
                                    {
                                        survey.tripChange.transitionChange.state == true ?
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                }}
                                                noValidate
                                                autoComplete="off" >
                                                <p>
                                                    改變的交通方式為?
                                                </p>
                                                <TextField
                                                    inputProps={{ maxLength: 10 }}
                                                    id="transitionChange"
                                                    label="交通方式"
                                                    variant="filled"
                                                    onChange={handleTextInputChange}
                                                    name="transitionChange"
                                                    value={survey.tripChange.transitionChange.value == 999 ? "" : survey.tripChange.transitionChange.value}
                                                />
                                            </Box>
                                            :
                                            null
                                    }

                                    <FormControlLabel sx={{ color: "black" }} value="轉由家長接送上學" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}
                                            checked={survey.tripChange.parentPickUp.state}
                                            onChange={handleCheckBoxChange}
                                            name='parentPickUp' />} label="轉由家長接送上學"
                                    />

                                    <FormControlLabel sx={{ color: "black" }} value="不出門上學和等待教青局的消息" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}
                                            checked={survey.tripChange.waitForNews.state}
                                            onChange={handleCheckBoxChange}
                                            name='waitForNews' />} label="不出門上學和等待教青局的消息" />

                                    <FormControlLabel sx={{ color: "black" }} value="其它" control={
                                        <Checkbox
                                            disabled={checkBoxLogict()}

                                            checked={survey.tripChange.other.state}
                                            onChange={handleCheckBoxChange}
                                            name='other' />} label="其它" />
                                    {
                                        survey.tripChange.other.state == true ?
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                                }}
                                                noValidate
                                                autoComplete="off" >
                                                <p>
                                                    請填寫其他
                                                </p>
                                                <TextField
                                                    inputProps={{ maxLength: 10 }}
                                                    id="other"
                                                    label="其他"
                                                    variant="filled"
                                                    onChange={handleTextInputChange}
                                                    name="other"
                                                    value={survey.tripChange.other.value == 999 ? "" : survey.tripChange.other.value}
                                                />
                                            </Box>
                                            :
                                            null
                                    }

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.tripChange}</FormHelperText>
                            </FormControl>
                        </div>

                        <h1 style={{ color: "#000000" }}>
                            六、其他意見或建議
                        </h1>

                        <div className={styles.question}>
                            <FormControl sx={{
                                m: 1, width: "100%"
                            }}>
                                <FormLabel id="comment-label"><h3>2)	您對上下學出行有何意見或建議？（選填）：</h3></FormLabel>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { width: '80%' },
                                    }}
                                    noValidate
                                >
                                    <TextField
                                        inputProps={{ maxLength: 200 }}
                                        sx={{ marginTop: "1rem" }}
                                        id="comment-text"
                                        label="請輸入您的意見（限制200字）"
                                        variant="outlined"
                                        name='comment'
                                        multiline
                                        value={survey.comment == 999 ? null : survey.comment}
                                        onChange={handleChange}
                                    />
                                </Box>
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
            {createMapSelections(survey.routeRecord, "start0")}
        </main>
    )

}
export default App;
