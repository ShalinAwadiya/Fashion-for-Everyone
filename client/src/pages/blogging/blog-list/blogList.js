//Author: Minal Rameshchandra Khona (B00873733)
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AXIOS_CLIENT from '../../../utils/apiClient';
import { getUserId } from '../../../utils/firebase';
import Blog from '../blog/blog';

const BlogList = () => {

  const [blogsList, setBlogList] = useState([]);

  useEffect(() => {
    AXIOS_CLIENT.get('/blogs/').then((res) => {
      const blogs = res.data.blogs;
      setBlogList(blogs);
    }).catch(err => {
      console.error(err);
      toast.error("Something went wrong!");
    });

    console.log(getUserId());
  }, [])

  const handleDelete = (list) => {
    setBlogList(list);
  }

  return (
    <>
      {
        blogsList.map((blog, index) => {
          return (
            <Blog
              key={blog.blogId}
              blog={blog}
              handleDelete={handleDelete} />
          )
        })
      }
    </>
  );
};
export default BlogList;