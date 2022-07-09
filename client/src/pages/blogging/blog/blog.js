//Author: Minal Rameshchandra Khona (B00873733)
import { Avatar, Box, Button, Divider, ImageList, ImageListItem, Paper, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Blog = (props) => {
	const item = props.blog;

	return (
		<Paper sx={{ p: 1.5, my: 1, alignContents: 'center', justifyItems: 'center', }}>

			{/* Header */}
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ display: 'flex', flex: 1 }}>
					<Avatar src={item.profile} className="m-2" />

					<Typography variant='h6' sx={{ lineHeight: 1.4, marginTop:'15px' }} >
						{item.name}
					</Typography>
				</Box>
			</Box>

			<Divider sx={{ mb: 1 }} />

			{/* Images */}
			<Box sx={{ mb: 2 }}>
				<ImageList
					sx={{ width: '100%' }}
					variant="standard"
				>
					{item.image.map((image, index) => (
						<Paper variant='outlined' key={index}>
							<ImageListItem>
								<img
									src={`${image}?fit=crop&auto=format`}
									loading="lazy"
								/>
							</ImageListItem>
						</Paper>
					))}
				</ImageList>

				{/* Links and captions */}
				{
					<Typography
						variant='body1'
						sx={{ mb: 1, fontSize: '15px', lineHeight: 1.3, display: 'flex', textAlign: 'left' }}>
						{item.links.map((link) => (
							<>
								<Button
									component='a'
									href={link.a}
									variant="text"
									size='small'>
									{link.value}
								</Button>
								<br />
							</>
						))}
					</Typography>
				}
			</Box>
			<Divider />

			{/* Comments */}
			<Box>
				<Stack direction="row" sx={{ mt: 1, justifyItems: "center" }}>
					<Button sx={{ size: 'small' }}>
						<FavoriteBorderIcon />
					</Button>
					<Typography variant='body1' sx={{ mt: 1 }}>
						{item.likes}
					</Typography>
				</Stack>

			</Box>
		</Paper>
	);
};
export default Blog;