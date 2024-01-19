import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

// import ModalVideo from '@/components/modal-video'

export default function Hero() {
   return (
      <section className="relative">
         {/* Illustration behind hero content */}
         <div
            className="-z-1 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 transform"
            aria-hidden="true"
         >
            <svg
               width="1360"
               height="578"
               viewBox="0 0 1360 578"
               xmlns="http://www.w3.org/2000/svg"
            >
               <defs>
                  <linearGradient
                     x1="50%"
                     y1="0%"
                     x2="50%"
                     y2="100%"
                     id="illustration-01"
                  >
                     <stop stopColor="#FFF" offset="0%" />
                     <stop stopColor="#EAEAEA" offset="77.402%" />
                     <stop stopColor="#DFDFDF" offset="100%" />
                  </linearGradient>
               </defs>
               <g fill="url(#illustration-01)" fillRule="evenodd">
                  <circle cx="1232" cy="128" r="128" />
                  <circle cx="155" cy="443" r="64" />
               </g>
            </svg>
         </div>

         <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Hero content */}
            <div className="pb-12 pt-32 md:pb-20 md:pt-40">
               {/* Section header */}
               <div className="pb-12 text-center md:pb-16">
                  <h1
                     className="leading-tighter mb-4 text-pretty text-5xl font-extrabold tracking-tighter md:text-8xl"
                     data-aos="zoom-y-out"
                  >
                     Make your website <br />
                     <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                        wonderful
                     </span>
                  </h1>
                  <div className="mx-auto max-w-3xl">
                     <p
                        className="mb-8 text-xl text-gray-600"
                        data-aos="zoom-y-out"
                        data-aos-delay="150"
                     >
                        Our landing page template works on all devices, so you
                        only have to set it up once, and get beautiful results
                        forever.
                     </p>
                     <div
                        className="mx-auto max-w-xs gap-4 sm:flex sm:max-w-none sm:justify-center"
                        data-aos="zoom-y-out"
                        data-aos-delay="300"
                     >
                        <div>
                           <Link
                              className={cn(
                                 buttonVariants({
                                    variant: "default",
                                    size: "lg",
                                 })
                              )}
                              href="#0"
                           >
                              Start free trial
                           </Link>
                        </div>
                        <div>
                           <Link
                              className={cn(
                                 buttonVariants({
                                    variant: "outline",
                                    size: "lg",
                                 })
                              )}
                              href="#0"
                           >
                              Learn more
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Hero image */}
               {/* <ModalVideo
                  thumb={VideoThumb}
                  thumbWidth={768}
                  thumbHeight={432}
                  thumbAlt="Modal video thumbnail"
                  video="/videos/video.mp4"
                  videoWidth={1920}
                  videoHeight={1080}
               /> */}
               <div className="flex justify-center">
                  <Image
                     src="/images/hero-image.png"
                     alt="hero image"
                     width={768}
                     height={432}
                  />
               </div>
            </div>
         </div>
      </section>
   )
}
