//Author: Minal Rameshchandra Khona (B00873733)
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationRounded = (props: any) => {
  return (
    <Stack spacing={10}>
      <Pagination
        count={props.totalPages}
        siblingCount={Math.min(props.totalPages, 5)}
        page={props.page}
        shape="rounded" sx={{ display: { xs: 'flex', md: 'flex' } }}
        onChange={props.handleChange} />
    </Stack>
  );
}
export default PaginationRounded;