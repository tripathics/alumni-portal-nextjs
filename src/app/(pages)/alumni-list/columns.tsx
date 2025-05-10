"use client"
import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { FetchedAlumni } from "@/lib/actions/public/fetchAlumni";
import { ColumnDef } from "@tanstack/react-table";
import { Linkedin, Github } from "@/components/icons";

export const columns: ColumnDef<FetchedAlumni>[] = [
  {
    accessorKey: "details",
    header: "Alumni",
    cell: ({ row }) => {
      const alumni = row.original
      return (
        <div className="flex items-center gap-4">
          <Avatar avatar={alumni.avatar} size="3rem" />
          <div className="space-y-1">
            <p className="text-base font-semibold">{alumni.name}</p>
            <p>{alumni.nitap_degree} - {alumni.nitap_discipline}, {alumni.nitap_graduation_year}</p>
            {!!alumni.job_organisation ? (
              <div className="text-base">
                <span>{alumni.job_designation} @ {alumni.job_organisation}</span><br />
                <span className="text-muted">{alumni.job_location}</span>
              </div>
            ) : !!alumni.ed_institute && (
              <p className="text-base">{alumni.ed_degree} @ {alumni.ed_institute}</p>
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "socialLinks",
    header: "Connect",
    cell: ({ row }) => {
      const alumni = row.original
      return (
        <div className="flex space-x-2">
          {alumni.linkedin && (
            <a
              href={alumni.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
          {alumni.github && (
            <a
              href={alumni.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          )}
        </div>
      )
    },
  },
]

