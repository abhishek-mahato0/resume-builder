/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";

interface Header {
  id: string;
  name: string;
  cell?: (item: any) => React.ReactNode; // Optional custom cell renderer
}

const Customtable = ({ header, data }: { header?: Header[]; data?: any[] }) => {
  return (
    <Table className="w-full border-1 border-[#3d4b5c] bg-[#14191f] rounded-2xl">
      <TableHeader className="bg-[#1f262e] border-b border-b-[#3d4b5c]">
        <TableRow>
          {header &&
            header.map((head) => (
              <TableHead
                key={head.id}
                className="px-4 py-3 text-left text-white text-sm font-bold leading-normal"
              >
                {head.name}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={index} className="border-b border-b-[#3d4b5c]">
              {header &&
                header.map((head) => (
                  <TableCell
                    key={`${head.id} ${item.id}`}
                    className="px-4 py-4 text-left text-white text-sm leading-normal"
                  >
                    {head?.cell
                      ? head.cell(item)
                      : item[head.id]?.toString() || "N/A"}
                  </TableCell>
                ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={header ? header.length : 1}
              className="text-center"
            >
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Customtable;
