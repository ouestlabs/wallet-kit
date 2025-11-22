import { readFileSync } from "node:fs";
import { notFound } from "next/navigation";
import { generateOGImage } from "@/lib/og";
import { source } from "@/lib/source";

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[[...slug]]">
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  const fontSerif = readFileSync("src/lib/fonts/instrument-serif.ttf");
  const fontSans = readFileSync("src/lib/fonts/bricolage-grotesque.ttf");

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    variant: "docs",
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

export function generateStaticParams() {
  return source.generateParams().map((params) => ({
    slug: params.slug ?? undefined,
  }));
}
