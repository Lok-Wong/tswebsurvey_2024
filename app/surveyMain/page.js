'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/navigation';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


function App() {
    const router = useRouter();

    const blanksurvey = {
            startTime: new Date(),
            fillAlready: 999,
    }

    const _studentNum = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_studentNum = sessionStorage.getItem('studentNum')
            if (local_storage_studentNum) {
                return local_storage_studentNum
            }
        }
        return 0;
    }, [])

    const _initial_value = React.useMemo(() => {
        if (typeof window !== 'undefined') {
            const local_storage_value_str = sessionStorage.getItem(_studentNum + 'surveyMain');
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
            const local_storage_path_list = sessionStorage.getItem('pathList');
            // If there is a value stored in localStorage, use that
            if (local_storage_path_list) {
                return (local_storage_path_list);
            }
        }
    }, []);

    const [survey, setSurvey] = React.useState(_initial_value)

    const [storedPathList, setStoredPathList] = React.useState(_initial_pathListe)


    const handleChange = (event) => {
        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                [objectName]: event.target.value
            }
        )
        )
    }

    const handleNextButton = () => {

        if (survey.fillAlready == "是") {
            console.log("setList",storedPathList)
            sessionStorage.setItem("studentNum", _studentNum)
            sessionStorage.setItem("pathList", storedPathList)
            router.push('/surveyFinished')

        }
        if (survey.fillAlready == "否") {
            sessionStorage.setItem("studentNum", _studentNum)
            sessionStorage.setItem("pathList", storedPathList)
            router.push('/surveyheadholder')
        }
    }


    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setStoredPathList([...storedPathList,window.location.pathname])
    },[isClient])

    React.useEffect(() => {
        console.log("survey:", survey)
    }, [survey])

    React.useEffect(() => {
        survey && sessionStorage.setItem(_studentNum + 'surveyMain', JSON.stringify(survey))
    }, [survey])

    React.useEffect(() => {
        setIsClient(true)
        setStoredPathList(sessionStorage.getItem("pathList")? sessionStorage.getItem("pathList").split(",") : null)
    }, [])

    React.useEffect(() => {
        if (sessionStorage.getItem('pathList') === null) {
            router.replace("./")
            return
        }
        let shouldPath = sessionStorage.getItem('pathList'.split(","))
        if (shouldPath != "/") {
            router.replace("./")
        }
    }, [])

    const [finishStatus, setfinishStatus] = React.useState(false);

    const onBackButtonEvent = (e) => {
      e.preventDefault();
      if (!finishStatus) {
          if (window.confirm("Do you want to go back ?")) {
            setfinishStatus(true)
            const copyArr = [...storedPathList]
            const prevPath = copyArr[copyArr.length - 1]
            copyArr.splice(-1)
            sessionStorage.setItem('pathList',copyArr)
            router.back()
          } else {
              window.history.pushState(null, null, window.location.pathname);
              setfinishStatus(false)
          }
      }
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
                        <div className={styles.checkBlock}>
                            <div className={styles.question}>
                                <FormControl
                                    row="true"
                                >
                                    <FormLabel sx={{ color: "black" }}>
                                        閣下是否已填寫過「澳門學生出行調查」問卷？
                                    </FormLabel>
                                    <RadioGroup
                                        row="true"
                                        name="fillAlready"
                                        onChange={handleChange}
                                        value={survey.fillAlready}
                                    >
                                        <FormControlLabel sx={{ color: "black" }} value="是" control={<Radio />} label="是" />
                                        <FormControlLabel sx={{ color: "black" }} value="否" control={<Radio />} label="否" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>

                        <div className={styles.question}>
                            <Button onClick={handleNextButton}>
                                {
                                    survey.fillAlready == "否" ? "下一頁" : "完成"
                                }
                            </Button>
                        </div>
                    </div>
                    :
                    null
            }
            {/* <div>
                <h1 style={{color:"#ffffff"}}>
                    住戶持有車輛資料 
                </h1>
            </div> */}


        </main>


    )
}



export default App;
