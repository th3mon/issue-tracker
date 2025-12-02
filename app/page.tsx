import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <h1>Issue Tracker</h1>
      <Pagination
        itemCount={666}
        pageSize={10}
        currentPage={Number(searchParams.page)}
      />
    </>
  );
}
