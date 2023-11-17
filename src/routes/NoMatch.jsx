import Typography from '@mui/material/Typography';

export default function NoMatch() {
  return (
    <main>
      <Typography variant="subtitle1">
        <i>
          No route found for this URL.
        </i>
      </Typography>
    </main>
  );
}
