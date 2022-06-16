import * as React from 'react';
import { Button, Fab, Grid, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BlogList from "./blog-list/blogList";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Fashion = () => {
	const navigate = useNavigate();
	const pages = ['Create Post', 'Following'];
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>();

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<>
			<Container maxWidth="sm">
				<Button
					className="mx-auto bg-primary text-light w-100 mt-4 mb-4"
					color="primary" aria-label="add"
					onClick={() => (
						navigate('/fashion/createPost')
					)}>
					<AddIcon /> Create blog
				</Button>
				<BlogList />
			</Container>
		</>
	);
};
export default Fashion;