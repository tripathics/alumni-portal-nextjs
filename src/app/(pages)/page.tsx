import PageHeader from "@/components/layouts/PageHeader";
import { ProgramsEvents, Stories } from "./components/Stories";
import FeaturedPost from "./components/FeaturedPost";
import createServerAxiosInstance from "@/config/axios/server.config";
import { heroImageUrl } from "@/lib/utils";

type PostType = {
  title: string;
  description: string;
  image: string;
  created_at: string;
  links: { title: string, url: string }[];
}

const featuredPosts: PostType[] = [
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

const Home: React.FC = async () => {
  const axiosInstance = await createServerAxiosInstance();
  const heroData = await axiosInstance.get<{
    title: string;
    description: string;
    hero_image: string;
    created_at: string;
    links: { title: string; url: string }[];
  }>("/api/nitapalumnicontent/hero");

  return (
    <>
      <PageHeader
        bgImage={heroImageUrl(heroData.data.hero_image)}
        variant="large"
        pageHeading={heroData.data.title}
        subHeading={heroData.data.description}
      />
      {featuredPosts.map((post, i) => (
        <FeaturedPost
          key={i}
          title={post.title}
          description={post.description}
          image={post.image}
          created_at={post.created_at}
          links={post.links}
          colorScheme={i % 2 === 0 ? "default" : "accent"}
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
      <FeaturedPost
        title="Message from Director"
        description={featuredPosts[0].description}
        image={featuredPosts[0].image}
        created_at={featuredPosts[0].created_at}
        links={featuredPosts[0].links}
        colorScheme="grey"
      />
    </>
  );
};

export default Home;
