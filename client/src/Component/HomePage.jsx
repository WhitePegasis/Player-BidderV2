

import { Box, Typography, styled } from '@mui/material';

import Youtube from '../Assets/Images/youtube.png';
import InstaTele from '../Assets/Images/InstaTele.jpeg';
import MclPhoto01 from '../Assets/Images/mcl_photo_01.png';

const Header = styled(Box)`
    margin: 50px;
    & > div {
        margin-top: 50px;
    }
`;

const Image = styled('img')({
    width: '100%',
    height: '70%'
});

const HomePage = () => {

    return (
        <Header>
            {/* <Typography variant="h2">MCL</Typography> */}
            <Box style={{display: 'flex'}}>
                <Image src={MclPhoto01} />
            </Box>
        </Header>
    )
}

export default HomePage;