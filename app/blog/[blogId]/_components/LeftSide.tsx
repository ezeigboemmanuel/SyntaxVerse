import AuthorInfo from "./AuthorInfo";
import BlogTop from "./BlogTop";
import Comments from "./Comments";
import Content from "./Content";

const LeftSide = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <BlogTop />

      {/* Content */}
      <Content />

      {/* Comment */}
      <Comments />

      {/* Author info */}
      <AuthorInfo />
    </div>
  );
};

export default LeftSide;
