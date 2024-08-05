import { useEffect, useState } from "react";
import styles from "./carousel.module.css";
import { Link, useOutletContext } from "react-router-dom";
import shopNews from "../JS_Data/shopNews";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timer_autoSlide, setTimer_autoSlide] = useState(() => {});
  const [isAutoSlide, setIsAutoSlide] = useState(true);
  const [outletContextObj] = useOutletContext();
  const setCurrentNews = outletContextObj['currentNews'][1];

  let showingNews = []
  const showingNewss = () => {
      return shopNews.filter((news) => news['showing'] === true);
  }
  showingNews = showingNewss()

  useEffect(() => {
    clearTimeout(timer_autoSlide);
    if(isAutoSlide === true) {
      setTimer_autoSlide(
        setTimeout(() => {
          setCurrentSlide((prevIndex) => (prevIndex + 1) % showingNews.length);
        }, 3000)
      );
    }
  }, [currentSlide, isAutoSlide]);
  function handleImg(id) {
    setCurrentNews(id)
    console.log(id);
  }
  function handleDot(id) {
    setCurrentSlide(id);
  }
  function handleNext() {
    setCurrentSlide((currentSlide + 1) % showingNews.length);
  }
  function handlePrev() {
    setCurrentSlide((currentSlide - 1 + showingNews.length) % showingNews.length);
  }
  function handleMouseOver() {
    setIsAutoSlide(false);
  }
  function handleMouseOut() {
    setIsAutoSlide(true);
  }
  return (
    /* src="https://flowbite.com/docs/images/carousel/carousel-1.svg" */ 
    <div className={styles.carousel_container} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={styles.poster_container}>
        {showingNews.map((news, index) => {/* "h-full w-full hidden duration-700 ease-in-out" *//* "h-full w-full object-contain absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 1" */
          return (<>
            { currentSlide === index ? 
              (<div key={index} className={styles.poster}>
                <Link to="/news" className={styles.poster_link}>
                  <img src={news['src']} onClick={() => handleImg(news['id'])}/>
                </Link>
              </div>) : 
              (<div key={index} className={styles.poster_hidden}>
                <Link to="/news" className={styles.poster_link}>
                  <img src={news['src']} onClick={() => handleImg(news['id'])}/>
                </Link>
              </div>)
            }
          </>)
        })}
      </div>
      <div className={styles.dotButton_container}>
        {showingNews.map((news, index) => {
          return (<>
            { currentSlide === index ? 
            (<button key={index} className={styles.dotButton_selected} onClick={() => handleDot(index)}></button>) :
            (<button key={index} className={styles.dotButton} onClick={() => handleDot(index)}></button>)
            }
          </>)
        })}
      </div>
      { isAutoSlide === true ?
      (<></>) :
      (<><div className="absolute top-1/2 left-3 -translate-y-1/2 z-1">
        <button onClick={() => handlePrev()} className="flex items-center justify-center cursor-pointer group focus:outline-none ">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/60 ring-[2px] ring-gray-500 group-hover:bg-white group-focus:bg-gray-500 group-focus:ring-[6px] group-focus:ring-white group-focus:outline-none">
            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 group-focus:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="sr-only">Carousel Previous</span>
          </span>
        </button>
      </div>
      <div className="absolute top-1/2 right-3 -translate-y-1/2 z-1">
          <button onClick={() => handleNext()} className=" flex items-center justify-center cursor-pointer group focus:outline-none">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/60 ring-[2px] ring-gray-500 group-hover:bg-white group-focus:bg-gray-500 group-focus:ring-[6px] group-focus:ring-white group-focus:outline-none">
              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 group-focus:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <span className="sr-only">Carousel Next</span>
            </span>
          </button>
      </div></>)}
    </div>
  );
}
