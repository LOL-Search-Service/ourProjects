import process from "dotenv";

const API_KEY = process.env.API_KEY;
console.log(API_KEY);

const ROTATION_URL = `https://kr.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`;
const CHAMPION_URL =
    "https://ddragon.leagueoflegends.com/cdn/10.6.1/data/ko_KR/champion.json";

const lotationInfo = [];
const lotationImg = [];
let all;

let y = 1;

async function showAvatar() {
    // JSON 읽기
    let freeChampRes = await fetch(ROTATION_URL);
    let freeChamp = await freeChampRes.json();
    let free = freeChamp.freeChampionIds;

    let allChampRes = await fetch(CHAMPION_URL);
    let ChampInfo = await allChampRes.json();
    all = Object.entries(ChampInfo.data);

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 148; j++) {
            if (free[i] === Number(all[j][y].key)) {
                lotationInfo.push(JSON.stringify(all[j][y].name));
                lotationImg.push(JSON.stringify(all[j][y].image.full));
            }
        }
    }

    for (let i = 0; i < 15; i++) {
        const CHAMPION_IMG_URL = `http://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${JSON.parse(
            lotationImg[i]
        )}`;

        document.getElementById(`lotationchamp-img_${i + 1}`).src =
            CHAMPION_IMG_URL;
    }
}
showAvatar();
