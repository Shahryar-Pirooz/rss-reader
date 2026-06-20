import { NextRequest, NextResponse } from 'next/server'
import RssParser from 'rss-parser'
import { RssReq , FeedError , FeedSuccess } from '@/app/types/rss'

export async function POST(request: NextRequest) {
  const req = await request.json() as RssReq
  const urls = req.urls

  const parser = new RssParser()

  const results = await Promise.allSettled(
    urls.map(url => parser.parseURL(url))
  )

  const feeds : FeedSuccess[]  = []
  const errors : FeedError[] = []

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      feeds.push({
        url: urls[index],
        feed: result.value
      })
    } else {
      errors.push({
        url: urls[index],
        error: result.reason?.message || "failed to fetch"
      })
    }
  })

  return NextResponse.json({
    status: 200,
    data: {
      feeds,
      errors
    }
  })
}
