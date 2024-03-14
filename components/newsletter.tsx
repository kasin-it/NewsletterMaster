import NewsletterForm from "./newsletter-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function Newsletter() {
   return (
      <section>
         <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 ">
            <div className="pb-12 md:pb-20">
               {/* CTA box */}
               <div
                  className="relative overflow-hidden rounded bg-gray-900 px-8 py-10 shadow-2xl md:px-12 md:py-16"
                  data-aos="zoom-y-out"
               >
                  {/* Background illustration */}
                  <div
                     className="pointer-events-none absolute bottom-0 right-0 hidden lg:block"
                     aria-hidden="true"
                  >
                     <svg
                        width="428"
                        height="328"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <defs>
                           <radialGradient
                              cx="35.542%"
                              cy="34.553%"
                              fx="35.542%"
                              fy="34.553%"
                              r="96.031%"
                              id="ni-a"
                           >
                              <stop stopColor="#DFDFDF" offset="0%" />
                              <stop stopColor="#4C4C4C" offset="44.317%" />
                              <stop stopColor="#333" offset="100%" />
                           </radialGradient>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                           <g fill="#FFF">
                              <ellipse
                                 fillOpacity=".04"
                                 cx="185"
                                 cy="15.576"
                                 rx="16"
                                 ry="15.576"
                              />
                              <ellipse
                                 fillOpacity=".24"
                                 cx="100"
                                 cy="68.402"
                                 rx="24"
                                 ry="23.364"
                              />
                              <ellipse
                                 fillOpacity=".12"
                                 cx="29"
                                 cy="251.231"
                                 rx="29"
                                 ry="28.231"
                              />
                              <ellipse
                                 fillOpacity=".64"
                                 cx="29"
                                 cy="251.231"
                                 rx="8"
                                 ry="7.788"
                              />
                              <ellipse
                                 fillOpacity=".12"
                                 cx="342"
                                 cy="31.303"
                                 rx="8"
                                 ry="7.788"
                              />
                              <ellipse
                                 fillOpacity=".48"
                                 cx="62"
                                 cy="126.811"
                                 rx="2"
                                 ry="1.947"
                              />
                              <ellipse
                                 fillOpacity=".12"
                                 cx="78"
                                 cy="7.072"
                                 rx="2"
                                 ry="1.947"
                              />
                              <ellipse
                                 fillOpacity=".64"
                                 cx="185"
                                 cy="15.576"
                                 rx="6"
                                 ry="5.841"
                              />
                           </g>
                           <circle
                              fill="url(#ni-a)"
                              cx="276"
                              cy="237"
                              r="200"
                           />
                        </g>
                     </svg>
                  </div>

                  <div className="relative flex flex-col items-center justify-between lg:flex-row">
                     {/* CTA content */}
                     <div className="text-center lg:max-w-xl lg:text-left">
                        <h3 className="h3 mb-5 text-3xl font-bold text-white">
                           Want to know more?
                        </h3>

                        {/* CTA form */}
                        <NewsletterForm
                           url={
                              "http://" +
                              process.env.WEBSITE_URI +
                              "/api/newsletter/?id=9f7975b9-e67a-41bd-8966-bdb6acec3606"
                           }
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
