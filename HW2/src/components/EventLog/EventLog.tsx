import { Paper, Button, Typography, Box } from '@mui/material';
import { useEventLog } from '../../hooks/useEventLog';

const EventLog = () => {
  const { events, clearEvents } = useEventLog();

  return (
    <Paper style={{ padding: '20px', height: '600px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6">Event Log</Typography>
      <Typography variant="body2" color="textSecondary">
        {events.length} events
      </Typography>
      
      <Button
        variant="contained"
        color="error"
        onClick={clearEvents}
        disabled={events.length === 0}
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        Clear All
      </Button>

      <Box style={{ flex: 1, overflowY: 'auto', marginTop: '10px' }}>
        {events.length === 0 ? (
          <Typography color="textSecondary">No events yet</Typography>
        ) : (
          events.map((event, index) => (
            <Paper
              key={index}
              style={{
                padding: '10px',
                marginBottom: '8px',
                background: '#f5f5f5'
              }}
            >
              <Typography variant="body2">{event}</Typography>
            </Paper>
          ))
        )}
      </Box>
    </Paper>
  );
};

export default EventLog;