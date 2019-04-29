
export class Trie {
  constructor() {
    this.words = 0;
    this.empty = 1;
    this.index = 0;
    this.children = {};
  }
  insert(str, pos, idx) {
    if (str.length === 0) {
      return;
    }
    let T = this;
    let k;
    let child;

    if (pos === undefined) {
      pos = 0;
    }
    if (pos === str.length) {
      T.index = idx;
      return;
    }
    k = str[pos];
    if (T.children[k] === undefined) {
      T.children[k] = new Trie();
      T.empty = 0;
      T.children[k].words = this.words + 1;
    }
    child = T.children[k];
    child.insert(str, pos + 1, idx);
  }

  build(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      this.insert(arr[i], 0, i);
    }
  }

  searchOne(str, pos) {
    if (pos === undefined) {
      pos = 0;
    }
    let result = {};
    if (str.length === 0) return result;
    let T = this;
    let child;
    let k;
    result.arr = [];
    k = str[pos];
    child = T.children[k];
    if (child !== undefined && pos < str.length) {
      return child.searchOne(str, pos + 1);
    }
    if (child === undefined && T.empty === 0) return result;
    if (T.empty == 1) {
      result.arr[0] = pos - T.words;
      result.arr[1] = T.index;
      result.words = T.words;
      return result;
    }
    return result;
  }

  search(str) {
    if (this.empty == 1) return [];
    let len = str.length;
    let searchResult = [];
    let tmp;
    for (let i = 0; i < len - 1; i++) {
      tmp = this.searchOne(str, i);
      if (typeof tmp.arr !== 'undefined' && tmp.arr.length > 0) {
        searchResult.push(tmp.arr);
        i = i + tmp.words - 1;
      }
    }
    return searchResult;
  }
}

export class Emotion {
  constructor() {
    this.emotion_map = { "/::)": "0.gif", "/::~": "1.gif", "/::B": "2.gif", "/::|": "3.gif", "/:8-)": "4.gif", "/::<": "5.gif", "/::$": "6.gif", "/::X": "7.gif", "/::Z": "8.gif", "/::'(": "9.gif", "/::-|": "10.gif", "/::@": "11.gif", "/::P": "12.gif", "/::D": "13.gif", "/::O": "14.gif", "/::(": "15.gif", "/::+": "16.gif", "/:--b": "17.gif", "/::Q": "18.gif", "/::T": "19.gif", "/:,@P": "20.gif", "/:,@-D": "21.gif", "/::d": "22.gif", "/:,@o": "23.gif", "/::g": "24.gif", "/:|-)": "25.gif", "/::!": "26.gif", "/::L": "27.gif", "/::>": "28.gif", "/::,@": "29.gif", "/:,@f": "30.gif", "/::-S": "31.gif", "/:?": "32.gif", "/:,@x": "33.gif", "/:,@@": "34.gif", "/::8": "35.gif", "/:,@!": "36.gif", "/:!!!": "37.gif", "/:xx": "38.gif", "/:bye": "39.gif", "/:wipe": "40.gif", "/:dig": "41.gif", "/:handclap": "42.gif", "/:&-(": "43.gif", "/:B-)": "44.gif", "/:<@": "45.gif", "/:@>": "46.gif", "/::-O": "47.gif", "/:>-|": "48.gif", "/:P-(": "49.gif", "/::'|": "50.gif", "/:X-)": "51.gif", "/::*": "52.gif", "/:@x": "53.gif", "/:8*": "54.gif", "/:pd": "55.gif", "/:<W>": "56.gif", "/:beer": "57.gif", "/:basketb": "58.gif", "/:oo": "59.gif", "/:coffee": "60.gif", "/:eat": "61.gif", "/:pig": "62.gif", "/:rose": "63.gif", "/:fade": "64.gif", "/:showlove": "65.gif", "/:heart": "66.gif", "/:break": "67.gif", "/:cake": "68.gif", "/:li": "69.gif", "/:bome": "70.gif", "/:kn": "71.gif", "/:footb": "72.gif", "/:ladybug": "73.gif", "/:shit": "74.gif", "/:moon": "75.gif", "/:sun": "76.gif", "/:gift": "77.gif", "/:hug": "78.gif", "/:strong": "79.gif", "/:weak": "80.gif", "/:share": "81.gif", "/:v": "82.gif", "/:@)": "83.gif", "/:jj": "84.gif", "/:@@": "85.gif", "/:bad": "86.gif", "/:lvu": "87.gif", "/:no": "88.gif", "/:ok": "89.gif", "/:love": "90.gif", "/:<L>": "91.gif", "/:jump": "92.gif", "/:shake": "93.gif", "/:<O>": "94.gif", "/:circle": "95.gif", "/:kotow": "96.gif", "/:turn": "97.gif", "/:skip": "98.gif", "/:oY": "99.gif" };
    this.emotion_list = [];
    this.trie = null;
    this.build();
  }

  build() {
    this.emotion_list = this.keys(this.emotion_map);
    this.trie = new Trie();
    this.trie.build(this.emotion_list);
  }

  parser(str) {
    const indices = this.trie.search(str);
    indices.reverse().map(idx => {
      const pos = idx[0];
      const emotion = this.emotion_list[idx[1]]
      const img = '<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + this.emotion_map[emotion] + '" alt="' + emotion + '" />';
      str = this.splice(str, pos, emotion.length, img);
    });
    return str;
  }

  splice(str, index, count, add) {
    return str.slice(0, index) + add + str.slice(index + count);
  }

  keys(map) {
    let list = [];
    for (let k in map) {
      if (map.hasOwnProperty(k)) list.push(k);
    }
    return list;
  }
}

const emotionParser = (text) => {
  let parser = wx.getStorageSync('motionParser');
  if (!parser) {
    parser = new Emotion();
    wx.setStorageSync('motionParser', parser);
  }
  return new Emotion().parser(text);
}
export default {
  emotionParser
}