import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import createView from "../modules/notion";

export function middleware(req: NextRequest) {
  fetch("https://colinhadler.at/api/stats", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      geo: req.geo,
      page: req.nextUrl.pathname,
      ua: req.ua,
    }),
  });
  return NextResponse.next();
}
