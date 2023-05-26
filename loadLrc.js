import axios from 'axios';
import fs from 'fs';
axios.get('https://music.163.com/api/song/media?id=28258728').then((res) => {
  fs.writeFile(`./src/assets/1.lrc`, res.data.lyric, (err) => {
    console.log('err = ', err);
  });
});
