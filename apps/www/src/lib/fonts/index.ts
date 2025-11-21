import LocalFont from "next/font/local";

const fontSans = LocalFont({
  src: "./bricolage-grotesque.ttf",
  weight: "400",
  variable: "--font-sans",
});

const fontSerif = LocalFont({
  src: "./instrument-serif.ttf",
  weight: "400",
  variable: "--font-serif",
});
const fontMono = LocalFont({
  src: "./geist-mono.ttf",
  weight: "400",
  variable: "--font-mono",
});

export { fontSans, fontSerif, fontMono };
