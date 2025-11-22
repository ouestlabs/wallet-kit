import { readFileSync } from "node:fs";
import { generateOGImage } from "@/lib/og";

export default function OpenGraphImage() {
  const fontSerif = readFileSync("src/lib/fonts/instrument-serif.ttf");
  const fontSans = readFileSync("src/lib/fonts/bricolage-grotesque.ttf");

  return generateOGImage({
    title: "wallet/kit",
    description:
      "A set of accessible and composable Wallet UI components. Built on top of shadcn/ui, it's designed for you to copy, paste, and own.",
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
