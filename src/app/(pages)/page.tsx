import PageHeader from "@/components/layouts/PageHeader";
import Image from "next/image";
import { ProgramsEvents, Stories } from "./components/Stories";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <>
      <PageHeader
        bgImage="/hero.png"
        variant="large"
        pageHeading="Celebrating the 10th convocation of NIT Arunachal Pradesh"
        subHeading="On December 19, we welcomed approximately 200, 2023 graduates to the 10th convocation ceremony of the National Institute of Technology Arunachal Pradesh"
      />
      <div className="container page-main">
        <div className="grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-semibold text-2xl mb-10">Stories</h2>
            <Stories />
          </div>
          <div>
            <h2 className="font-semibold text-2xl mb-10">Programs & Events</h2>
            <ProgramsEvents />
          </div>
        </div>
      </div>
      <div className="bg-palette-surface-dark text-palette-foreground-dark">
        <div className="container p-10 grid grid-cols-2 gap-12">
          <div className="">
            <h2 className="font-semibold text-2xl mb-6">
              Message from Director
            </h2>
            <p className="text-xl font-light line-clamp-4">
              Dear NITians of Arunachal Pradesh, Welcome to your Alma Mater! A
              landmark of academic excellence bludgeoned with extracurricular
              activities and enriched research environment in Arunachal Pradesh.
              Since its inception, NIT Arunachal Pradesh has proved to be one of
              the best institutions in North East India for imparting knowledge
              through best practices in academia and established high-end
              research environment on cutting edge topics. It is in this
              endeavour for resplendence, series of events are organized to
              promote sustained quality education to ensure that our students
              are globally competent.
            </p>
            <div className="mt-6">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "bg-primary-dark text-foreground",
                })}
                href="/about"
              >
                Read more
              </Link>
            </div>
          </div>
          <div className="">
            <Image
              src="https://nitap.ac.in/storage/pdf/310243512.jpg"
              alt="Convocation"
              height={340}
              width={500}
              className="w-full h-[340px] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
