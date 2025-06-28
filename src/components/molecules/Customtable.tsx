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
}

const Customtable = ({ header, data }: { header?: Header[]; data?: any[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {header &&
            header.map((head) => (
              <TableHead key={head.id} className="w-[100px]">
                {head.name}
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                {header &&
                  header.map((head) => (
                    <TableCell
                      key={`${head.id} ${item.id}`}
                      className="w-[100px]"
                    >
                      {item[head.id] || "N/A"}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          ) : (
            <TableCell
              colSpan={header ? header.length : 1}
              className="text-center"
            >
              No data available
            </TableCell>
          )}
      </TableBody>
    </Table>
  );
};

export default Customtable;
