"use client"
import * as React from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

export default function App() {
    const router = useRouter();
    const [totalObj, setTotalObj] = React.useState()
    const [openAlertBar, setOpenAlertBar] = React.useState(false)
    const [stillHaveChild, setStillHaveChild] = React.useState('有');
    const [items, setItems] = React.useState()
    const [vCodeError, setVCodeError] = React.useState(false)
    const [alertState, setAlertState] = React.useState("error")
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const timer = React.useRef();


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
        const submitData = { "data": totalObj }

        if (!loading) {
            setSuccess(false);
            setLoading(true);
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
                    setVCodeError("成功上傳問卷!!!")
                    sessionStorage.clear();
                    setSuccess(true);
                    // setLoading(false);
                    // timer.current = setTimeout(() => {
                    //     router.push('/')
                    // }, 2000)
                } else {
                    setAlertState("error")
                    handleAlertBarOpen()
                    setVCodeError(res.statusText)
                    setSuccess(false);
                    setLoading(false);
                }
            } catch (error) {
                setAlertState("error")
                handleAlertBarOpen()
                setVCodeError("伺服器繁忙中，請稍後再試")
                setSuccess(false);
                setLoading(false);
            }
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
                            提交問卷
                        </h1>

                        <div className={styles.question}>
                            <p>
                                感謝閣下參與本次的線上問卷調查!
                            </p>
                            <p>
                                請按以下按鈕完成本次問卷
                            </p>
                        </div>

                        <div style={{ display: "flex", justifyContent: 'center' }}>
                            {
                                !loading ?
                                <Button 
                                disable = {success}
                                className={styles.buttonStyle}
                                onClick={() =>
                                    handleSubmit()
                                }
                                >
                                    {
                                        success ? <CheckIcon/> : "提交"
                                    }
                                </Button>
                                :
                                <CircularProgress
                                    size={48}
                                />
                            }
                        </div>


                    </div>
                    :
                    null
            }
            <Snackbar open={openAlertBar} autoHideDuration={6000} onClose={handleAlertBarClose}>
                <Alert
                    onClose={handleAlertBarClose}
                    severity={alertState}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {vCodeError}
                </Alert>
            </Snackbar>
        </main>

    )
}
