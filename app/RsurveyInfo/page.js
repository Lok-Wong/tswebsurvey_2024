'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import Autocomplete from '@mui/material/Autocomplete';
import { schoolName, school_type, region, schoolAddress, schoolLevel, levelType, schoolType } from '../schoolData'
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
    const router = useRouter();


    const [progressBarValue, setProgressBarValue] = React.useState(10)
    const [schoolNameSelectType, setSchoolNameSelectType] = React.useState("")

    const blanksurvey = {
        gender: 999,
        age: 999,
        workingStatus: 999,
        startTime: new Date(),
    }

    const blankHelpText = {
        classLevel: null,
        schoolName: null,
        gender: null,
        age: null,
        crossBorder: null,
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
            const local_storage_value_str = sessionStorage.getItem((_studentNum + 'studentInfo'));
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

        if (event.target.name == "schoolArea") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    schoolArea: event.target.value,
                    schoolName: 999,
                    schoolType: 999,
                    classLevel: 999,
                    levelType: 999,
                }
            )
            )
            setShValue("")
            setShInputValue("")
            setStValue("")
            setSchoolNameSelectType("")
            return
        }

        if (event.target.name == "classLevel") {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    classLevel: event.target.value,
                    levelType: 999
                }
            )
            )
            return
        }


        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                [objectName]: event.target.value

            }
        )

        )
    };

    const getSchoolTypeFromSchoolName = () => {
        setSurvey((prevState) => (
            {
                ...prevState,
                schoolType: schoolType[survey.schoolName]
            }
        ))
    }

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        if (storedPathList != null) {
            setStoredPathList([...storedPathList, window.location.pathname])
        }
    }, [])

    // React.useEffect(() => {
    //     if (sessionStorage.getItem('pathList') === null) {
    //         router.replace("./")
    //         return
    //     }
    //     if ((_initial_pathListe[_initial_pathListe.length - 1] == "/surveyheadholder"
    //         ||
    //         _initial_pathListe[_initial_pathListe.length - 1] == "/surveyStudentFinised")) {
    //         return
    //     } else {
    //         router.replace("./")
    //     }
    // }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem((_studentNum + "studentInfo"), JSON.stringify(survey))
        setHelpText(blankHelpText)
    }, [survey])

    const [finishStatus, setfinishStatus] = React.useState(false);

    const setStudentNum = React.useCallback((num) => {
        if (typeof num === 'undefined') {
            return (0)
        }

        if (num > 0) {
            const newStudentNum = num - 1
            return (newStudentNum)
        }
    }, [])


    const onBackButtonEvent = React.useCallback((e) => {
        setfinishStatus(true)

        e.preventDefault();
        if (typeof setStudentNum(_studentNum) === 'undefined') {
            sessionStorage.setItem("studentNum", 0)
        } else {
            sessionStorage.setItem("studentNum", setStudentNum(_studentNum))
        }
        // if (!finishStatus) {
        //     if (window.confirm("返回上一頁嗎?")) {
        //         setfinishStatus(true)
        const copyArr = [...storedPathList]
        const prevPath = copyArr[copyArr.length - 1]
        copyArr.splice(-1)
        sessionStorage.setItem('pathList', copyArr)
        router.back()

        //     } else {
        //         window.history.pushState(null, null, window.location.pathname);
        //         setfinishStatus(false)
        //     }
        // }
    }, [finishStatus])

    React.useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    }, [finishStatus]);

    const handleNextButton = () => {

        if (survey.schoolArea == "999") {
            handleAlertBarOpen()
            setVCodeError("1) 請選擇學校所屬地區")
            handleHelpText('schoolArea', "請選擇學校所屬地區")
            return
        }

        if (survey.schoolName == "999" || survey.schoolName == "" || survey.schoolName == null) {
            handleAlertBarOpen()
            alert(survey.schoolName);
            setVCodeError("2) 請選擇學校名稱")
            handleHelpText('schoolName', "請選擇學校名稱")
            return
        }

        if (survey.classLevel == "999" || survey.classLevel == "") {
            handleAlertBarOpen()
            setVCodeError("3) 請選擇就讀程度")
            handleHelpText('classLevel', "請選擇就讀程度")
            return
        }

        if (survey.levelType == "999" || survey.levelType == "") {
            handleAlertBarOpen()
            setVCodeError("4) 請選擇就讀年級")
            handleHelpText('levelType', "請選擇就讀年級")
            return
        }

        if (survey.gender == "999") {
            handleAlertBarOpen()
            setVCodeError("5) 請選擇性別")
            handleHelpText('gender', "請選擇性別")
            return
        }

        if (survey.age == "999") {
            handleAlertBarOpen()
            setVCodeError("6) 請選擇年齡")
            handleHelpText('age', "請選擇年齡")
            return
        }

        if (survey.crossBorder == "999") {
            handleAlertBarOpen()
            setVCodeError("7) 請選擇是否需跨境")
            handleHelpText('crossBorder', "請選擇是否需跨境")
            return
        }

        if (survey.crossBorder == "否") {
            sessionStorage.setItem("studentNum", _studentNum)
            sessionStorage.setItem("pathList", storedPathList)
            sessionStorage.setItem((_studentNum + "crossRd"), JSON.stringify(blankSurveyCrd))
            sessionStorage.setItem((_studentNum + "crossRd2"), JSON.stringify(blankSurveyCrd2))
            router.push('/surveyNormalRd')
        }
        if (survey.crossBorder == "是") {
            sessionStorage.setItem("studentNum", _studentNum)
            sessionStorage.setItem("pathList", storedPathList)
            sessionStorage.setItem((_studentNum + "normalRd"), JSON.stringify(blanksurveyRd))
            sessionStorage.setItem((_studentNum + "normalRd2"), JSON.stringify(blanksurveyRd2))

            router.push('/surveyCrossRd')
        }

    }

    React.useEffect(() => {
        if (survey.schoolArea != "999" && survey.schoolName != "999" && survey.classLevel != "999" && survey.levelType != "999" && survey.crossBorder != "999") {
            setProgressBarValue(30)
            return
        } else {
            setProgressBarValue(10)
        }
    }, [survey]);

    React.useEffect(() => {
        getSchoolTypeFromSchoolName()
    }, [survey.schoolName])



    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1 style={{ color: "#000000", marginBottom: "1vh" }}>
                            二、個人資料
                        </h1>

                        <div key={6} className={styles.question}>
                            <FormControl>
                                <FormLabel id="gender-label"><h3>5)  性別：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="gender-label"
                                    name="gender"
                                    onChange={handleChange}
                                    value={survey.gender}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="男" control={<Radio />} label="男" />
                                    <FormControlLabel sx={{ color: "black" }} value="女" control={<Radio />} label="女" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.gender}</FormHelperText>
                            </FormControl>
                        </div>

                        {/* need make a if condition to show the question */}
                        <div className={styles.question}>
                            <FormControl>
                                <FormLabel id="person-od-type-label"><h3>2) 閣下屬於哪種出行人群：</h3></FormLabel>
                                <RadioGroup
                                    aria-labelledby="person-od-type-label"
                                    value={survey.personOdType}
                                    name="personOdType"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel sx={{ color: "black" }} value="居民" control={<Radio />} label="居民" />
                                    <FormControlLabel sx={{ color: "black" }} value="外地僱員" control={<Radio />} label="外地僱員" />
                                    <FormControlLabel sx={{ color: "black" }} value="留學生" control={<Radio />} label="留學生" />
                                    <FormControlLabel sx={{ color: "black" }} value="旅客" control={<Radio />} label="旅客" />

                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.personOdType}</FormHelperText>

                            </FormControl>
                        </div>

                        <div>
                            <div className={styles.question}>
                                <FormControl>
                                    <FormLabel id="person-od-type-label"><h3>2.1) 居住地點（地標）：</h3></FormLabel>

                                    <p>
                                        打開地圖，選擇您的居住地點
                                    </p>

                                    <FormLabel id="person-od-type-label"><h3>2.2) 工作地點（地標）：</h3></FormLabel>

                                    <p>
                                        打開地圖，選擇您的居住地點
                                    </p>
                                </FormControl>
                            </div>

                            <div key={7} className={styles.question}>
                                <FormControl>
                                    <FormLabel id="age-label"><h3>3)  年齡：</h3></FormLabel>
                                    <RadioGroup
                                        aria-labelledby="age-label"
                                        name="age"
                                        onChange={handleChange}
                                        value={survey.age}
                                    >
                                        <FormControlLabel sx={{ color: "black" }} value="0~4歲" control={<Radio />} label="0~4歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="5~9歲" control={<Radio />} label="5~9歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="10~14歲" control={<Radio />} label="10~14歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="15~19歲" control={<Radio />} label="15~19歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="20-24歲" control={<Radio />} label="20-24歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="25-29歲" control={<Radio />} label="25-29歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="30-34歲" control={<Radio />} label="30-34歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="35-39歲" control={<Radio />} label="35-39歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="40-44歲" control={<Radio />} label="40-44歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="45-49歲" control={<Radio />} label="45-49歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="50-54歲" control={<Radio />} label="50-54歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="55-59歲" control={<Radio />} label="55-59歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="60-64歲" control={<Radio />} label="60-64歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="65-69歲" control={<Radio />} label="65-69歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="70-74歲" control={<Radio />} label="70-74歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="75-79歲" control={<Radio />} label="75-79歲" />
                                        <FormControlLabel sx={{ color: "black" }} value="80-84歲" control={<Radio />} label="80-84歲" />
                                        <FormControlLabel sx={{ color: "black" }} value=">=85歲" control={<Radio />} label=">=85歲" />
                                    </RadioGroup>
                                    <FormHelperText sx={{ color: 'red' }}>{helpText.age}</FormHelperText>
                                </FormControl>
                            </div>

                            <div key={8} className={styles.question}>
                                <FormControl>
                                    <FormLabel id="working-status-label"><h3>4)  就業／就學情況是（擇一主要身份）：</h3></FormLabel>
                                    <RadioGroup
                                        id="workingStatus"
                                        aria-labelledby="working-status-label"
                                        name="workingStatus"
                                        onChange={handleChange}
                                        value={survey.workingStatus}
                                    >
                                        <FormControlLabel sx={{ color: "black" }} value="就學" control={<Radio />} label="就學" />
                                        <FormControlLabel sx={{ color: "black" }} value="就業" control={<Radio />} label="就業" />
                                    </RadioGroup>
                                    <FormHelperText sx={{ color: 'red' }}>{helpText.workingStatus}</FormHelperText>
                                </FormControl>
                            </div>
                        </div>



                    </div>
                    :
                    null
            }

            <div key={9} className={styles.buttonGroup}>
                <LinearProgresss values={progressBarValue} />
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>

                    <Button className={styles.buttonStyle}
                        onClick={() => router.back()}>
                        上一頁
                    </Button>

                    <Button className={styles.buttonStyle}
                        onClick={handleNextButton}>
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


        </main >
    )

}
export default App;


