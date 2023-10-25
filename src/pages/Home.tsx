import TableView, { Field } from "../components/table";
import TableColumnHeader from "../components/table/components/TableColumnHeader";
import styles from "./pages.module.css";

export type Entry = {
  id: string;
  dateModified: Date;
  dateCreated: Date;
  assignee?: string;
  storyPoints?: number;
};

const fields: Field[] = [
  {
    name: "id",
    label: "ID",
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
  const dummyData: Entry[] = Array(30)
    .fill(null)
    .map((_, index) => {
      const id = `ID-${index + 1}`;
      const dateCreated = getRandomDate(new Date(2022, 0, 1), new Date());
      const dateModified = getRandomDate(dateCreated, new Date());
      const assignee =
        Math.random() < 0.5 ? `Assignee-${index + 1}` : undefined;
      const storyPoints =
        Math.random() < 0.5 ? Math.floor(Math.random() * 10) + 1 : undefined;

      return {
        id,
        dateCreated,
        dateModified,
        assignee,
        storyPoints,
      };
    });

  if (!dummyData) {
    return null;
  }
  return (
    <div className={styles.container}>
      <TableView
        data={dummyData}
        fields={fields}
        HeaderComponent={TableColumnHeader}
      />
    </div>
  );
};

export default Home;
