"use client"
import * as React from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function App() {
    // const fs = require('fs');
    // const path = require('path');
    const router = useRouter();
    const [totalObj, setTotalObj] = React.useState()
    const [openAlertBar, setOpenAlertBar] = React.useState(false)
    const [stillHaveChild, setStillHaveChild] = React.useState('有');
    const [items, setItems] = React.useState()
    const [vCodeError, setVCodeError] = React.useState(false)
    const [alertState, setAlertState] = React.useState("error")

    const _studentNum = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_studentNum = sessionStorage.getItem('studentNum');
            if (local_storage_studentNum) {
                return local_storage_studentNum
            }
        }
        return 0;
    }, [])


    const handleNextButton = () => {
        sessionStorage.setItem("studentNum", (parseInt(_studentNum) + 1))
    };

    const handleAlertBarOpen = () => {
        setOpenAlertBar(true);
      };

    const handleAlertBarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlertBar(false);
      };

    const [isClient, setIsClient] = React.useState(false)
    React.useEffect(() => {
        setIsClient(true)
        setItems({ ...sessionStorage })
    }, [])

    React.useEffect(() => { items && combineObj(Object.keys(items)) }, [items])

    const combineObj = (objarray) => {
        objarray.map((key, index) => {
            if (key == "pathList" || key == "studnetNum" || key == "totalStudentNum") {
                setTotalObj((prev) => ({
                    ...prev,
                    [key]: items[key]
                }))
            } else {
                setTotalObj((prev) => ({
                    ...prev,
                    [key]: JSON.parse(items[key])
                }))
            }
        })
    }

    const handleSubmit = async (e) => {
        // e.preventDefault()
        const submitData = { "data": totalObj }
        console.log('env', process.env.NEXT_PUBLIC_LOCAL_LINK)
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_LOCAL_LINK, {
                method: 'POST',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (res.ok) {
                setAlertState("success")
                handleAlertBarOpen()
                setVCodeError("成功上傳問卷")
                sessionStorage.clear();
                router.push('/')
            } else {
                setAlertState("error")
                handleAlertBarOpen()
                setVCodeError("伺服器繁忙中，請稍後再試:")
                console.log("伺服器繁忙中，請稍後再試", res)
            }
        } catch (error) {
            setAlertState("error")
            handleAlertBarOpen()
            setVCodeError("出錯了:請檢查網絡")
            console.log(error)
        }
    }

    React.useEffect(() => {
        console.log('totalObj', totalObj)
    }, [totalObj])



    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>

                        <h1 style={{ color: "#000000" }}>
                            完成問卷
                        </h1>

                        {
                            <div className={styles.question}>
                                <Button className={styles.buttonStyle} onClick={() =>
                                    // combineObj(Object.keys(items));
                                    handleSubmit()
                                }>
                                    提交
                                </Button>
                            </div>


                        }
                    </div>
                    :
                    null
            }
            <Snackbar open={openAlertBar} autoHideDuration={6000} onClose={handleAlertBarClose}>
                <Alert
                    onClose={handleAlertBarClose}
                    severity= {alertState}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {vCodeError}
                </Alert>
            </Snackbar>
        </main>

    )
}
