"use client"
import * as React from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AES from 'crypto-js/aes';
import getData from '../utils/string';
import modeECB from "crypto-js/mode-ecb";
import cryptojs from 'crypto-js';
import FormHelperText from '@mui/material/FormHelperText';

export default function App() {
    // const fs = require('fs');
    // const path = require('path');

    const [phoneNums,setPhoneNums] = React.useState()
    const [id4Nums,setId4Nums] = React.useState()
    const router = useRouter();
    const blanksurvey = {
        phoneNum: 999,
        id4Num: 999
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

            const local_storage_value_str = sessionStorage.getItem(('surveyStudentFinised'));
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
        if (event.target.value.length == 0) {
            setSurvey((prevState) => (
                {
                    ...prevState,
                    [objectName]: 999
                }
            ))
            return
        }

        setSurvey((prevState) => (
            {
                ...prevState,
                [objectName]: AES.encrypt( 
                    event.target.value, 
                    cryptojs.enc.Utf8.parse(getData()),
                    {mode: modeECB})
                    .toString()
            }
        )

        )
    };

    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        survey && sessionStorage.setItem(('surveyStudentFinised'), JSON.stringify(survey))
        setHelpText(blankHelpText)
    }, [survey])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyStudentFinised") {
            router.replace("./")
        }
    }, [])

    const handleNextButton = () => {
        console.log("phoneNums", phoneNums)
        if (typeof phoneNums != "undefined"){
            if (phoneNums.length>0) {
                if (phoneNums.length < 8 ) {
                    handleHelpText("phoneNum", "請輸入8位數以上的電話號碼")
                    return
                }
            }
        }
        sessionStorage.setItem("pathList", storedPathList)
        sessionStorage.setItem("surveyEndTime", JSON.stringify(new Date()))
        router.push("/surveyFinished")
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

    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1 style={{ color: "#000000" }}>
                            抽獎活動
                        </h1>
                        <p className={styles.question}>
                            *如提供以下資訊，即同意參加抽獎活動。<br/>
                            *以下資訊只用於抽獎用途。<br/>
                            　電話：抽獎及聯絡用途。<br/>
                            　身份證尾4碼：抽獎及身份核實用途。<br/>
                            *所有資料在完成整個抽獎活動後會進行銷毀。
                        </p>
                        <div className={styles.question}>

                            <FormControl sx={{
                                m: 1, width: "100%"
                            }}>
                                <FormLabel id="comment-label"><h3>請提供閣下的聯絡電話（選填）：</h3></FormLabel>
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
                                        onChange={(e) => {handleChange(e),setPhoneNums(e.target.value)}}
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
                                        onChange={(e) => {handleChange(e),setId4Nums(e.target.value)}}
                                    />
                                </Box>
                            </FormControl>
                        </div>
                    </div>
                    :
                    null
            }
            <div className={styles.buttonGroup}>
                <Button className={styles.buttonStyle} onClick={() => router.back()}>
                    上一頁
                </Button>
                <Button className={styles.buttonStyle} onClick={handleNextButton}>
                    下一頁
                </Button>
            </div>


        </main>

    )
}
