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


function App( ) {
    const router = useRouter();

    const blanksurvey = {
        surveyMain : {
            startTime : new Date(),
            fillAlready : 999,
        }
    }

    const _studentNum = React.useMemo(() => {
        const local_storage_studentNum = sessionStorage.getItem('studentNum');
        if (local_storage_studentNum){
            return local_storage_studentNum
        }

        return 0;
    },[])
    
    const _initial_value = React.useMemo(() => {
        const local_storage_value_str = sessionStorage.getItem(_studentNum+'surveyMain');
        // If there is a value stored in localStorage, use that
        if(local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
        } 
        // Otherwise use initial_value that was passed to the function
        return blanksurvey;
    }, []);

    const handleSelectStateChange = (event,type) => {
        setSurvey( (prevState) => ({
            ...prevState,
            surveyvehicleInfo:{
                ...prevState.surveyvehicleInfo,
                [type]:{
                    ...prevState.surveyvehicleInfo[type],
                    [event.target.name] : event.target.value
                }
            }
        }) 
        )
    }

    const [survey, setSurvey] = React.useState(_initial_value)

    const handleChange = (event) => {
        const objectName = event.target.name
        setSurvey((prevState) => (
            {
                ...prevState,
                surveyMain:{
                    ...prevState.surveyMain,
                    [objectName] : event.target.value
                }
            }
        )
        )
    }

    const handleNextButton = () => {
        if (survey.surveyMain.fillAlready == "是"){
            sessionStorage.setItem("studentNum",_studentNum)
            router.push('/surveyFinished')
        }
        if (survey.surveyMain.fillAlready == "否"){
            sessionStorage.setItem("studentNum",_studentNum)
            router.push('/surveyheadholder')
        }
    }


    React.useEffect(() => {
        console.log( "survey:",survey)
    },[survey])

    React.useEffect(() => {
       survey && sessionStorage.setItem(_studentNum+'surveyMain',JSON.stringify(survey))
    },[survey])


    return (
        <main className={styles.main}>
            {/* <div>
                <h1 style={{color:"#ffffff"}}>
                    住戶持有車輛資料 
                </h1>
            </div> */}
            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    <FormControl 
                        row
                    >
                        <FormLabel>
                            閣下是否已填寫過「澳門學生出行調查」問卷？
                        </FormLabel>
                        <RadioGroup 
                            row
                            name="fillAlready"
                            onChange={handleChange}
                            value={survey.surveyMain.fillAlready}
                        >
                            <FormControlLabel value="是" control={<Radio />} label="是" />
                            <FormControlLabel value="否" control={<Radio />} label="否" />
                        </RadioGroup> 
                    </FormControl>
                </div>                  
            </div>

            <div className={styles.question}>
                <Button onClick={handleNextButton}>
                    {
                        survey.surveyMain.fillAlready == "否" ? "下一頁" : "完成"
                    }
                </Button>
            </div>

        </main>

        
    )
}



export default App;
