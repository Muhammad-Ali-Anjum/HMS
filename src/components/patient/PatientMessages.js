import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  InputAdornment,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  Circle as StatusIcon,
  LocalHospital as DoctorIcon,
} from '@mui/icons-material';

const PatientMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const chats = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiologist',
      lastMessage: 'Your test results look good.',
      time: '10:30 AM',
      unread: 1,
      status: 'online',
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialization: 'Pediatrician',
      lastMessage: 'Remember to take your medication regularly.',
      time: '09:15 AM',
      unread: 0,
      status: 'offline',
    },
    // Add more mock data as needed
  ];

  const messages = [
    {
      id: 1,
      senderId: 'doctor',
      text: 'How are you feeling today?',
      time: '10:00 AM',
    },
    {
      id: 2,
      senderId: 'patient',
      text: 'Much better, thank you doctor.',
      time: '10:05 AM',
    },
    // Add more mock data as needed
  ];

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      // Handle sending message
      setMessageText('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 100px)' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Chat List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Messages with Doctors
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Divider />
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {filteredChats.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  selected={selectedChat?.id === chat.id}
                  onClick={() => setSelectedChat(chat)}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <StatusIcon
                          sx={{
                            fontSize: 12,
                            color: chat.status === 'online' ? 'success.main' : 'text.disabled',
                          }}
                        />
                      }
                    >
                      <Avatar>
                        <DoctorIcon />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={
                      <>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {chat.specialization}
                        </Typography>
                        {chat.lastMessage}
                      </>
                    }
                    primaryTypographyProps={{
                      variant: 'subtitle1',
                      fontWeight: chat.unread ? 'bold' : 'normal',
                    }}
                    secondaryTypographyProps={{
                      noWrap: true,
                    }}
                  />
                  {chat.unread > 0 && (
                    <Badge
                      badgeContent={chat.unread}
                      color="primary"
                      sx={{ ml: 2 }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Chat Messages */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">
                    {selectedChat.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedChat.specialization}
                  </Typography>
                </Box>

                {/* Messages */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.senderId === 'patient' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          maxWidth: '70%',
                          bgcolor: message.senderId === 'patient' ? 'primary.light' : 'background.default',
                        }}
                      >
                        <Typography variant="body1">
                          {message.text}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {message.time}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleSendMessage}
                            disabled={!messageText.trim()}
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Select a doctor to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientMessages;
