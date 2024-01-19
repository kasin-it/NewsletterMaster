import Link from "next/link"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Logo from "./ui/logo"

export default function Footer() {
   return (
      <footer>
         <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Top area: Blocks */}
            <div className="grid gap-8 border-t border-gray-200 py-8 sm:grid-cols-12 md:py-12">
               {/* 1st block */}
               <div className="sm:col-span-12 lg:col-span-3">
                  <div className="mb-2">
                     <Logo />
                  </div>
                  <div className="text-sm text-gray-600">
                     <Link
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900 hover:underline"
                     >
                        Terms
                     </Link>{" "}
                     ·{" "}
                     <Link
                        href="#0"
                        className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900 hover:underline"
                     >
                        Privacy Policy
                     </Link>
                  </div>
               </div>

               {/* 2nd block */}
               <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                  <h6 className="mb-2 font-medium text-gray-800">Products</h6>
                  <ul className="text-sm">
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Web Studio
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           DynamicBox Flex
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Programming Forms
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Integrations
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Command-line
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* 3rd block */}
               <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                  <h6 className="mb-2 font-medium text-gray-800">Resources</h6>
                  <ul className="text-sm">
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Documentation
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Tutorials & Guides
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Blog
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Support Center
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Partners
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* 4th block */}
               <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                  <h6 className="mb-2 font-medium text-gray-800">Company</h6>
                  <ul className="text-sm">
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Home
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           About us
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Company values
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Pricing
                        </Link>
                     </li>
                     <li className="mb-2">
                        <Link
                           href="#0"
                           className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                        >
                           Privacy Policy
                        </Link>
                     </li>
                  </ul>
               </div>

               {/* 5th block */}
               <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
                  <h6 className="mb-2 font-medium text-gray-800">Subscribe</h6>
                  <p className="mb-4 text-sm text-gray-600">
                     Get the latest news and articles to your inbox every month.
                  </p>
                  <form>
                     <div className="mb-4 flex flex-wrap">
                        <div className="w-full">
                           <label
                              className="sr-only block text-sm"
                              htmlFor="newsletter"
                           >
                              Email
                           </label>
                           <div className="relative flex max-w-xs items-center">
                              <Input
                                 id="newsletter"
                                 type="email"
                                 className="form-input w-full px-3 py-2 pr-12 text-sm text-gray-800"
                                 placeholder="Your email"
                                 required
                              />
                              <Button
                                 type="submit"
                                 className="absolute inset-0 left-auto"
                                 aria-label="Subscribe"
                                 variant={"ghost"}
                              >
                                 <span
                                    className="absolute inset-0 right-auto my-2 -ml-px w-px bg-gray-300"
                                    aria-hidden="true"
                                 ></span>
                                 <svg
                                    className="mx-3 h-3 w-3 shrink-0 fill-current text-blue-600"
                                    viewBox="0 0 12 12"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                                       fillRule="nonzero"
                                    />
                                 </svg>
                              </Button>
                           </div>
                           {/* Success message */}
                           {/* <p className="mt-2 text-green-600 text-sm">Thanks for subscribing!</p> */}
                        </div>
                     </div>
                  </form>
               </div>
            </div>

            {/* Bottom area */}
            <div className="border-t border-gray-200 py-4 md:flex md:items-center md:justify-between md:py-8">
               {/* Social as */}
               <ul className="mb-4 flex md:order-1 md:mb-0 md:ml-4">
                  <li>
                     <Link
                        href="#0"
                        className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                        aria-label="Twitter"
                     >
                        <svg
                           className="h-8 w-8 fill-current"
                           viewBox="0 0 32 32"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                        </svg>
                     </Link>
                  </li>
                  <li className="ml-4">
                     <Link
                        href="#0"
                        className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                        aria-label="Github"
                     >
                        <svg
                           className="h-8 w-8 fill-current"
                           viewBox="0 0 32 32"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                        </svg>
                     </Link>
                  </li>
                  <li className="ml-4">
                     <Link
                        href="#0"
                        className="hover:bg-white-100 flex items-center justify-center rounded-full bg-white text-gray-600 shadow transition duration-150 ease-in-out hover:text-gray-900"
                        aria-label="Facebook"
                     >
                        <svg
                           className="h-8 w-8 fill-current"
                           viewBox="0 0 32 32"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                        </svg>
                     </Link>
                  </li>
               </ul>

               {/* Copyrights note */}
               <div className="mr-4 text-sm text-gray-600">
                  &copy; Cruip.com. All rights reserved.
               </div>
            </div>
         </div>
      </footer>
   )
}
