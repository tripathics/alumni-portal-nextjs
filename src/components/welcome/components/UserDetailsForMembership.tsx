import Alert from "@/components/custom-ui/Alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDate, getMonth } from "@/lib/helper";
import { MembershipPrefillDataType } from "@/types/Alumni.type";

export const UserDetailsForMembership: React.FC<{
  data: MembershipPrefillDataType;
}> = ({ data }) => {
  return (
    <div>
      <Alert severity="info">
        Confirm your details before applying for life membership.
      </Alert>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="pt-6 pb-1">
              Personal details
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Full name</TableCell>
            <TableCell>
              {data.title} {data.first_name} {data.last_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Date of Birth
            </TableCell>
            <TableCell>{getDate(data.dob)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Category</TableCell>
            <TableCell>{data.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Nationality</TableCell>
            <TableCell>{data.nationality}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Religion</TableCell>
            <TableCell>{data.religion}</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="pt-6 pb-1">
              Education at NIT Arunachal Pradesh
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Registration no.
            </TableCell>
            <TableCell>{data.registration_no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Roll no.</TableCell>
            <TableCell>{data.roll_no}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Course</TableCell>
            <TableCell>
              {data.degree} in {data.discipline}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Graduation date
            </TableCell>
            <TableCell>{getMonth(data.graduation_date)}</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="pt-6 pb-1">Address</TableHead>
            <TableHead className="pt-6 pb-1">Email & Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <p>{data.address}</p>
              <p>
                {data.city}, {data.state}
              </p>
              <p>{`${data.country} (${data.pincode})`}</p>
            </TableCell>
            <TableCell>
              <p>{data.email}</p>
              <p>{data.alt_email}</p>
              <p>{data.phone}</p>
              <p>{data.alt_phone}</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
