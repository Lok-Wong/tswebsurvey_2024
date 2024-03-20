import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

function handleClick() {
  console.log("increment like count")
}

export default function Home() {
  return (
    <main className={styles.main}>
        <div className={styles.description}>
          <p>
            tsWebSurvey2024_V0.1
          </p>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/ts2024Logo.jpeg"
                alt="ts2024 Logo"
                className={styles.vercelLogo}
                width={120}
                height={34}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.startLetter}>
          <a>
            親愛的先生／女士，您好：<br />
    　　    歡迎您參加『澳門線上學生出行調查』。這次調查的主要目的是想了解澳門中小學及幼兒園學生的出行習慣，以及使用交通服務的情况。您的寶貴資料和意見對這個研究非常重要，同時對學校周邊交通建設和澳門未來的交通規劃、管理、改善都有非常大的幫助。問卷填寫每人約只需要用五分鐘的時間，懇請您抽空作答。您所填寫的個人資料只會用於研究分析，絕不對外公開，請您安心回答。感謝閣下的支持與協助。
    　　    <br /><br />敬祝您　　身體健康
          </a>
          <a>
            <br />
          </a>
          <div className={styles.startTextcompany}>
            <a >
            <br />
              執行單位：澳大創科有限公司
            </a>
          </div>
        </div>


        <div>
          <Link href={'/surveyheadholder'} className={styles.nextPageButton}>
            開始訪問
          </Link>
        </div>      
    </main>
  );
}
