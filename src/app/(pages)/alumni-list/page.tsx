"use client"
import Header from "@/components/layouts/PageHeader";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/lib/constants/queryKey";
import fetchAlumni from "@/lib/actions/public/fetchAlumni";
import { LoaderCircle } from "lucide-react";

const Page: React.FC = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: [queryKey.alumniList],
    queryFn: fetchAlumni
  })
  return (
    <>
      <Header
        pageHeading="Alumni List"
        subHeading="Find the NITians of Arunachal Pradesh"
        bgImage="/header-bg/forest.jpg"
      />

      <div className="page-main container">
        {isLoading
          ? <LoaderCircle className="animate-spin" />
          : data
            ? <DataTable columns={columns} data={data} />
            : <p>No data found</p>
        }
      </div>
    </>
  )
}

export default Page;
