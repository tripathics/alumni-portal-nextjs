import {
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileTableRowSkeleton: React.FC = () => (
  <TableRow>
    <TableCell className="w-[66px]">
      <Skeleton className="w-[50px] h-[50px] rounded-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-2/3 h-4 mb-4" />
      <Skeleton className="w-1/2 h-4 mb-2" />
      <Skeleton className="w-1/3 h-4" />
    </TableCell>
    <TableCell className="w-12 text-right">
      <Skeleton className="inline-block w-8 h-8 rounded-full" />
    </TableCell>
  </TableRow>
);

export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 2 }) => (
  <TableRow>
    {[...Array(cols)].map((_, i) => (
      <TableCell key={i}>
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ))}
  </TableRow>
);
export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({
  rows = 2,
  cols = 2,
}) => (
  <Table>
    <TableHeader>
      <TableRow>
        {[...Array(cols)].map((_, i) => (
          <TableHead key={i}>
            <Skeleton className="h-4 w-full" />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(rows)].map((_, i) => (
        <TableRowSkeleton key={i} cols={cols} />
      ))}
    </TableBody>
  </Table>
);
