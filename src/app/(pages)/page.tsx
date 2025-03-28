import PageHeader from "@/components/layouts/PageHeader";
import { ProgramsEvents, Stories } from "./components/Stories";
import FeaturedPost from "./components/FeaturedPost";

const featuredPosts = [
  {
    title: "Message from Director",
    description:
      "Dear NITians of Arunachal Pradesh, Welcome to your Alma Mater! A landmark of academic excellence bludgeoned with extracurricular activities and enriched research environment in Arunachal Pradesh. Since its inception, NIT Arunachal Pradesh has proved to be one of the best institutions in North East India for imparting knowledge through best practices in academia and established high-end research environment on cutting edge topics. It is in this endeavour for resplendence, series of events are organized to promote sustained quality education to ensure that our students are globally competent.",
    image: "/header-bg/2023-04-09.jpg",
    created_at: "2023-12-19",
    links: [
      {
        title: "Read more",
        url: "/about",
      },
    ],
  },
  {
    title: "Message from Director",
    description:
      "Dear NITians of Arunachal Pradesh, Welcome to your Alma Mater! A landmark of academic excellence bludgeoned with extracurricular activities and enriched research environment in Arunachal Pradesh. Since its inception, NIT Arunachal Pradesh has proved to be one of the best institutions in North East India for imparting knowledge through best practices in academia and established high-end research environment on cutting edge topics. It is in this endeavour for resplendence, series of events are organized to promote sustained quality education to ensure that our students are globally competent.",
    image: "/header-bg/2022-01-03.jpg",
    created_at: "2023-12-19",
    links: [
      {
        title: "Read more",
        url: "/about",
      },
    ],
  },
];

const Home: React.FC = () => {
  return (
    <>
      <PageHeader
        bgImage="/hero.png"
        variant="large"
        pageHeading="Celebrating the 10th convocation of NIT Arunachal Pradesh"
        subHeading="On December 19, we welcomed approximately 200, 2023 graduates to the 10th convocation ceremony of the National Institute of Technology Arunachal Pradesh"
      />
      {featuredPosts.map((post, i) => (
        <FeaturedPost
          key={i}
          title={post.title}
          description={post.description}
          image={post.image}
          created_at={post.created_at}
          links={post.links}
          color={i % 2 === 0 ? "light" : "dark"}
        />
      ))}
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-10 md:gap-16 lg:grid-cols-2">
          <div>
            <h2 className="leading-none font-semibold text-2xl mb-6">
              Stories
            </h2>
            <Stories />
          </div>
          <div>
            <h2 className="leading-none font-semibold text-2xl mb-6">
              Programs & Events
            </h2>
            <ProgramsEvents />
          </div>
        </div>
      </div>
      <div className="bg-palette-muted text-palette-foreground-dark">
        <div className="container py-8">
          <h2 className="leading-none font-semibold text-2xl mb-6">Stories</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
