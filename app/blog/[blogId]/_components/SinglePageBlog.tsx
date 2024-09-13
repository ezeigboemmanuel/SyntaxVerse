import AuthorInfo from "./AuthorInfo";
import BlogTop from "./BlogTop";
import Comments from "./Comments";
import Content from "./Content";
import MoreFromAuthor from "./MoreFromAuthor";
import Recommended from "./Recommended";
import { Separator } from "@/components/ui/separator";

const SinglePageBlog = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <BlogTop />

      {/* Content */}
      <Content />

      {/* Comment */}
      <Comments />

      {/* Author info */}
      <AuthorInfo />
      <Separator />
      <MoreFromAuthor />
      <Recommended />
    </div>
  );
};

export default SinglePageBlog;
