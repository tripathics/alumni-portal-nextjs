import Header from "@/components/layouts/PageHeader";

const About = () => {
  return (
    <>
      <Header
        pageHeading="About us"
        subHeading="Welcome College alumni and undergraduates! We hope you will explore the many ways to connect with the NIT Arunachal Pradesh community."
        bgImage="/header-bg/2023-06-07-1.jpg"
      />
      <div className="page-main container">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <p className="mb-1">Dear NITians of Arunachal Pradesh,</p>
            <p className="mb-1">Welcome to your Alma Mater!</p>
            <p className="mb-1">
              A landmark of academic excellence bludgeoned with extracurricular activities and enriched research environment in Arunachal Pradesh.
            </p>
            <p className="mb-1">
              Since its inception, NIT Arunachal Pradesh has proved to be one of the best institutions in North East India for imparting knowledge through best practices in academia and established high-end research environment on cutting edge topics. It is in this endeavour for resplendence, series of events are organized to promote sustained quality education to ensure that our students are globally competent.
            </p>
            <p className="mb-1">
              We have introduced new curriculums for the new batches to keep them up-to-date with the ever-changing industrial trends, learned delegates have joined hands with us to nurture our graduates, the startup-cell has been restructured and is no longer the same underdog, the rainwater harvesting system has managed to add sustainability to the already picturesque campus at NITAP Yupia and the cherry on the top would be the medicinal garden at Jote campus whose construction is well underway.
            </p>
            <p className="mb-1">
              As mentioned above, the institution has undergone revolutionary changes but the revamp which takes the cake would be the coalescence of our very own Alumni Association. History has witnessed the power of alumni across the globe and we, as an educational institution understand the significance of having a healthy relationship with you all.
            </p>
            <p className="mb-1">Hence, it gives me immense pleasure to be in touch with you through the alumni association.</p>

            <p className="mb-1">
              Further, I congratulate the entire team of NITAP Alumni Association for taking this momentous step for establishing a platform to communicate all the positive changes happening in the campus.
            </p>

            <p className="mb-1">With a eupeptic heart, I wish my best to the NITAP Alumni Association.</p>
          </div>
          <div className="col-span-1">
            <h3>

            </h3>
          </div>
        </div>
        {/* TODO: 
          - Message from president, director
          - Coordinator details
        */}
      </div>
    </>
  );
};

export default About;
