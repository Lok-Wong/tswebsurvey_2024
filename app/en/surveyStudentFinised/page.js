'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgresss from '@/app/utils/progress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "../englishPage.css";

function App() {
    const router = useRouter();
    const [stillHaveChild, setStillHaveChild] = React.useState('');
    const blankHelpText = {
        maxStudnetNum: null,
        stillHaveChild: null
    }
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [progressBarValue, setProgressBarValue] = React.useState(100)
    const [openAlerts, setOpenAlerts] = React.useState(false);
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

    const handleClickOpen = () => {
        setOpenAlerts(true);
    };

    const handleClose = () => {
        setOpenAlerts(false);
    };

    const handleKeepGoing = () => {
        setOpenAlerts(false);
        sessionStorage.setItem("studentNum", (parseInt(_studentNum) + 1))
        sessionStorage.setItem("pathList", storedPathList)
        router.push('/en/surveystudentinfo')
    }

    const handleFinisheSurvey = () => {
        setOpenAlerts(false);
        router.push('/en/surveyPhoneNum')
        sessionStorage.setItem("pathList", storedPathList)
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

    const _initial_pathListe = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_path_list = sessionStorage.getItem('pathList') ? sessionStorage.getItem('pathList').split(",") : null;
            // If there is a value stored in localStorage, use that
            if (local_storage_path_list) {
                return (local_storage_path_list);
            }
        }
    }, []);

    const _totalStudentNumber = React.useMemo(() => {
        if (typeof window !== 'undefined') {

            const local_storage_value_str = sessionStorage.getItem("totalStudentNum");
            // If there is a value stored in localStorage, use that
            if (local_storage_value_str) {
                return JSON.parse(local_storage_value_str);
            }
        }
    }, []);

    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)

    const handleNextButton = () => {
        console.log("checkStudentNum", checkStudentNum)

        if (stillHaveChild == "") {
            handleAlertBarOpen()
            setVCodeError("Please select an option")
            handleHelpText("stillHaveChild", "Please select an option")
            return
        }

        if (stillHaveChild == "有") {
            router.push('/en/surveystudentinfo')
            sessionStorage.setItem("studentNum", (parseInt(_studentNum) + 1))
            sessionStorage.setItem("pathList", storedPathList)
            return
        }
        if (stillHaveChild == "沒有") {
            if (!checkStudentNum()) {
                handleClickOpen()
                return
            }
            router.push('/en/surveyPhoneNum')
            sessionStorage.setItem("pathList", storedPathList)
            return
        }
    };

    const handleHelpText = (eventName, errorText) => {
        const objectName = eventName
        setHelpText((prevState) => (
            {
                ...prevState,
                [objectName]: errorText
            }
        ))
    }

    React.useEffect(() => {
        const items = { ...sessionStorage }
    }, [])

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

    React.useEffect(() => {
        if (sessionStorage.getItem('pathList') === null) {
            router.replace("./")
            return
        }
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyBadWeather") {
            router.replace("./")
            return
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
        console.log("student", _studentNum)
        router.back()
        //       } else {
        //           window.history.pushState(null, null, window.location.pathname);
        //           setfinishStatus(false)
        //       }
        //   }
    }

    const checkStudentNum = () => {
        if (_totalStudentNumber == "4+") {
            return false
        }
        if (parseInt(_studentNum) + 1 >= parseInt(_totalStudentNumber)) {
            return true
        }
        return false
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
                        {/* <h1 style={{ color: "#000000" }}>
                            是否還有其他家庭成員是非高等教育學生而未填寫本問卷？
                        </h1> */}
                        <div className={styles.question} >
                            <FormControl>
                                <FormLabel id="still-have-other-child-label"><h3>Are there any other family members who are non-tertiary students and have not completed this questionnaire?</h3></FormLabel>
                                <RadioGroup
                                    defaultValue={stillHaveChild}
                                    aria-labelledby="still-have-other-child-label"
                                    name="still-have-other-child-group"
                                    value={stillHaveChild}
                                    onChange={(event) => { setStillHaveChild(event.target.value) }}
                                >
                                    <FormControlLabel disabled={checkStudentNum()} sx={{ color: "black" }} value="有" control={<Radio />} label="Yes" />
                                    {
                                        checkStudentNum() ?
                                            <FormHelperText sx={{ color: 'green' }}>*All the students in the family have already filled out the questionnaire</FormHelperText>
                                            :
                                            null
                                    }
                                    <FormControlLabel sx={{ color: "black" }} value="沒有" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormHelperText sx={{ color: 'red' }}>{helpText.stillHaveChild}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    :
                    null
            }
            <div className={styles.buttonGroup}>
                <LinearProgresss values={progressBarValue} />
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        className={styles.buttonStyle}
                        onClick={() => router.back()}>
                        Previous Page
                    </Button>
                    <Button
                        className={styles.buttonStyle}
                        onClick={handleNextButton}>
                        {
                            stillHaveChild == "有" ? "Next Page" : "Completed"
                        }
                    </Button>
                </div>
            </div>
            <Dialog
                open={openAlerts}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Caution"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            parseInt(_totalStudentNumber) > 4 ?
                                "Please confirm that all the students in the family have already filled out the questionnaire"
                                :
                                "There is (are) still " + (parseInt(_totalStudentNumber) - parseInt(_studentNum) - 1) + " student(s) who has (have) not yet filled out their travel information"
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleKeepGoing}>Continue filling out the questionnaire</Button>
                    <Button onClick={handleFinisheSurvey} autoFocus>
                        Submit the Questionnaire
                    </Button>
                </DialogActions>
            </Dialog>
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