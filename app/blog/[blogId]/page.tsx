import Image from 'next/image'
import AuthorImg from "@/assets/authorimg.jpg"

const BlogPage = () => {
  return (
    <div>
      <div>
        <div>
          <div>
            <Image src={AuthorImg} alt="profile_img" />
            <p>Ria Donalds</p>
          </div>

          <div></div>
        </div>

        <div>
          {/* like and share */}
        </div>
      </div>
    </div>
  )
}

export default BlogPage