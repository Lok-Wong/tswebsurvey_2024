'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';





function App() {
    const router = useRouter();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
      };
      
    const [age1, setAge1] = React.useState('');
    const handleChange1 = (event) => {
        setAge1(event.target.value);
    };

    return (
        <main className={styles.main}>
            <div>
                <h1>
                    住戶持有車輛資料
                </h1>
            </div>
            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                    <label>
                        <FormControlLabel control={<Checkbox/>} label="私家車" />
                    </label>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p  className={styles.p}>當中，純電動車數量</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>自置停車位</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>附屬於車位的停車空間</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>私人停車場（月租）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（時鐘票）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（月租）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（咪錶）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（免費）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>其他／備註</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>
            </div>

            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                    <label>
                        <FormControlLabel control={<Checkbox/>} label="電單車" />
                    </label>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>當中，純電動車數量</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>自置停車位</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>附屬於車位的停車空間</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>私人停車場（月租）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（時鐘票）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（月租）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（咪錶）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（免費）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>其他／備註</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>
            </div>

            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                    <label>
                        <FormControlLabel control={<Checkbox/>} label="貨車" />
                    </label>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>當中，純電動車數量</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>自置停車位</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>附屬於車位的停車空間</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>私人停車場（月租）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（時鐘票）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（月租）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（咪錶）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（免費）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>其他／備註</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>
            </div>

            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                    <label>
                        <FormControlLabel control={<Checkbox/>} label="單車" />
                    </label>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>當中，純電動車數量</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>自置停車位</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>附屬於車位的停車空間</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>私人停車場（月租）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（時鐘票）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    {/* <Survey model={survey} /> */}
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（月租）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（咪錶）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（免費）</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>其他／備註</p>
                            {/* <InputLabel id="total-vehicel-select-label">總數量</InputLabel> */}
                            <Box width={50}>
                                <TextField 
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>
            </div>
            <Button onClick={() => router.back()}>
                previous
            </Button>
            <Button href={'/surveystudentinfo'}>
                next
            </Button>

        </main>

        
    )
}



export default App;
