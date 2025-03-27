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
        <div>
          <h3>The Alumni cell</h3>
          <div></div>
        </div>
        <div>
          <h3>Meet the creators of the website</h3>
        </div>
      </div>
    </>
  );
};

export default About;
