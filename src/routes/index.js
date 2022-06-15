import { Routes, Route } from "react-router-dom";
import Fashion from "../components/blogging/fashion-blogging";
import CouponsHomePage from "../pages/CouponsHomePage";
import CreateBlog from "../components/blogging/create-blog/createBlog";
import PostBlog from "../components/blogging/post-blog/postBlog"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CouponsHomePage />} />
            <Route path="/home" element={<CouponsHomePage />} />
            <Route path="/coupons" element={<CouponsHomePage />} />
            <Route path="/fashion-blogs" element={<Fashion />} />
            <Route path="/fashion/createPost" element={<CreateBlog />} />
            <Route path="/fashion-blogs/post" element={<PostBlog />} />
        </Routes>
    );
}
export default AppRoutes;