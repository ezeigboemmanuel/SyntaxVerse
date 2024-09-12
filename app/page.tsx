import BlogList from "@/components/BlogList";
import Featured from "@/components/Featured";
import Tags from "@/components/Tags";

export default function Home() {
  return (
      <div>
        <Tags />
        <Featured />
        <hr className="mx-4 md:mx-7" />
        <BlogList />
      </div>
  );
}
