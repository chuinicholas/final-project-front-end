import styles from "./BulletinBoard.module.css";
import shopNews from "../JS_Data/shopNews";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const tagBarCollection = [
  {'name': "活動優惠", 'btnStyle': styles.btn_tagBar1, 'spnStyle': styles.spn_tagBar1, 'iptStyle': styles.ipt_tagBar1},
  {'name': "最新商品", 'btnStyle': styles.btn_tagBar2, 'spnStyle': styles.spn_tagBar2, 'iptStyle': styles.ipt_tagBar2},
  {'name': "店舖資訊", 'btnStyle': styles.btn_tagBar3, 'spnStyle': styles.spn_tagBar3, 'iptStyle': styles.ipt_tagBar3},
]
const cardTagCollection = {
  "活動優惠": styles.tagName1,
  "最新商品": styles.tagName2,
  "店舖資訊": styles.tagName3,
}

export default function BulletinBoard() {
  const [isChecked_tag, setIsChecked_tag] = useState({});
  const [isChecked_allTag, setIsChecked_allTag] = useState();
  const [showingNews, setShowingNews] = useState([]);
  const [outletContextObj] = useOutletContext();
  const setCurrentNews = outletContextObj['currentNews'][1];
  
  useEffect(() => {
    const defaultIsChecked = () => {
      let obj = {}
      for(let i = 0; i < tagBarCollection.length; i++) {
        obj[tagBarCollection[i]['name']] = true
      }
      setIsChecked_tag(obj)
    }
    defaultIsChecked()
  },[])

  useEffect(() => {
    let updatedArr = []
    for(let i = 0; i < shopNews.length; i++) {
      if(isChecked_tag[shopNews[i]['tag']]) {
        updatedArr.push(shopNews[i])
      }
    }
    console.log(updatedArr)
    setShowingNews(updatedArr)
  },[isChecked_tag])

  useEffect(() => {
    let countTrue = 0
    let countFalse = 0
    for(let i = 0; i < tagBarCollection.length; i++) {
      if(isChecked_tag[tagBarCollection[i]['name']]) {
        countTrue++
      } else {
        countFalse++
      }
    }
    if(countTrue === tagBarCollection.length){
      setIsChecked_allTag(true)
    }
    if(countFalse >= 1) {
      setIsChecked_allTag(false)
    }
  },[isChecked_tag])

  function handleTagBarBtn_all() {
    console.log(isChecked_allTag)
    const bol = !isChecked_allTag
    /* // mothed 2
    for(let i = 0; i < tagBarCollection.length; i++) {
      setIsChecked_tag((prevData) => ({
        ...prevData,
        [tagBarCollection[i]['name']]: bol
      }));
    } */
    setIsChecked_allTag(bol); 

    const updatedObj = {};
    tagBarCollection.forEach(item => {
      updatedObj[item.name] = bol;
    });
    setIsChecked_tag(updatedObj); 
  }
  function handleTagBarBtn(name) {
    /* // old
    let newObj = isChecked_tag
    newObj[name] = !isChecked_tag[name]
    setIsChecked_tag(newObj) */
    setIsChecked_tag((prevData) => ({
      ...prevData,
      [name]: !prevData[name]
    }));
  }
  function handleReadMore(id) {
    setCurrentNews(id)
  }

  return (<>
    <div className={styles.bgContainer}>
      <div className={styles.filterBar}>
        <div className={styles.tagBar}>
          <button className={styles.btn_tagBar0} onClick={() => handleTagBarBtn_all()}>
            <div>
              {isChecked_allTag ?
                (<input type="checkbox" className={styles.ipt_tagBar0} checked></input>) :
                (<input type="checkbox" className={styles.ipt_tagBar0}></input>)
              }
            </div>
            <span className={styles.spn_tagBar0}>全選</span>
          </button>
          <div style={{height: "75%", width: "2px", margin: "0 10px", backgroundColor: "#767676"}}></div>
          <>{tagBarCollection.map((item, index) => {
            return (<>
              <button key={index} className={item.btnStyle} onClick={() => handleTagBarBtn(item.name)}>
                <div>
                  {isChecked_tag &&
                  isChecked_tag[item.name]?
                    (<input type="checkbox" className={item.iptStyle} checked></input>) :
                    (<input type="checkbox" className={item.iptStyle}></input>)
                  }
                </div>
                <span className={item.spnStyle}>{item.name}</span>
              </button>
            </>)
          })}</>
        </div>
        {/* <div className={styles.timeBar}>time bar here</div> */}
      </div>
      <div className={styles.adsCard_container}>
        {/* {shopNews.map((news, index) => { */}
        {showingNews &&
          showingNews.map((news, index) => {
            return(
              <div key={index} className={`${"w-full mb-10 bg-[#EBE3D5] border border-gray-200 rounded-lg"} ${styles.adsCard}`}>
                <img className="rounded-t-lg" src={news['src']} alt="" />
                <div className="p-5 ">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900">{news['title']}</h5>
                  <div className={cardTagCollection[news['tag']]}>{news['tag']}</div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-lg text-gray-700">{news['release_time']}</p>
                    <Link to="/news" onClick={() => handleReadMore(news['id'])} className="inline-flex items-center px-3 py-2 text-lg font-medium text-center text-[#8D7A5B] rounded-lg hover:bg-[#D1CABD]">
                      閱讀更多
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  </>);
}
