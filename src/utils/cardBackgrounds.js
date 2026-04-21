import janjanhadaImg from "../img/jan.png";
import meomuldaImg from "../img/m.png";
import banjjagidaImg from "../img/s.png";
import seumyeodeuldaImg from "../img/su.png";

const directWordImages = {
  잔잔하다: janjanhadaImg,
  머물다: meomuldaImg,
  반짝이다: banjjagidaImg,
  스며들다: seumyeodeuldaImg,
};

const toneProfiles = {
  water: { hue: [188, 226], saturation: [24, 58], lightness: [20, 92] },
  forest: { hue: [102, 156], saturation: [20, 52], lightness: [16, 88] },
  dusk: { hue: [220, 286], saturation: [18, 46], lightness: [14, 88] },
  dawn: { hue: [198, 236], saturation: [28, 56], lightness: [34, 96] },
  paper: { hue: [24, 52], saturation: [16, 34], lightness: [34, 94] },
  ember: { hue: [2, 28], saturation: [34, 72], lightness: [16, 92] },
  city: { hue: [190, 214], saturation: [8, 26], lightness: [16, 86] },
  bloom: { hue: [312, 346], saturation: [22, 60], lightness: [22, 92] },
  meadow: { hue: [88, 132], saturation: [24, 56], lightness: [18, 94] },
  mist: { hue: [198, 214], saturation: [10, 24], lightness: [32, 96] },
  gold: { hue: [34, 58], saturation: [34, 76], lightness: [18, 92] },
  sky: { hue: [196, 214], saturation: [30, 62], lightness: [20, 94] },
  plum: { hue: [266, 316], saturation: [20, 58], lightness: [18, 90] },
  coral: { hue: [8, 20], saturation: [40, 76], lightness: [22, 92] },
  stone: { hue: [26, 42], saturation: [8, 24], lightness: [24, 90] },
  aurora: { hue: [142, 188], saturation: [28, 64], lightness: [18, 94] },
};

const moodKeywords = [
  { tone: "water", words: ["잔잔", "고요", "호수", "静", "calm", "still", "余韻", "linger"] },
  { tone: "forest", words: ["木漏れ日", "숲", "나무", "포근", "warm", "cozy", "ぬくもり", "安宁"] },
  { tone: "dusk", words: ["한", "아련", "그리", "懐", "切な", "惆怅", "bittersweet", "wistful", "yearning", "homesick"] },
  { tone: "dawn", words: ["선연", "맑", "澄", "lucid", "clear", "serene", "평온"] },
  { tone: "paper", words: ["侘び寂び", "불완전", "여운", "afterglow", "余味", "纸", "静谧"] },
  { tone: "ember", words: ["화", "분노", "긴장", "당황", "惊", "火", "ang", "awkward", "민망", "부끄"] },
  { tone: "city", words: ["도시", "군중", "人情", "烟火", "sonder", "scene", "crowd", "직관"] },
  { tone: "bloom", words: ["설레", "기쁨", "반짝", "心花", "surprise", "delight", "sparkle"] },
  { tone: "meadow", words: ["싱그", "清欢", "fresh", "희망", "안심", "solace", "peace"] },
  { tone: "mist", words: ["스며", "촉촉", "mist", "hazy", "朦胧", "fog", "fuzzy"] },
  { tone: "gold", words: ["기대", "용기", "勇気", "chance", "희열", "결심"] },
  { tone: "sky", words: ["선선", "서늘", "breeze", "そよ風", "wind", "fleeting"] },
  { tone: "plum", words: ["그윽", "은은", "深", "幽", "murmur", "reverie"] },
  { tone: "coral", words: ["다정", "温柔", "tender", "warmth", "반갑", "흥", "laugh"] },
  { tone: "stone", words: ["담담", "平", "淡然", "steady", "sober", "resolve"] },
  { tone: "aurora", words: ["번뜩", "spark", "빛", "luminous", "glow", "희망", "fresh"] },
];

function hashText(text = "") {
  return [...text].reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7);
}

function getTone(text = "") {
  const target = text.toLowerCase();

  for (const entry of moodKeywords) {
    if (entry.words.some((word) => target.includes(word.toLowerCase()))) {
      return entry.tone;
    }
  }

  const keys = Object.keys(toneProfiles);
  return keys[Math.abs(hashText(text)) % keys.length];
}

function hsl(h, s, l, a = 1) {
  if (a === 1) return `hsl(${h} ${s}% ${l}%)`;
  return `hsl(${h} ${s}% ${l}% / ${a})`;
}

function pickInRange(min, max, seed, offset) {
  const span = max - min;
  return min + ((seed >> offset) % (span + 1));
}

function buildPalette(seed, tone) {
  const profile = toneProfiles[tone] || toneProfiles.mist;
  const baseHue = pickInRange(profile.hue[0], profile.hue[1], seed, 1);
  const accentHue = (baseHue + 18 + (seed % 74)) % 360;
  const deepHue = (baseHue + 320 + (seed % 38)) % 360;
  const satStrong = pickInRange(profile.saturation[0], profile.saturation[1], seed, 3);
  const satSoft = Math.max(8, satStrong - (10 + (seed % 14)));
  const lightDark = pickInRange(profile.lightness[0], Math.min(profile.lightness[0] + 16, profile.lightness[1]), seed, 5);
  const lightMid = pickInRange(lightDark + 16, Math.min(lightDark + 34, profile.lightness[1] - 18), seed, 7);
  const lightGlow = pickInRange(Math.max(lightMid + 10, 64), profile.lightness[1], seed, 9);
  const lightMist = Math.min(97, lightGlow + 6 + (seed % 4));

  return {
    dark: hsl(deepHue, satStrong, lightDark),
    mid: hsl(baseHue, Math.max(16, satStrong - 6), lightMid),
    accent: hsl(accentHue, Math.min(86, satStrong + 8), Math.max(40, lightMid - 4)),
    glow: hsl(baseHue, Math.max(18, satSoft), lightGlow, 0.88),
    mist: hsl((baseHue + 8) % 360, Math.max(8, satSoft - 6), lightMist, 0.96),
    spark: hsl(accentHue, Math.max(18, satStrong - 2), Math.min(96, lightGlow + 4), 0.9),
    veil: hsl(deepHue, Math.max(10, satSoft - 8), Math.max(10, lightDark - 8), 0.18),
  };
}

function layeredBackground(seedText, tone) {
  const seed = Math.abs(hashText(seedText));
  const palette = buildPalette(seed, tone);
  const x1 = 15 + (seed % 55);
  const y1 = 18 + (seed % 42);
  const x2 = 55 + (seed % 28);
  const y2 = 24 + (seed % 35);
  const x3 = 20 + (seed % 60);
  const x4 = 12 + (seed % 68);
  const y4 = 60 + (seed % 18);
  const angle = 110 + (seed % 40);
  const overlayAngle = 150 + (seed % 20);
  const veilAngle = 32 + (seed % 44);

  return [
    `radial-gradient(circle at ${x1}% ${y1}%, ${palette.spark} 0 2px, transparent 10px)`,
    `radial-gradient(circle at ${x2}% ${y2}%, ${palette.glow}, transparent 74px)`,
    `radial-gradient(circle at ${x3}% 78%, ${palette.accent}aa, transparent 126px)`,
    `radial-gradient(circle at ${x4}% ${y4}%, ${palette.mist}, transparent 110px)`,
    `linear-gradient(${veilAngle}deg, ${palette.veil}, transparent 58%)`,
    `linear-gradient(${overlayAngle}deg, rgba(255,255,255,0.08), rgba(0,0,0,0.12))`,
    `linear-gradient(${angle}deg, ${palette.dark}, ${palette.mid} 38%, ${palette.accent} 72%, ${palette.mist})`,
  ].join(", ");
}

export function getWordJogakImageStyle(card) {
  const directImage = directWordImages[card.word];

  if (directImage) {
    return {
      backgroundImage: `url(${directImage})`,
    };
  }

  return {
    backgroundImage: layeredBackground(
      `${card.word}-${card.meaning}-${card.language}`,
      getTone(`${card.word} ${card.meaning} ${card.description}`)
    ),
  };
}

export function getGoyuImageStyle(card) {
  return {
    backgroundImage: layeredBackground(
      `${card.word}-${card.language}-${card.meaning}`,
      getTone(`${card.word} ${card.meaning} ${card.description}`)
    ),
  };
}

export function getBiyuImageStyle(card) {
  return {
    backgroundImage: layeredBackground(
      `${card.title}-${card.subtitle}-${card.phrase.join("-")}`,
      getTone(`${card.title} ${card.subtitle} ${card.phrase.join(" ")}`)
    ),
  };
}
