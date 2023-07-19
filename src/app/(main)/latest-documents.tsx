import { Icons } from "~/components/icons";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getDocuments } from "~/lib/db/queries";
import { formatDate } from "~/lib/utils";

interface LatestDocumentsProps {
  numberOfDocuments: number;
}

export async function LatestDocuments({
  numberOfDocuments,
}: LatestDocumentsProps) {
  const documents = await getDocuments(numberOfDocuments);

  return (
    <Table>
      <TableCaption>
        En lista över de senast uppladdade dokumenten.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Datum</TableHead>
          <TableHead className="hidden sm:table-cell">Filnamn</TableHead>
          <TableHead>Beskrivning</TableHead>
          <TableHead>Ladda ner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>{formatDate(doc.createdAt)}</TableCell>
            <TableCell className="hidden font-medium sm:table-cell">
              {doc.name}
            </TableCell>
            <TableCell className="font-medium">{doc.description}</TableCell>
            <TableCell>
              <a href={doc.url} download target="_blank">
                <Icons.download />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

LatestDocuments.loader = function LatestDocumentsLoader({
  numberOfDocuments,
}: LatestDocumentsProps) {
  return (
    <Table>
      <TableCaption>
        En lista över de senaste uppladdade dokumenten.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden sm:table-cell">Datum</TableHead>
          <TableHead>Filnamn</TableHead>
          <TableHead>Beskrivning</TableHead>
          <TableHead>Ladda ner</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.apply(null, Array(numberOfDocuments)).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="h-4 w-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[20px]" />
            </TableCell>
            <TableCell>
              <Icons.spinner className="animate-spin" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
