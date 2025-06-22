import CreateMyResumeButton from "@/components/atoms/CreateMyResumeButton";
import Navbar from "@/components/Navbar";

export default async function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#14191f] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6cML6A6qJ3YTxNkSID1xy2uchQREdHp38OdjcugzD64OORotiFOxcdMV-ofx7RqArL0DxHCM-A1NFvKjsJTuFurdi2HHVBNowSwbxpgGpfy2LKQ-ZBCBunmw3ROD1_Vpjq_VTG1vXQI411PNqTNjU2qBMf8DDeKF1AWbiMjfByZ_DTiytOkQpxxj1yBO7ZcTy6HqyFn4yaKg21ZyShL_qKrzW_PxsEzVtfWk7Qd1TgviTMlqbcsHmBexH7oizGiSNKuDeU-AW3oY")`,
                  }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Craft a Resume That Gets You Hired
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Our intuitive platform guides you through every step,
                      ensuring your resume highlights your strengths and lands
                      you the interview.
                    </h2>
                  </div>
                  <CreateMyResumeButton size="lg" variant="light" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Why Choose ResumeCraft?
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                  Our platform offers a seamless resume-building experience with
                  powerful features designed to help you stand out.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3d4b5c] bg-[#1f262e] p-4 flex-col">
                  <div
                    className="text-white"
                    data-icon="File"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">
                      Professional Templates
                    </h2>
                    <p className="text-[#9dacbe] text-sm font-normal leading-normal">
                      Choose from a variety of professionally designed templates
                      tailored to different industries and career levels.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3d4b5c] bg-[#1f262e] p-4 flex-col">
                  <div
                    className="text-white"
                    data-icon="PencilSimple"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">
                      Easy Customization
                    </h2>
                    <p className="text-[#9dacbe] text-sm font-normal leading-normal">
                      Easily customize your resume with our drag-and-drop
                      editor, ensuring it reflects your unique skills and
                      experience.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3d4b5c] bg-[#1f262e] p-4 flex-col">
                  <div
                    className="text-white"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">
                      ATS Optimization
                    </h2>
                    <p className="text-[#9dacbe] text-sm font-normal leading-normal">
                      Our platform optimizes your resume for Applicant Tracking
                      Systems (ATS), increasing your chances of getting noticed
                      by recruiters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                  Get Started in Minutes
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                  Our streamlined process makes resume creation quick and easy,
                  so you can focus on landing your dream job.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCabopMhabHDwvYUjNsszzYCWXwt0q1Mw_IJ-9igEQBqBqMiLQOwC6zWInJhEc6kdiSHx987LNpKTjJZhUp1kkzcsipuf_Bm5ZRg_6UTDDCCsfk1YxAIw7jZmYZ4m-ZYNQA9tAd40pD4OoTiQZ8NgLi24CxEWyGv4692j9YQnjOCz4ort_lLbyFpJHsSOYHTqr4rLseIeZb-C_aF4l-mOhOPNAzX7RvMY1umNmiredxPiVu48tqjlOJW_I0axdocMdcU7VHL5QzYTk")',
                    }}
                  />
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      Create Your Resume
                    </p>
                    <p className="text-[#9dacbe] text-sm font-normal leading-normal">
                      Start with a template or build from scratch, adding your
                      information with our intuitive editor.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPNgtQW8uUDhZnHOXO1X9lpGZhsnfke9y1XVTx5gPaqRZbEka5WWA8Rd69FDAhEzE5pXcklyYHvUh0KGqN6N8ao0gmzcceXl4ebL6rU4JCYu3wIuCF_Lf2BFS7ROgwR29XGGVqYj43wFRMtwtJf-X6H-gfGBZq-nI5NDVOO5jzfsdYDI3bY0HEpqTCoRHY-_mhMhcvlhfOYS8WmM1EKZGXJtU3RGH3G-7nbPCntGtz6t6wyYpBf4TRbG46Ex3s5Msb-MX_ZatghK4")',
                    }}
                  />
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      Review and Refine
                    </p>
                    <p className="text-[#9dacbe] text-sm font-normal leading-normal">
                      Review your resume for accuracy and clarity, making any
                      necessary adjustments to ensure it&rsquo;s perfect.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6DkFTQcaTsL02lo2ALVkcDHsSRht7pJJmhkkJaRrESnrvrQSSnVX7NhOSf_maOf9wGfpk4Iyt3ly1zAs9dS2NC2gsVuO6sem1QPlj4HyJPUOutK7Oc_IbSNA3gBvRcYKgsb-aqhp1PCRW_sQyMC14G7DFflysVkhxJYGZPEe_xpIIi0ML1S3xsWkGEsgH0sccqYmNqnme7NbGoeqd6aDCrA5QDjKg1OL9J4GNHEWxMu8o6rGl1lYmd8zoZU8DlIfWnZyqJKBWEI8")',
                    }}
                  />
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      Download and Apply
                    </p>
                    <p className="text-[#9dacbe] text-sm font-normal leading-normal">
                      Download your resume in various formats and start applying
                      for jobs with confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="@container">
              <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                    Ready to Take the Next Step?
                  </h1>
                  <p className="text-white text-base font-normal leading-normal max-w-[720px">
                    Start building your professional resume today and unlock
                    your career potential.
                  </p>
                </div>
                <div className="flex flex-1 justify-center">
                  <div className="flex justify-center">
                    <CreateMyResumeButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <p className="text-[#9dacbe] text-base font-normal leading-normal">
                © 2024 ResumeCraft. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
}
