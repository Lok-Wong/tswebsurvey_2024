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
                leaveDestination: 999,
                leaveDestinationTime: "",
                leaveDestinationTransition: 999,
                otherLeaveDestinationTransition: 999,
                destinationBackHomeStartTime: "",
                destinationBackHomeEndTime: "",
                leaveDestinationBackHomeTransition: 999,
                otherLeaveDestinationBackHomeTransition: 999
            }
    }

    const blankHelpText = {}

    const [helpText, setHelpText] = React.useState(blankHelpText)

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
          const local_storage_path_list = sessionStorage.getItem('pathList')? sessionStorage.getItem('pathList').split(",") : null;
          // If there is a value stored in localStorage, use that
          if (local_storage_path_list) {
            return (local_storage_path_list);
          }
        }
      }, []);

    const [survey, setSurvey] = React.useState(_initial_value)
    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)

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

    const handleNextButton = () => {
        if (survey.leaveSchoolTime == ""){
            handleHelpText("leaveSchoolTime", "請填寫離校時間")
            return
        }

        if (survey.leavePickUp == 999) {
            handleHelpText("leavePickUp", "請選擇接送人")
            return
        }

        if (survey.directToHomeState == 999) {
            handleHelpText("directToHomeState", "請選擇是否直接回家")
            return
        }

        if (survey.directToHomeState == "是") {
            if (survey.directToHomeYes.arivalHomeTime == "") {
                handleHelpText("arivalHomeTime", "請填寫到達家時間")
                return
            }

            if (survey.directToHomeYes.arivalHomeTransition == 999) {
                handleHelpText("arivalHomeTransition", "請選擇回家主要的交通方式")
                return
            }
        }

        if (survey.directToHomeState == "否") {
            if (survey.directToHomeNo.leaveDestinationTime == "") {
                handleHelpText("leaveDestinationTime", "請填寫到達目的地時間")
                return
            }

            if (survey.directToHomeNo.leaveDestinationTransition == 999) {
                handleHelpText("leaveDestinationTransition", "請選擇回家主要的交通方式")
                return
            }

            if (survey.directToHomeNo.destinationBackHomeStartTime == "") {
                handleHelpText("destinationBackHomeStartTime", "請填寫從上述地方出發回家的時間")
                return
            }

            if (survey.directToHomeNo.destinationBackHomeEndTime == "") {
                handleHelpText("destinationBackHomeEndTime", "請填寫到達家時間")
                return
            }

            if (survey.directToHomeNo.leaveDestinationBackHomeTransition == 999) {
                handleHelpText("leaveDestinationBackHomeTransition", "請選擇前目的地回家主要的交通方式")
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
                            leaveDestination: 999,
                            leaveDestinationTime: "",
                            leaveDestinationTransition: 999,
                            otherLeaveDestinationTransition: 999,
                            destinationBackHomeStartTime: "",
                            destinationBackHomeEndTime: "",
                            leaveDestinationBackHomeTransition: 999,
                            otherLeaveDestinationBackHomeTransition: 999
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

        if (survey.directToHomeNo.leaveDestinationBackHomeTransition != "其他") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                        directToHomeNo: {
                            ...prevState.directToHomeNo,
                            otherLeaveDestinationBackHomeTransition: 999
                    }
                }
            ))
        };
    }, [survey.leavePickUp, survey.directToHomeYes.arivalHomeTransition, survey.directToHomeNo.leaveDestinationTransition, survey.directToHomeNo.leaveDestinationBackHomeTransition])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyNormalRd") {
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
              sessionStorage.setItem('pathList',copyArr)
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

                    <div style={{ minWidth: "100%" }}>
                        <h1 style={{ color: "#000000" }}>
                            3.2	一般情況下，學生下午放學的情況
                        </h1>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="evening-leave-school-time-label"><h3>5) 離校時間（24小時制）:</h3></FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                        <DesktopTimePicker
                                            ampm={false}
                                            value={dayjs(survey.leaveSchoolTime)}
                                            onChange={(event) => handleTimeChange(event, "leaveSchoolTime")}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.leaveSchoolTime}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className={styles.question}>
                            <FormControl className={styles.inlineQuestion}>
                                <FormLabel id="pickup-leave-school-way-label"><h3>6)	有沒有人接送:</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="pickup-leave-school-way-label"
                                    name="leavePickUp"
                                    value={survey.leavePickUp}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="學生自行離校" control={<Radio />} label="學生自行離校" />
                                    <FormControlLabel sx={{ color: "black" }} value="父母" control={<Radio />} label="父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
                                    <FormControlLabel sx={{ color: "black" }} value="工人" control={<Radio />} label="工人" />
                                    <FormControlLabel sx={{ color: "black" }} value="補習社" control={<Radio />} label="補習社" />
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
                                                        onChange={(event) => handleChangeBackHomeTime(event, "arivalHomeTime")}
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
                                    <div>
                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="leave-shcool-arrival-destination-label"><h3>放學後去了哪裏:</h3></FormLabel>
                                                <p>choose loaction</p>
                                                <Button>
                                                    touch and choose loaction
                                                </Button>
                                                <FormHelperText sx={{ color: 'red' }}>{helpText.arivalHomeTransition}</FormHelperText>
                                            </FormControl>

                                        </div>
                                        <div className={styles.question}>
                                            <FormControl className={styles.inlineQuestion}>
                                                <FormLabel id="leave-shcool-arrival-destination-time-label"><h3>到達目的地時間（24小時制）:</h3></FormLabel>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer className={styles.question} components={['TimePicker']}>
                                                        <DesktopTimePicker
                                                            ampm={false}
                                                            value={dayjs(survey.directToHomeNo.leaveDestinationTime)}
                                                            onChange={(event) => handleChangeBackHomeTime(event, "leaveDestinationTime")}
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
                                        <div className={styles.question}>
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

                                        </div>
                                    </div>
                                    :
                                    null
                        }
                        <div className={styles.question}>
                            <Button onClick={() => router.back()}>
                                上一頁
                            </Button>
                            <Button onClick={handleNextButton}>
                                下一頁  
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
