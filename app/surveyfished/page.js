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
        sessionStorage.setItem("studentNum", (parseInt(_studentNum) + 1))
    };

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    React.useEffect(() => {
        const items = { ...sessionStorage }
        console.log("sessionKey", Object.keys(items))
    }, [])

    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div>
                        <h1 style={{ color: "#ffffff" }}>
                            最後確認
                        </h1>
                        <FormControl>
                            <div className={styles.question} >
                                <FormLabel id="still-have-other-child-label">還有其他學生家庭成員未填寫本調查問卷嗎?</FormLabel>
                                <RadioGroup
                                    defaultValue={stillHaveChild}
                                    row
                                    aria-labelledby="still-have-other-child-label"
                                    name="still-have-other-child-group"
                                    value={stillHaveChild}
                                    onChange={(event) => { setStillHaveChild(event.target.value) }}
                                >
                                    <FormControlLabel value="有" control={<Radio />} label="有" />
                                    <FormControlLabel value="没有" control={<Radio />} label="没有" />
                                </RadioGroup>
                            </div>
                        </FormControl>
                        <div className={styles.question}>
                            <Button variant="contained" onClick={() => router.back()}>
                                上一頁
                            </Button>
                            <Button
                                onClick={() => handleNextButton()}
                                variant="contained"
                                href={stillHaveChild == "有" ?
                                    "/surveystudentinfo"
                                    :
                                    "/surveyadultInfo"
                                }>
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
