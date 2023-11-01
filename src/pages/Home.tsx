import TableView, { ColumnsType, Field } from "../components/table";
import TableColumnHeader from "../components/table/components/TableColumnHeader";
import TableContainer from "../components/table/components/TableContainer";
import TableRow from "../components/table/components/TableRow";
import styles from "./pages.module.css";

const fields: Field[] = [
  {
    name: "id",
    label: "ID",
    jsType: "string",
  },
  {
    name: "category",
    label: "Category",
    jsType: "string",
  },
  {
    name: "dateModified",
    label: "Date Modified",
    jsType: "date",
  },
  {
    name: "dateCreated",
    label: "Date Created",
    jsType: "date",
  },
  {
    name: "assignee",
    label: "Assignee",
    jsType: "string",
  },
  {
    name: "storyPoints",
    label: "Story Points",
    jsType: "number",
  },
];

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const Home = () => {
  const dummyData: ColumnsType[] = Array(30)
    .fill(null)
    .map((_, index) => {
      const id = `ID-${index + 1}`;
      const dateCreated = getRandomDate(new Date(2022, 0, 1), new Date());
      const dateModified = getRandomDate(dateCreated, new Date());
      const assignee =
        Math.random() < 0.5 ? `Assignee-${index + 1}` : undefined;
      const storyPoints = Math.floor(Math.random() * 10) + 1;
      const category = ["Task", "Event", "Report", "Note"][
        Math.floor(Math.random() * 4)
      ];

      return {
        id,
        dateCreated,
        dateModified,
        assignee,
        storyPoints,
        category,
      };
    });

  if (!dummyData) {
    return null;
  }
  return (
    <div className={styles.container}>
      <TableView
        RowComponent={TableRow}
        HeaderComponent={TableColumnHeader}
        ContainerComponent={TableContainer}
        data={dummyData}
        fields={fields}
      />
    </div>
  );
};

export default Home;
