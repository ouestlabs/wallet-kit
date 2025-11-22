import { readFileSync } from "node:fs";
import { generateOGImage } from "@/lib/og";

export default function OpenGraphImage() {
  const fontSerif = readFileSync("src/lib/fonts/instrument-serif.ttf");
  const fontSans = readFileSync("src/lib/fonts/bricolage-grotesque.ttf");

  return generateOGImage({
    primaryTextColor: "rgb(240,240,240)",
    title: "wallet/kit",
    description: "A set of accessible and composable Wallet Kit components.",
    fonts: [
      {
        name: "Instrument Serif",
        data: fontSerif,
      },
      {
        name: "Bricolage Grotesque",
        data: fontSans,
      },
    ],
  });
}
