import styles from "./News.module.css"
import { useOutletContext } from "react-router-dom";
import shopNews from "../JS_Data/shopNews";

export default function News() {
  const [outletContextObj] = useOutletContext();
  const currentNews = outletContextObj['currentNews'][0];
  const newsIndex = currentNews - 1
  return(<>
    <div className={styles.bg_container}>
      <img className={styles.poster} src={shopNews[newsIndex]['src']}/>
      <div className={styles.title}>{shopNews[newsIndex]['title']}</div>
      <div style={{height: "3px", width: "90%", backgroundColor: "#767676"}}></div>
      <div className={styles.info_container}>
        <div className={styles.tag}>{shopNews[newsIndex]['tag']}</div>
        <div className={styles.time}>{shopNews[newsIndex]['release_time']}</div>
      </div>
      <div className={styles.article_container}>
        <div className={styles.article}>
          {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
          Grab & Go 外賣自取專門店<br/><br/>
          想要快速方便地享用美食？Grab & Go 外賣自取專門店為您提供最佳解決方案！無論您是忙碌的上班族，還是需要快速解決一餐的學生，我們都能滿足您的需求。<br/><br/>
          網上落單，輕鬆快捷：<br/>
          • 簡單方便：只需幾步即可完成網上訂單，無需排隊等候。<br/>
          • 多樣選擇：我們提供豐富的菜單選擇，滿足您的不同口味需求。<br/>
          • 即時取餐：下單後即可前往門店自取，節省您的寶貴時間。<br/><br/>
          
        </div>
        <div className={styles.closing}>
          {/* xxxxxxx xxxxxxx */}
          立即行動，享受便捷美食體驗！<br/>
          Grab & Go，讓美食觸手可及！<br/>
        </div>
        <div className={styles.logo}>
          <img className={styles.img_logo1} src="fav.png" />
          <h1 className="animate__animated animate__headShake">Grab & Go</h1>
        </div>
      </div>
      <div style={{height: "30px", width: "100%", margin: "70px", borderBottomLeftRadius: "50px", borderBottomRightRadius: "50px", borderBottomWidth: "5px", borderColor: "#767676"}}></div>
    </div>
  </>)

}