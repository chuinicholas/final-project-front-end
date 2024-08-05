import React, { useState, useEffect } from "react";
import styles from "./RankTable.module.css";
import rankPic from "../image/rankTable.png";
import Tooltip from "@mui/material/Tooltip";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import { useOutletContext } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSpring, animated } from "react-spring";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

function RankTable() {
  const [ranked, setRanked] = useState([]);
  const [outletContextObj] = useOutletContext();
  const addFood = outletContextObj["addFood"];

  useEffect(() => {
    async function fetchRanked() {
      try {
        const res = await fetch("http://localhost:3001/rankedProducts");
        const result = await res.json();
        setRanked(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRanked();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <p className={styles.title}>Top 10 銷售量餐點</p>
        <Tooltip title="Delicious~" arrow>
          <img className={styles.rankImg} src={rankPic}></img>
        </Tooltip>
      </div>
      <div className={styles.top3Box}>
        {ranked.length > 0 && (
          <div className={styles.top1}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-50 dark:ring-gray-50"
                src={ranked[0]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[0]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[0]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[0]["name_c"],
                      ranked[0]["price"],
                      ranked[0]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
        {ranked.length > 0 && (
          <div className={styles.top2}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-50 dark:ring-gray-50"
                src={ranked[1]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[1]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[1]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[1]["name_c"],
                      ranked[1]["price"],
                      ranked[1]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
        {/**/}{" "}
        {ranked.length > 0 && (
          <div className={styles.top3}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-50 dark:ring-gray-50"
                src={ranked[2]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[2]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[2]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[2]["name_c"],
                      ranked[2]["price"],
                      ranked[2]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
      </div>
      <div className={styles.restRankBox}>
        {ranked.length > 0 && (
          <div className={styles.restRank}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-800 dark:ring-gray-800"
                src={ranked[3]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[3]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[3]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[3]["name_c"],
                      ranked[3]["price"],
                      ranked[3]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
        {ranked.length > 0 && (
          <div className={styles.restRank}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-800 dark:ring-gray-800"
                src={ranked[4]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[4]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[4]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[4]["name_c"],
                      ranked[4]["price"],
                      ranked[4]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
        {ranked.length > 0 && (
          <div className={styles.restRank}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-800 dark:ring-gray-800"
                src={ranked[5]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[5]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[5]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[5]["name_c"],
                      ranked[5]["price"],
                      ranked[5]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
        {ranked.length > 0 && (
          <div className={styles.restRank}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-800 dark:ring-gray-800"
                src={ranked[6]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[6]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[6]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[6]["name_c"],
                      ranked[6]["price"],
                      ranked[6]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
        {ranked.length > 0 && (
          <div className={styles.restRank}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-800 dark:ring-gray-800"
                src={ranked[7]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[7]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[7]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[7]["name_c"],
                      ranked[7]["price"],
                      ranked[7]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
        {ranked.length > 0 && (
          <div className={styles.restRank}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-800 dark:ring-gray-800"
                src={ranked[8]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[8]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[8]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[8]["name_c"],
                      ranked[8]["price"],
                      ranked[8]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
        {ranked.length > 0 && (
          <div className={styles.restRank}>
            <div className={styles.foodPic}>
              <img
                class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-800 dark:ring-gray-800"
                src={ranked[9]["img_url"]}
                alt="Bordered avatar"
              />
            </div>
            <div className={styles.foodName}>
              <p>{ranked[9]["name_c"]}</p>
            </div>
            <div className={styles.sales}>
              <Button variant="outlined" color="error" size="large">
                {" "}
                <WhatshotIcon />
                <Number n={ranked[9]["sales"]} />
              </Button>
            </div>
            <div className={styles.addBtn}>
              <Zoom in={true}>
                <Fab
                  onClick={() =>
                    addFood(
                      ranked[9]["name_c"],
                      ranked[9]["price"],
                      ranked[9]["img_url"]
                    )
                  }
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Zoom>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RankTable;
