import { NextRequest, NextResponse } from "next/server";
import RssParser from "rss-parser";
import { FeedError, FeedSuccess, RssReq } from "@/app/types/rss";

export async function POST(request: NextRequest) {
  let req: RssReq;

  try {
    req = (await request.json()) as RssReq;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const urls = Array.isArray(req.urls)
    ? req.urls.filter((url) => typeof url === "string")
    : [];

  if (urls.length === 0) {
    return NextResponse.json({
      data: {
        feeds: [],
        errors: [],
      },
    });
  }

  const parser = new RssParser();

  const results = await Promise.allSettled(
    urls.map((url) => parser.parseURL(url)),
  );

  const feeds: FeedSuccess[] = [];
  const errors: FeedError[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      feeds.push({
        url: urls[index],
        feed: result.value,
      });
    } else {
      errors.push({
        url: urls[index],
        error: result.reason?.message || "Failed to fetch feed",
      });
    }
  });

  return NextResponse.json({
    data: {
      feeds,
      errors,
    },
  });
}
