import Header from "@/components/layouts/PageHeader";

const Page: React.FC = () => {
  return (
    <>
      <Header
        pageHeading="Alumni List"
        subHeading="Find the NITians of Arunachal Pradesh"
        bgImage="/header-bg/forest.jpg"
      />

      <div className="page-main container">
        {/* TODO: Alumni list table */}
      </div>
    </>
  )
}

export default Page;
