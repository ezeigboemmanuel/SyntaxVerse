import BlogList from "@/components/BlogList";
import { Id } from "@/convex/_generated/dataModel";

interface RecommendedProps {
  blogs: {
    imageUrl: string;
    _id: Id<"blogs">;
    _creationTime: number;
    likes?: number | undefined;
    storageId: Id<"_storage">;
    format: string;
    userId: Id<"users">;
    title: string;
    article: string;
    views: number;
    categories: string[];
  }[];
}

const Recommended = ({ blogs }: RecommendedProps) => {
  return (
    <div className="pt-4 pb-10 bg-[#FCFCFE] -m-4 px-4 md:px-8">
      <h1 className="font-semibold text-lg md:text-2xl">Recommended reads</h1>

      <BlogList blogs={blogs} />
    </div>
  );
};

export default Recommended;
