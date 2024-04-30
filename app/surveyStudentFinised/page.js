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


function App() {
    const router = useRouter();
    const [stillHaveChild, setStillHaveChild] = React.useState('有');
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
        if (stillHaveChild == "有") {
            router.push('/surveystudentinfo')
            sessionStorage.setItem("studentNum", (parseInt(_studentNum) + 1))
            return
        } 
        if (stillHaveChild == "没有") {
            router.push('/surveyFinished')
            return
        }
    };

    React.useEffect(() => {
        const items = { ...sessionStorage }
        console.log("sessionKey", Object.keys(items))
    }, [])

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1 style={{ color: "#000000" }}>
                            最後確認
                        </h1>
                        <div className={styles.question} >
                            <FormControl>
                                <FormLabel id="still-have-other-child-label"><h3>還有其他學生家庭成員未填寫本調查問卷嗎?</h3></FormLabel>
                                <RadioGroup
                                    defaultValue={stillHaveChild}
                                    aria-labelledby="still-have-other-child-label"
                                    name="still-have-other-child-group"
                                    value={stillHaveChild}
                                    onChange={(event) => { setStillHaveChild(event.target.value) }}
                                >
                                    <FormControlLabel value="有" control={<Radio />} label="有" />
                                    <FormControlLabel value="没有" control={<Radio />} label="没有" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div className={styles.question}>
                            <Button onClick={() => router.back()}>
                                上一頁
                            </Button>
                            <Button
                                onClick={handleNextButton}>
                                {
                                    stillHaveChild == "有" ? "下一頁" : "完成"
                                }
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