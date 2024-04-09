'use client'

import styles from "./page.module.css";
import Link from "next/link";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';// import RadioGroup from "@mui/material";
// import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function App() {

  return (
    <main className={styles.main}>
      <div>
        {/* <Survey model={survey} /> */}
        <h1>
        1.	學生家庭住戶資料
        </h1>
        <div className={styles.question}>
          <FormControl>
            <FormLabel id="studentofRespondents-radio-buttons-group-label">1) 你是學生（的）：</FormLabel>
            <RadioGroup
              row
              aria-labelledby="studentofRespondents-radio-buttons-group-label"
              defaultValue="本人"
              name="studentofRespondents-radio-buttons-group"
            >
              <FormControlLabel sx={{color:"black"}}  value="本人" control={<Radio />} label="本人" />
              <FormControlLabel sx={{color:"black"}}  value="父母" control={<Radio />} label="父母" />
              <FormControlLabel sx={{color:"black"}}  value="（外）祖父母" control={<Radio />} label="（外）祖父母" />
              <FormControlLabel sx={{color:"black"}}  value="工人" control={<Radio />} label="工人" />
              <FormControlLabel sx={{color:"black"}}  value="其他" control={<Radio />} label="其他" />
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 0.5, width: '10rem' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="studentofRespondents-other-textfill" label="其他" variant="filled" />
              </Box>
            </RadioGroup>
          </FormControl>
        </div>

        

        <div className={styles.question}>
         <FormControl>
            <FormLabel id="resident-population-label">3)	家庭的長期固定居住人口（包括住家工人）：</FormLabel>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '95%' },
              }}
              noValidate
            >
              <TextField id="resident-population" label="人口" variant="outlined" />
            </Box>
          </FormControl>
        </div>

        <div className={styles.question}>
          <FormControl>
            <FormLabel id="resident-population-student-label">4)  長期固定居住人口中，在澳門幼兒園、小學、中學就讀的：</FormLabel>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '95%' },
              }}
              noValidate
            >
              <TextField id="resident-population-student" label="人" variant="outlined" />
            </Box>
          </FormControl>
        </div>

        <div className={styles.question}>
          <FormControl>
            <FormLabel id="total-income-radio-buttons-group-label">5) 家庭總月收入是（每月可處置的收入總和，但不含住戶成員間的贈與，如生活費、零用等）：</FormLabel>
            <RadioGroup
              row
              aria-labelledby="total-income-radio-buttons-group-label"
              defaultValue="本人"
              name="total-income-radio-buttons-group"
            >
              <FormControlLabel sx={{color:"black"}}  value="<$3,000" control={<Radio />} label="<$3,000" />
              <FormControlLabel sx={{color:"black"}}  value="$3,000~$3,999" control={<Radio />} label="$3,000~$3,999" />
              <FormControlLabel sx={{color:"black"}}  value="$4,000~$5,999" control={<Radio />} label="$4,000~$5,999" />
              <FormControlLabel sx={{color:"black"}}  value="$6,000~$7,999" control={<Radio />} label="$6,000~$7,999" />
              <FormControlLabel sx={{color:"black"}}  value="$8,000~$9,999" control={<Radio />} label="$8,000~$9,999" />
              <FormControlLabel sx={{color:"black"}}  value="$10,000~$11,999" control={<Radio />} label="$10,000~$11,999" />
              <FormControlLabel sx={{color:"black"}}  value="$12,000~$13,999" control={<Radio />} label="$12,000~$13,999" />
              <FormControlLabel sx={{color:"black"}}  value="$14,000~$14,999" control={<Radio />} label="$14,000~$14,999" />
              <FormControlLabel sx={{color:"black"}}  value="$15,000~$19,999" control={<Radio />} label="$15,000~$19,999" />
              <FormControlLabel sx={{color:"black"}}  value="$20,000~$39,999" control={<Radio />} label="$20,000~$39,999" />
              <FormControlLabel sx={{color:"black"}}  value="$40,000~$59,999" control={<Radio />} label="$40,000~$59,999" />
              <FormControlLabel sx={{color:"black"}}  value="$60,000~$99,999" control={<Radio />} label="$60,000~$99,999" />
              <FormControlLabel sx={{color:"black"}}  value=">=$100,000" control={<Radio />} label=">=$100,000" />
              <FormControlLabel sx={{color:"black"}}  value="不清楚" control={<Radio />} label="不清楚" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.question}>
          <FormControl>
            <FormLabel id="vehicle_check-radio-buttons-group-label">6)	所有家庭成員有沒有私人車輛?：</FormLabel>
            <RadioGroup
              row
              aria-labelledby="vehicle_check-radio-buttons-group-label"
              defaultValue="本人"
              name="vehicle_check-radio-buttons-group"
            >
              <FormControlLabel sx={{color:"black"}}  value="有" control={<Radio />} label="有" />
              <FormControlLabel sx={{color:"black"}}  value="無" control={<Radio />} label="無" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.question}>
          <Button href={"/surveyvehicleInfo"}>
            Next
          </Button>
        </div>
      </div>
    </main>
    
    );
}

export default App;
