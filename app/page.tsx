import BlogList from "@/components/BlogList";
import Featured from "@/components/Featured";
import Tags from "@/components/Tags";

export default function Home() {
  return (
      <div className="pb-14 md:pb-20">
        <Tags />
        <Featured />
        <hr className="mx-4 md:mx-7" />
        <BlogList />
      </div>
  );
}
