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

    const _initial_pathListe = React.useMemo(() => {
        if (typeof window !== 'undefined') {
          const local_storage_path_list = sessionStorage.getItem('pathList')? sessionStorage.getItem('pathList').split(",") : null;
          // If there is a value stored in localStorage, use that
          if (local_storage_path_list) {
            return (local_storage_path_list);
          }
        }
      }, []);

    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)

    const handleNextButton = () => {

        if (stillHaveChild == "有") {
            router.push('/surveystudentinfo')
            sessionStorage.setItem("studentNum", (parseInt(_studentNum) + 1))
            sessionStorage.setItem("pathList", storedPathList)
            return
        } 
        if (stillHaveChild == "没有") {
            router.push('/surveyPhoneNum')
            sessionStorage.setItem("pathList", storedPathList)
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
        setStoredPathList(sessionStorage.getItem("pathList") ? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

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
        if (_initial_pathListe[_initial_pathListe.length - 1] != "/surveyBadWeather") {
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
                                    <FormControlLabel sx={{ color: "black" }} value="有" control={<Radio />} label="有" />
                                    <FormControlLabel sx={{ color: "black" }} value="没有" control={<Radio />} label="没有" />
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