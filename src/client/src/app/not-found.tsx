"use client";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/data/images";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        {/* <Error statusCode={404} /> */}
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
          <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">
            404
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 mb-8">
            Page Not Found
          </p>
          <Image
            src={IMAGES.ERR_404}
            alt="404 Error"
            width={800}
            height={800}
          />
          <Link href="/" className="text-white">
            <Button className="mt-6">Go back to Home</Button>
          </Link>
        </div>
      </body>
    </html>
  );
}
