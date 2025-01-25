import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Divider,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import axios from 'axios';

const Communications = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patient/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/patient/conversations/${conversationId}/messages`
      );
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversation) return;

    try {
      await axios.post(
        `http://localhost:5000/api/patient/conversations/${selectedConversation._id}/messages`,
        { content: message }
      );
      setMessage('');
      fetchMessages(selectedConversation._id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Communications
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '70vh' }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Conversations
            </Typography>
            <Divider />
            <List sx={{ overflow: 'auto', maxHeight: 'calc(70vh - 64px)' }}>
              {conversations.map((conversation) => (
                <ListItem
                  button
                  key={conversation._id}
                  selected={selectedConversation?._id === conversation._id}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Dr. ${conversation.doctorName}`}
                    secondary={conversation.lastMessage}
                  />
                  {conversation.unreadCount > 0 && (
                    <Chip
                      label={conversation.unreadCount}
                      color="primary"
                      size="small"
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
            {selectedConversation ? (
              <>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">
                    Dr. {selectedConversation.doctorName}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    overflow: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {messages.map((msg) => (
                    <Box
                      key={msg._id}
                      sx={{
                        maxWidth: '70%',
                        mb: 2,
                        alignSelf: msg.sender === 'patient' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: msg.sender === 'patient' ? 'primary.light' : 'grey.100',
                        }}
                      >
                        <Typography>{msg.content}</Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ mt: 1, textAlign: 'right' }}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
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
                <Typography variant="h6" color="textSecondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Communications;
