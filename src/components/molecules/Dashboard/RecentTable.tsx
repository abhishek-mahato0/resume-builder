import React from "react";
import Customtable from "../Customtable";

const recentColumns = [
  {
    id: "title",
    name: "Title",
  },
  {
    id: "updated",
    name: "Last Updated",
  },
  {
    id: "actions",
    name: "Actions",
  },
];

const recentBuilds = [
  {
    id: "1",
    title: "Resume Template 1",
    updated: "2023-10-01",
  },
  {
    id: "2",
    title: "Resume Template 2",
    updated: "2023-10-02",
  },
  {
    id: "3",
    title: "Resume Template 3",
    updated: "2023-10-03",
  },
];

const RecentTable = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>Recent Templates</div>
      <Customtable data={recentBuilds} header={recentColumns} />
    </div>
  );
};

export default RecentTable;
