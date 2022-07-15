//Author: Minal Rameshchandra Khona (B00873733)
import { bloggersList } from '../../../data';
import Blog from '../blog/blog';

const BlogList = () => {
  return (
    <>
      {
        bloggersList.map((blog) => {
          return (
            <Blog key={blog.id} blog={blog} />
          )
        })
      }
    </>
  );
};
export default BlogList;