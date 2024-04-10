// import { Container, Typography } from "@mui/material";
import { Container } from "@mui/material";

import CountdownText from './CountdownText';
import { CountdownVideo } from './CountdownVideo';

function About() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* <Typography variant="h5" align="center">
        Coming soon...
      </Typography> */}
      <CountdownText/>
      <CountdownVideo/>
    </Container>
  );
}

export default About;