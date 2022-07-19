//Author: Minal Rameshchandra Khona (B00873733)
import { Avatar, Box, Button, Divider, ImageListItem, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AXIOS_CLIENT from "../../../utils/apiClient";
import { getUserId } from "../../../utils/firebase";

const Blog = (props) => {
	const navigate = useNavigate();
	const item = props.blog;

	const handleBlogDelete = (blogId) => {
		AXIOS_CLIENT.delete('/blogs/delete/' + blogId)
			.then(res => {
				console.log(res);
				AXIOS_CLIENT.get('/blogs/').then((res) => {
					const blogs = res.data.blogs;
					props.handleDelete(blogs);
				}).catch(err => {
					console.error(err);
					toast.error("Something went wrong!");
				});
			})
			.catch(err => {
				console.error(err);
				toast.error("Something went wrong!");
			});
	}

	return (
		<Paper sx={{ p: 1.5, my: 1, alignContents: 'center', justifyItems: 'center', }}>

			{/* Header */}
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ display: 'flex', flex: 1 }}>
					<Stack direction={'row'} sx={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
						<Stack direction={'row'} sx={{ alignItems: 'center' }}>
							<Avatar src={item.profile} className="m-2" />
							<Typography variant='h6' sx={{ lineHeight: 1.4, marginTop: '15px' }} >
								{item.name}
							</Typography>
						</Stack>

						{
							getUserId() === item.userId &&
							<Stack>
								<Button
									variant="outlined"
									onClick={() => handleBlogDelete(item.blogId)}
								>
									DELETE
								</Button>
							</Stack>
						}
					</Stack>
				</Box>
			</Box>

			<Divider sx={{ mb: 1 }} />

			{/* Images */}
			<Box sx={{ mb: 2 }}>
				{
					item.image[0] &&
					<Paper variant='outlined' sx={{ justifyContent: 'center' }}>
						<ImageListItem>
							<img
								src={item.image[0]}
								srcSet={item.image[0]}
								loading="lazy"
							/>
						</ImageListItem>
					</Paper>
				}

				{
					item.caption &&
					<>
						<Typography variant="body2" sx={{ p: 1, mt: 1 }}>
							{item.caption}
						</Typography>
						<Divider sx={{ mt: 1 }} />
					</>
				}

				{/* Links and captions */}
				{item.products.length != 0 &&
					<>
						<Typography variant="body2" sx={{ p: 0.5, fontWeight: 'bold', fontStyle: 'italic' }} >
							Buy the products in the picture by clicking the product from list below
						</Typography>

						<Typography
							variant='body1'
							sx={{ mb: 1, fontSize: '15px', lineHeight: 1.4, display: 'flex', textAlign: 'left' }}>
							{item.products.map((product) => (
								<>
									<Button
										component='a'
										href={product.ProductLink}
										variant="outlined"
										size='small'>
										{product.ProductType}
									</Button>
									<br />
								</>
							))}
						</Typography>
					</>
				}
			</Box>
		</Paper>
	);
};
export default Blog;