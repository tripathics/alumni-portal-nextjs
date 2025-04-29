import { dataValueLookup } from "@/lib/constants/data";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
  TableHead,
  TableBody,
} from "../ui/table";
import { getDate, getMonth } from "@/lib/helper";
import { MembershipApplicationType } from "@/types/Membership.type";
import Image from "next/image";
import { signUrl } from "@/lib/utils";

const Application: React.FC<{ applicationData: MembershipApplicationType }> = ({
  applicationData,
}) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Personal details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted">Full name</TableCell>
            <TableCell>
              {`${applicationData.title} ${applicationData.first_name} ${applicationData.last_name}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted">Date of Birth</TableCell>
            <TableCell>{getDate(applicationData.dob)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted">Sex</TableCell>
            <TableCell>{applicationData.sex}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted">Category</TableCell>
            <TableCell>{applicationData.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted">Religion</TableCell>
            <TableCell>{applicationData.religion}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted">Nationality</TableCell>
            <TableCell>{applicationData.nationality}</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="pt-6 pb-2" colSpan={2}>
              Education at NIT Arunachal Pradesh
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted">Registration no.</TableCell>
            <TableCell>{applicationData.registration_no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted">Roll no.</TableCell>
            <TableCell>{applicationData.roll_no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted">Course</TableCell>
            <TableCell>
              {applicationData.degree} in {applicationData.discipline}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted">Graduation date</TableCell>
            <TableCell>{getMonth(applicationData.graduation_date)}</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="pt-6 pb-2">Address</TableHead>
            <TableHead className="pt-6 pb-2">Email & Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="align-top">
              <p>{applicationData.address}</p>
              <p>
                {applicationData.city}, {applicationData.state}
              </p>
              <p>{`${applicationData.country} (${applicationData.pincode})`}</p>
            </TableCell>
            <TableCell className="align-top">
              <p>{applicationData.email}</p>
              <p>{applicationData.alt_email}</p>
              <p>{applicationData.phone}</p>
              <p>{applicationData.alt_phone}</p>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="pt-6 pb-2" colSpan={2}>
              Membership requirements
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted">
              Membership level applied
            </TableCell>
            <TableCell>
              {dataValueLookup[applicationData.membership_level]}
            </TableCell>
          </TableRow>
          <TableRow className="mt-4">
            <TableCell>
              <div className="flex max-w-36">
                <Image
                  src={signUrl(applicationData.sign)}
                  alt={applicationData.first_name}
                  width={100}
                  height={100}
                  unoptimized
                />
              </div>
            </TableCell>
            <TableCell className="align-top">
              <p className="text-muted">Dated</p>
              <time>{getDate(applicationData.created_at)}</time>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Application;
