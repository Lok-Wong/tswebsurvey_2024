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
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slider from '@mui/material/Slider';
import { Box, TextField } from '@mui/material';
import MapSelections from "../mapSelection/page";

function App() {
    const [phoneNums, setPhoneNums] = React.useState()
    const [id4Nums, setId4Nums] = React.useState()
    const router = useRouter();
    const blanksurvey = {
        phoneNum: 999,
        id4Num: 999
    }

    const blankHelpText = {}
    const [helpText, setHelpText] = React.useState(blankHelpText)
    const [openAlertBar, setOpenAlertBar] = React.useState(false)
    const handleAlertBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlertBar(false);
    };
    const [alertState, setAlertState] = React.useState("error")
    const [vCodeError, setVCodeError] = React.useState(false)
    const [success, setSuccess] = React.useState(false);

    // const _studentNum = React.useMemo(() => {
    //     if (typeof window !== 'undefined') {
    //         const local_storage_studentNum = sessionStorage.getItem('studentNum');
    //         if (local_storage_studentNum) {
    //             return local_storage_studentNum
    //         }
    //     }
    //     return 0;
    // }, [])

    const _initial_value = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_value_str = sessionStorage.getItem(('RsurveyInfo'));
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
        survey && sessionStorage.setItem(("RsurveyInfo"), JSON.stringify(survey))
        setHelpText(blankHelpText)
    }, [survey])


    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1 style={{ color: "#000000", marginBottom: "1vh" }}>
                            抽獎活動
                        </h1>

                        <div>
                            <div className={styles.question}>
                                <h3>注意事項</h3>
                                <p >
                                    *如提供以下資訊，即同意參加抽獎活動。<br />
                                    *以下資訊只用於抽獎用途。<br />
                                    電話：抽獎及聯絡用途。<br />
                                    身份證尾4碼：抽獎及身份核實用途。<br />
                                    *所有資料在完成整個抽獎活動後會進行銷毀。
                                </p>
                            </div>

                            <div className={styles.question}>

                                <FormControl sx={{
                                    m: 1, width: "100%"
                                }}>
                                    <FormLabel id="comment-label"><h3>請提供閣下的聯絡電話（選填）：</h3></FormLabel>
                                    <p>*(若為澳門及中國內地以外之電話號碼，請加上區號以便得獎聯繫。)</p>
                                    <p>*例子：85213467985</p>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { width: '80%' },
                                        }}
                                        noValidate
                                    >
                                        <TextField
                                            inputProps={{ maxLength: 20 }}
                                            sx={{ marginTop: "1rem" }}
                                            id="phoneNum-text"
                                            label="請輸入您的電話"
                                            variant="outlined"
                                            name='phoneNum'
                                            multiline
                                            value={phoneNums}
                                            onChange={(e) => { handleChange(e), setPhoneNums(e.target.value) }}
                                        />
                                    </Box>
                                    <FormHelperText sx={{ color: 'red' }}>{helpText.phoneNum}</FormHelperText>
                                </FormControl>

                            </div>

                            <div className={styles.question}>
                                <FormControl sx={{
                                    m: 1, width: "100%"
                                }}>
                                    <FormLabel id="comment-label"><h3>請提供閣下的身份證號碼尾4位（選填）：</h3></FormLabel>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { width: '80%' },
                                        }}
                                        noValidate
                                    >
                                        <TextField
                                            inputProps={{ maxLength: 4 }}
                                            sx={{ marginTop: "1rem" }}
                                            id="id4Num-text"
                                            label="尾4號身份證號碼"
                                            variant="outlined"
                                            name='id4Num'
                                            multiline
                                            value={id4Nums}
                                            onChange={(e) => { handleChange(e), setId4Nums(e.target.value) }}
                                        />
                                    </Box>
                                </FormControl>
                            </div>
                        </div>

                    </div>
                    :
                    null
            }

            <div className={styles.buttonGroup}>
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>

                    <Button className={styles.buttonStyle}
                        onClick={() => router.back()}>
                        上一頁
                    </Button>

                    <Button 
                    disabled = {success}
                    className={styles.buttonStyle}
                    onClick={() => {
                        setSuccess(true)
                        setOpenAlertBar(true);
                        setAlertState("success")
                        setVCodeError("成功上傳問卷!!!")
                    }}
                    >
                        完成
                    </Button>
                </div>
            </div>

            <Snackbar open={openAlertBar} onClose={handleAlertBarClose}>
                <Alert
                    onClose={handleAlertBarClose}
                    severity={alertState}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {vCodeError}
                </Alert>
            </Snackbar>

        </main >
    )

}

export default App;